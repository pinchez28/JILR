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
    <div className='rounded-xl overflow-hidden shadow-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 p-4'>
      {/* TITLE */}
      {title && (
        <h3 className='text-base font-semibold text-primary dark:text-secondary'>
          {title}
        </h3>
      )}

      {/* LOCATION */}
      {location && (
        <p className='text-xs text-text-light dark:text-text-dark opacity-80 mt-1'>
          📍 {location}
        </p>
      )}

      {/* AUDIO */}
      <div className='w-full mt-3'>
        <audio controls src={src} className='w-full' />
      </div>

      {/* DOWNLOAD */}
      <div className='mt-3'>
        {downloadable && downloadUrl && (
          <button
            onClick={handleDownload}
            className='bg-primary hover:bg-primary-dark dark:bg-secondary dark:hover:bg-secondary-dark text-white dark:text-black px-4 py-2 rounded-lg font-medium transition text-sm'
          >
            ⬇ Download
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioCard;
