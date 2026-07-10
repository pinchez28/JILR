const ImageCard = ({
  src,
  title,
  description,
  alt = 'image',
  downloadable = false,
  onDownload,
}) => {
  return (
    <div className='rounded-xl overflow-hidden shadow-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700'>
      {/* IMAGE FIRST */}
      <div className='w-full aspect-video bg-gray-100 dark:bg-gray-800'>
        <img src={src} alt={alt} className='w-full h-full object-cover' />
      </div>

      <div className='p-4'>
        {/* TITLE BELOW IMAGE */}
        {title && (
          <h3 className='text-primary dark:text-secondary font-semibold text-lg'>
            {title}
          </h3>
        )}

        {/* DESCRIPTION BELOW TITLE */}
        {description && (
          <p className='text-sm text-text-light dark:text-text-dark opacity-80 mt-2'>
            {description}
          </p>
        )}

        {/* DOWNLOAD */}
        {downloadable && onDownload && (
          <button
            onClick={onDownload}
            className='mt-3 bg-primary hover:bg-primary-dark dark:bg-secondary dark:hover:bg-secondary-dark text-white dark:text-black px-4 py-2 rounded-lg font-medium transition text-sm'
          >
            ⬇ Download Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
