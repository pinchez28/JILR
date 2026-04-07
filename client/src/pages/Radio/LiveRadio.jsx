import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

import { radioApi } from '@/api/radio';
import {
  showSuccess,
  showError,
  showLoading,
  closeAlert,
  showInfo,
} from '@/utils/alerts';

import Swal from 'sweetalert2';

const STREAM_URL = 'https://s3.radio.co/s97f38db97/listen';

const RadioPlayer = () => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [lastRecordingId, setLastRecordingId] = useState(null);

  // 🔥 NEW (timer state)
  const [maxDuration, setMaxDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // 🔥 Generate session ID (multi-user support)
  useEffect(() => {
    let id = localStorage.getItem('radio_session_id');

    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('radio_session_id', id);
    }

    setSessionId(id);
  }, []);

  // autoplay
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.7;

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  // ▶ START RECORDING
  const startRecording = async () => {
    if (!sessionId) return;

    showLoading('Starting recording...');

    const data = await radioApi.startRecording(sessionId);

    closeAlert();

    if (data.error) {
      showError(data.error);
      return;
    }

    setIsRecording(true);

    const seconds = data.max_minutes * 60;
    setMaxDuration(seconds);
    setTimeLeft(seconds);

    showSuccess(
      'Recording Started',
      `Max duration: ${data.max_minutes} minutes`,
    );
  };

  // 🔥 TIMER EFFECT
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          stopRecording(); // auto stop
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // ⏹ STOP RECORDING
  const stopRecording = async () => {
    showLoading('Stopping recording...');

    const data = await radioApi.stopRecording(sessionId);

    closeAlert();

    setIsRecording(false);

    if (data.error) {
      showError(data.error);
      return;
    }

    setLastRecordingId(data.recording_id);

    const result = await Swal.fire({
      title: 'Download Recording?',
      text: `Size ~${data.size_mb} MB`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Download',
    });

    if (result.isConfirmed) {
      downloadRecording(data.recording_id);
    }
  };

  // ⬇ DOWNLOAD
  const downloadRecording = (id) => {
    const url = radioApi.getDownloadUrl(id);

    const a = document.createElement('a');
    a.href = url;
    a.click();

    showInfo('Download Started', 'Your file is downloading...');
  };

  // 🔥 FORMAT TIME
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // 🔥 PROGRESS %
  const progress = maxDuration
    ? ((maxDuration - timeLeft) / maxDuration) * 100
    : 0;

  return (
    <>
      <audio ref={audioRef} src={STREAM_URL} preload='none' />

      <div className='fixed bottom-6 right-6 z-50'>
        <div className='flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-lg shadow-xl'>
          {/* LIVE */}
          <div className='flex items-center gap-2 text-red-500 font-bold'>
            <span className='w-3 h-3 bg-red-500 rounded-full animate-ping'></span>
            LIVE
          </div>

          {/* PLAY */}
          <button
            onClick={togglePlay}
            className='p-3 bg-primary text-white rounded-full'
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          {/* RECORD / STOP */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className='px-3 py-2 bg-red-600 text-white rounded-lg'
            >
              Record
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className='px-3 py-2 bg-gray-800 text-white rounded-lg'
            >
              Stop
            </button>
          )}

          {/* RETRY */}
          {lastRecordingId && !isRecording && (
            <button
              onClick={() => downloadRecording(lastRecordingId)}
              className='px-3 py-2 bg-blue-600 text-white rounded-lg'
            >
              Retry
            </button>
          )}

          {/* TIMER + PROGRESS */}
          {isRecording && (
            <div className='flex flex-col gap-2 w-40'>
              <div className='text-xs font-semibold text-center'>
                {formatTime(timeLeft)}
              </div>

              <div className='w-full h-2 bg-gray-300 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-red-500 transition-all'
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* LABEL */}
          <div className='text-sm font-semibold'>Jesus Is Lord Radio</div>
        </div>
      </div>
    </>
  );
};

export default RadioPlayer;
