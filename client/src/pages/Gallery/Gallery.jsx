import { useEffect, useState } from 'react';
import { galleryApi } from '../../api/gallery';
import ImageCard from '../../components/ui/media/ImageCard';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadGallery();
  }, [page]);

  const loadGallery = async () => {
    setLoading(true);

    try {
      const data = await galleryApi.getAll(page);

      setItems(data.results || data);

      if (data.count) {
        setTotalPages(Math.ceil(data.count / 10));
      } else {
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl, filename = 'image.jpg') => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className='max-w-6xl mx-auto px-6 py-10'>
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline decoration-secondary/30 underline-offset-8 mb-6'>
        Gallery
      </h1>

      {loading && (
        <p className='text-center text-secondary'>Loading gallery...</p>
      )}

      {!loading && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {items.map((item) => (
            <ImageCard
              key={item.id}
              src={item.image}
              title={item.title}
              description={item.description}
              alt={item.title || 'gallery image'}
              downloadable
              onDownload={
                item.image
                  ? () =>
                      handleDownload(
                        item.image,
                        `${item.title || 'gallery-image'}.jpg`,
                      )
                  : undefined
              }
            />
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-8'>
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className='px-4 py-2 rounded-lg font-semibold bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed'
          >
            Prev
          </button>

          <span className='text-text-light dark:text-text-dark font-medium'>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className='px-4 py-2 rounded-lg font-semibold bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
