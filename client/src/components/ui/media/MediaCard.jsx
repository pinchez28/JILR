const MediaCard = ({
  type = 'video',
  src,
  title,
  description,
  date,
  downloadable = false,
  downloadUrl,
}) => {
  return (
    <div className='h-full flex flex-col rounded-xl overflow-hidden shadow-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700'>
      {/* MEDIA (FIXED HEIGHT) */}
      <div className='w-full h-52 md:h-60 bg-gray-100 dark:bg-gray-800'>
        {type === 'audio' ? (
          <audio controls src={src} className='w-full h-full object-cover' />
        ) : (
          <video controls src={src} className='w-full h-full object-cover' />
        )}
      </div>

      {/* CONTENT */}
      <div className='p-4 flex flex-col flex-1'>
        {title && (
          <h3 className='text-base font-semibold text-primary dark:text-secondary'>
            {title}
          </h3>
        )}

        {date && (
          <p className='text-xs text-text-light dark:text-text-dark opacity-70 mt-1'>
            {new Date(date).toLocaleString()}
          </p>
        )}

        {description && (
          <p className='text-sm text-text-light dark:text-text-dark mt-2 opacity-80 flex-1'>
            {description}
          </p>
        )}

        {/* PUSH DOWNLOAD DOWN */}
        <div className='mt-auto pt-3'>
          {downloadable && downloadUrl && (
            <a
              href={downloadUrl}
              target='_blank'
              rel='noreferrer'
              className='inline-block text-center px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white hover:opacity-90 transition text-sm font-medium'
            >
              ⬇ Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
