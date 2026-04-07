from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import FileResponse
from django.conf import settings
from django.utils.timezone import now
from django.core.files import File

import os
import threading
import time
import uuid
import subprocess

from .models import Recording, RadioSettings
from datetime import datetime


# ⚠️ In production, replace this with Redis or DB tracking
active_recordings = {}

def start_recording_process(stream_url: str):
    """
    Starts ffmpeg recording process safely and stores in MEDIA_ROOT/recordings
    with a formatted name: jilrDD-MM-YYYY-<uuid>.mp3
    """
    today = datetime.now()
    date_str = today.strftime("%d-%m-%Y")  # e.g., 04-07-2026
    unique_id = uuid.uuid4().hex[:6]       # short unique ID
    filename = f"JLR{date_str}-{unique_id}.mp3"
    filepath = os.path.join(settings.MEDIA_ROOT, "recordings", filename)

    # Ensure folder exists
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    process = subprocess.Popen(
        [
            "ffmpeg",
            "-y",
            "-i", stream_url,
            "-acodec", "copy",
            filepath
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    return process, filepath


class StartRecordingView(APIView):
    def post(self, request):
        session_id = request.data.get("session_id")
        if not session_id:
            return Response({"error": "Session ID is required"}, status=400)

        if session_id in active_recordings:
            return Response({"error": "Recording already in progress"}, status=400)

        config = RadioSettings.objects.first()
        if not config or not config.stream_url:
            return Response({"error": "Radio stream not configured"}, status=500)

        try:
            process, filepath = start_recording_process(config.stream_url)
        except FileNotFoundError:
            return Response({
                "error": "ffmpeg not found. Install and add to PATH."
            }, status=500)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        # Ensure process started
        time.sleep(1)
        if process.poll() is not None:
            return Response({
                "error": "Failed to start recording (ffmpeg exited early)"
            }, status=500)

        # Create the recording DB entry
        recording = Recording.objects.create(
            session_id=session_id,
            status='recording',
            duration=config.max_duration_minutes * 60  # store duration in seconds
        )

        active_recordings[session_id] = {
            "process": process,
            "file": filepath,
            "recording_id": recording.id
        }

        # ✅ Include max_minutes for frontend timer
        return Response({
            "message": "Recording started",
            "session_id": session_id,
            "recording_id": recording.id,
            "max_minutes": config.max_duration_minutes,  # <--- added
            "duration_seconds": recording.duration       # <--- optional for precise countdown
        })


class StopRecordingView(APIView):
    def post(self, request):
        session_id = request.data.get("session_id")
        if session_id not in active_recordings:
            return Response({"error": "No active recording"}, status=400)

        data = active_recordings.pop(session_id)
        process = data["process"]
        filepath = data["file"]
        recording_id = data["recording_id"]

        # Safely terminate ffmpeg
        try:
            process.terminate()
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
        except Exception:
            process.kill()

        if not os.path.exists(filepath):
            return Response({"error": "Recording file not found (ffmpeg failed)"}, status=500)

        size_mb = os.path.getsize(filepath) / (1024 * 1024)

        try:
            recording = Recording.objects.get(id=recording_id)
        except Recording.DoesNotExist:
            return Response({"error": "Recording not found"}, status=404)

        # ✅ Link file without duplicating
        recording.file.name = f"recordings/{os.path.basename(filepath)}"
        recording.status = 'recorded'
        recording.recorded_at = now()
        recording.size_mb = round(size_mb, 2)
        recording.save()

        # 🔥 Auto-delete if not downloaded
        def auto_delete():
            time.sleep(120)
            try:
                rec = Recording.objects.get(id=recording_id)
                if rec.status == 'recorded' and rec.download_attempts == 0:
                    if os.path.exists(filepath):
                        os.remove(filepath)
                    rec.status = 'deleted'
                    rec.save()
            except Recording.DoesNotExist:
                pass

        threading.Thread(target=auto_delete, daemon=True).start()

        return Response({
            "recording_id": recording.id,
            "size_mb": recording.size_mb
        })


class DownloadRecordingView(APIView):
    def get(self, request, pk):
        try:
            recording = Recording.objects.get(id=pk)
        except Recording.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        if recording.status == 'deleted':
            return Response({"error": "Recording expired"}, status=410)

        if not recording.file:
            return Response({"error": "No file attached"}, status=404)

        path = recording.file.path
        if not os.path.exists(path):
            recording.status = 'deleted'
            recording.save()
            return Response({"error": "File missing"}, status=410)

        # track download
        recording.download_attempts += 1
        recording.status = 'downloaded'
        recording.downloaded_at = now()
        recording.save()

        response = FileResponse(open(path, "rb"), as_attachment=True)

        # delayed cleanup
        def cleanup():
            time.sleep(10)
            try:
                rec = Recording.objects.get(id=recording.id)
                if rec.download_attempts <= 1:
                    if os.path.exists(path):
                        os.remove(path)
                    rec.status = 'deleted'
                    rec.save()
            except Recording.DoesNotExist:
                pass

        threading.Thread(target=cleanup, daemon=True).start()

        return response