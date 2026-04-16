const VideoCard = ({ src, title, downloadUrl, downloadable = false }) => {
  const handleDownload = () => {
    if (!downloadUrl) return;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div
      className='
        p-[2px] rounded-xl
        bg-gradient-to-r from-primary via-blueTheme to-secondary
        bg-200 animate-borderGlow
      '
    >
      <div
        className='
          p-3 rounded-xl shadow-lg
          bg-surface-light dark:bg-surface-dark
          flex flex-col gap-2
        '
      >
        {title && (
          <h3 className='text-base font-semibold text-primary dark:text-secondary'>
            {title}
          </h3>
        )}

        {/* INCREASED VIDEO SIZE (~15%) */}
        <video controls className='w-full rounded-lg h-52 md:h-60 object-cover'>
          <source src={src} />
        </video>

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
  );
};

export default VideoCard;
