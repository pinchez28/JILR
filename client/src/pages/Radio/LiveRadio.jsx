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
  const [maxDuration, setMaxDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let id = localStorage.getItem('radio_session_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('radio_session_id', id);
    }
    setSessionId(id);
  }, []);

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

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

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
    if (result.isConfirmed) downloadRecording(data.recording_id);
  };

  const downloadRecording = (id) => {
    const url = radioApi.getDownloadUrl(id);
    const a = document.createElement('a');
    a.href = url;
    a.click();
    showInfo('Download Started', 'Your file is downloading...');
  };

  // 🔥 Format time for hours, minutes, seconds
  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = maxDuration
    ? ((maxDuration - timeLeft) / maxDuration) * 100
    : 0;

  return (
    <>
      <audio ref={audioRef} src={STREAM_URL} preload='none' />

      <div className='fixed bottom-4 right-4 z-50 sm:right-6 sm:bottom-6 w-[95%] max-w-sm sm:max-w-md'>
        <div className='flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-lg shadow-xl'>
          {/* LIVE Indicator */}
          <div className='flex items-center gap-1 sm:gap-2 text-red-500 font-bold'>
            <span className='w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-ping'></span>
            LIVE
          </div>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className='p-2 sm:p-3 bg-primary text-white rounded-full flex-shrink-0'
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {/* Record / Stop */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className='px-3 py-1 sm:px-3 sm:py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm flex-shrink-0'
            >
              Record
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className='px-3 py-1 sm:px-3 sm:py-2 bg-gray-800 text-white rounded-lg text-xs sm:text-sm flex-shrink-0'
            >
              Stop
            </button>
          )}

          {/* Retry */}
          {lastRecordingId && !isRecording && (
            <button
              onClick={() => downloadRecording(lastRecordingId)}
              className='px-3 py-1 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex-shrink-0'
            >
              Retry
            </button>
          )}

          {/* Timer + Progress */}
          {isRecording && (
            <div className='flex flex-col gap-1 w-full sm:w-40'>
              <div className='text-xs sm:text-sm font-semibold text-center'>
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

          {/* Label */}
          <div className='text-xs sm:text-sm font-semibold whitespace-nowrap'>
            Jesus Is Lord Radio
          </div>
        </div>
      </div>
    </>
  );
};

export default RadioPlayer;
