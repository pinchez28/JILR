import { useEffect, useState } from 'react';
import { testimoniesApi } from '../../api/testimonies';
import MediaCard from '../../components/ui/media/MediaCard';
import DownloadButton from '../../components/ui/DownloadButton';

const Testimonies = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonies();
  }, []);

  const loadTestimonies = async () => {
    try {
      const data = await testimoniesApi.getAll();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      setTestimonies(list);
    } catch (err) {
      console.error('Failed to load testimonies:', err);
      setTestimonies([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No timestamp';

    return new Date(dateString).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto px-6 py-10'>
        <p className='text-center text-secondary'>Loading testimonies...</p>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto px-6 py-10'>
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline decoration-secondary/30 underline-offset-8 mb-8'>
        Testimonies
      </h1>

      {testimonies.length === 0 && (
        <p className='text-center text-text-light dark:text-text-dark'>
          No testimonies available.
        </p>
      )}

      <div className='space-y-8'>
        {testimonies.map((t) => (
          <div
            key={t.id}
            className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-surface-dark rounded-xl shadow-lg p-4 items-stretch border border-gray-200 dark:border-gray-700'
          >
            {/* BEFORE */}
            <div className='flex flex-col'>
              <h3 className='text-primary font-semibold text-lg'>Before</h3>
              <p className='text-xs text-text-light dark:text-text-dark opacity-70 mt-1'>
                📅 {formatDate(t.created_at)}
              </p>

              <div className='mt-3 flex-1'>
                <MediaCard
                  type={t.media_type || 'image'}
                  src={t.media_before || t.image_before}
                  title={t.title}
                  description={t.description_before}
                  downloadable={t.is_downloadable}
                  downloadUrl={t.media_before}
                />
              </div>

              {t.is_downloadable && (
                <div className='mt-3'>
                  <DownloadButton
                    url={t.media_before}
                    filename={`testimony-${t.id}-before.mp4`}
                  >
                    Download Before
                  </DownloadButton>
                </div>
              )}
            </div>

            {/* AFTER */}
            <div className='flex flex-col'>
              <h3 className='text-green-600 font-semibold text-lg'>After</h3>
              <p className='text-xs text-text-light dark:text-text-dark opacity-70 mt-1'>
                📅 {formatDate(t.created_at)}
              </p>

              <div className='mt-3 flex-1'>
                <MediaCard
                  type={t.media_type || 'image'}
                  src={t.media_after || t.image_after}
                  title={t.title}
                  description={t.description_after}
                  downloadable={t.is_downloadable}
                  downloadUrl={t.media_after}
                />
              </div>

              {t.is_downloadable && (
                <div className='mt-3'>
                  <DownloadButton
                    url={t.media_after}
                    filename={`testimony-${t.id}-after.mp4`}
                  >
                    Download After
                  </DownloadButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonies;
