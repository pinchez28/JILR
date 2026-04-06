import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Radio } from 'lucide-react';

const STREAM_URL = 'https://s3.radio.co/s97f38db97/listen';

const RadioPlayer = () => {
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

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

  // 🎙 START RECORDING
  const startRecording = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const stream = audio.captureStream(); // 🔥 key trick
    const recorder = new MediaRecorder(stream);

    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'radio-recording.webm';
      a.click();
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  // ⏹ STOP RECORDING
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

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

          {/* RECORD */}
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

          {/* LABEL */}
          <div className='text-sm font-semibold'>Jesus Is Lord Radio</div>
        </div>
      </div>
    </>
  );
};

export default RadioPlayer;
