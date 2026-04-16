const AudioCard = ({
  src,
  title,
  location,
  downloadUrl,
  downloadable = false,
}) => {
  const handleDownload = () => {
    if (!downloadUrl) return;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div
      className='
        p-[2px] rounded-xl h-full
        bg-gradient-to-r from-primary via-blueTheme to-secondary
        bg-200 animate-borderGlow
      '
    >
      <div
        className='
          p-3 rounded-xl shadow-lg h-full
          bg-surface-light dark:bg-surface-dark
          flex flex-col gap-2
        '
      >
        {/* TITLE */}
        {title && (
          <h3 className='text-base font-semibold text-primary dark:text-secondary'>
            {title}
          </h3>
        )}

        {/* LOCATION */}
        {location && (
          <p className='text-xs text-text-light dark:text-text-dark opacity-80'>
            📍 {location}
          </p>
        )}

        {/* AUDIO (MATCH VIDEO HEIGHT EXACTLY) */}
        <div className='w-full h-52 md:h-60 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center px-3'>
          <audio controls className='w-full'>
            <source src={src} />
          </audio>
        </div>

        {/* DOWNLOAD */}
        <div className='mt-auto'>
          {downloadable && downloadUrl && (
            <button
              onClick={handleDownload}
              className='
                mt-1 w-full px-4 py-2 rounded-lg font-semibold
                bg-primary hover:bg-primary-dark
                dark:bg-secondary dark:hover:bg-secondary-dark
                text-white dark:text-black
                transition
              '
            >
              ⬇ Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
