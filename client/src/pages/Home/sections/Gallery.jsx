import { useEffect, useState } from 'react';
import { galleryApi } from '../../../api/gallery';
import ImageCard from '../../../components/ui/media/ImageCard';

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

  // ✅ FORCE DOWNLOAD (REAL DOWNLOAD, NOT OPEN)
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
    <section id='gallery' className='w-full'>
      {/* TITLE */}
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-6'>
        Gallery
      </h1>

      {/* LOADING */}
      {loading && (
        <p className='text-center text-secondary animate-fadeIn'>
          Loading gallery...
        </p>
      )}

      {/* GRID */}
      {!loading && (
        <div className='grid md:grid-cols-2 gap-6'>
          {items.map((item) => (
            <ImageCard
              key={item.id}
              src={item.image}
              alt={item.title}
              title={item.title}
              description={item.description}
              downloadable={item.is_downloadable}
              // ✅ ONLY DOWNLOAD IF ALLOWED
              onDownload={
                item.is_downloadable
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

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-8'>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className='
              px-4 py-2 rounded-lg font-semibold
              bg-surface-light dark:bg-surface-dark
              text-text-light dark:text-text-dark
              border border-accent-light dark:border-accent-dark
              hover:bg-primary hover:text-white
              dark:hover:bg-secondary dark:hover:text-black
              transition
              disabled:opacity-40 disabled:cursor-not-allowed
            '
          >
            Prev
          </button>

          <span className='text-secondary font-semibold'>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className='
              px-4 py-2 rounded-lg font-semibold
              bg-surface-light dark:bg-surface-dark
              text-text-light dark:text-text-dark
              border border-accent-light dark:border-accent-dark
              hover:bg-primary hover:text-white
              dark:hover:bg-secondary dark:hover:text-black
              transition
              disabled:opacity-40 disabled:cursor-not-allowed
            '
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
