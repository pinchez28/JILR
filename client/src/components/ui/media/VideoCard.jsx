const VideoCard = ({ src, title, downloadUrl, downloadable = false }) => {
  const handleDownload = () => {
    if (!downloadUrl) return;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className='rounded-xl overflow-hidden shadow-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700'>
      <div className='p-4'>
        {title && (
          <h3 className='text-base font-semibold text-primary dark:text-secondary mb-3'>
            {title}
          </h3>
        )}

        {/* VIDEO */}
        <div className='w-full h-52 md:h-60 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center'>
          <video
            controls
            src={src}
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {downloadable && downloadUrl && (
          <div className='mt-3'>
            <button
              onClick={handleDownload}
              className='bg-primary hover:bg-primary-dark dark:bg-secondary dark:hover:bg-secondary-dark text-white dark:text-black px-4 py-2 rounded-lg font-medium transition text-sm'
            >
              ⬇ Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
