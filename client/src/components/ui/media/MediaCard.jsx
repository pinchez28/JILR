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
    <div className='h-full flex flex-col rounded-xl overflow-hidden shadow-lg bg-surface-light dark:bg-surface-dark'>
      {/* MEDIA (FIXED HEIGHT) */}
      <div className='w-full h-52 md:h-60 bg-black/10 dark:bg-white/10'>
        {type === 'audio' ? (
          <audio controls className='w-full h-full'>
            <source src={src} />
          </audio>
        ) : (
          <video controls className='w-full h-full object-cover'>
            <source src={src} />
          </video>
        )}
      </div>

      {/* CONTENT */}
      <div className='flex flex-col flex-1 p-4'>
        {title && (
          <h3 className='text-base font-semibold text-primary dark:text-secondary'>
            {title}
          </h3>
        )}

        {date && (
          <p className='text-xs opacity-70 mt-1'>
            {new Date(date).toLocaleString()}
          </p>
        )}

        {description && (
          <p className='text-sm mt-2 opacity-80'>{description}</p>
        )}

        {/* PUSH DOWNLOAD DOWN */}
        <div className='mt-auto pt-4'>
          {downloadable && downloadUrl && (
            <a
              href={downloadUrl}
              target='_blank'
              rel='noreferrer'
              className='block text-center px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition'
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
