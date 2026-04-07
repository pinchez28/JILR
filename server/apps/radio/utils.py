import subprocess
import uuid
import os
from django.conf import settings

def start_recording():
    filename = f"{uuid.uuid4()}.mp3"
    filepath = os.path.join(settings.RECORDINGS_DIR, filename)

    stream_url = "https://s3.radio.co/s97f38db97/listen"

    process = subprocess.Popen([
        "ffmpeg",
        "-i", stream_url,
        "-acodec", "copy",
        filepath
    ])

    duration = 600  # example: 10 minutes

    return process, filepath, duration