// components/ui/media/ImageCard.jsx

const ImageCard = ({
  src,
  title,
  description,
  alt = 'image',
  downloadable = false,
  onDownload,
}) => {
  return (
    <div
      className='
        p-[3px] rounded-xl
        bg-gradient-to-r from-primary via-blueTheme to-secondary
        bg-200 animate-borderGlow
      '
    >
      <div
        className='
          rounded-xl p-4 shadow-lg
          bg-surface-light dark:bg-surface-dark
          flex flex-col gap-3
        '
      >
        {/* 🖼 IMAGE FIRST */}
        <img src={src} alt={alt} className='w-full rounded-lg object-cover' />

        {/* 📝 TITLE BELOW IMAGE */}
        {title && (
          <h3 className='text-primary dark:text-secondary font-semibold text-lg'>
            {title}
          </h3>
        )}

        {/* 📝 DESCRIPTION BELOW TITLE */}
        {description && (
          <p className='text-sm text-text-light dark:text-text-dark opacity-80'>
            {description}
          </p>
        )}

        {/* ⬇ DOWNLOAD */}
        {downloadable && onDownload && (
          <button
            onClick={onDownload}
            className='
              mt-2 px-4 py-2 rounded-lg font-semibold
              bg-primary hover:bg-primary-dark
              dark:bg-secondary dark:hover:bg-secondary-dark
              text-white dark:text-black
              transition
            '
          >
            ⬇ Download Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
