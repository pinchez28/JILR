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
      <main className='w-full px-4 py-10'>
        <p className='text-center text-secondary'>Loading testimonies...</p>
      </main>
    );
  }

  return (
    <main className='w-full px-4 py-10'>
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-8'>
        Testimonies
      </h1>

      {testimonies.length === 0 && (
        <p className='text-center text-text-light dark:text-text-dark'>
          No testimonies available.
        </p>
      )}

      <div className='flex flex-col gap-10'>
        {testimonies.map((t) => (
          <div
            key={t.id}
            className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-4 items-stretch'
          >
            {/* BEFORE */}
            <div className='flex flex-col h-full'>
              <h3 className='text-red-500 font-semibold text-lg'>Before</h3>

              <p className='text-xs opacity-70 mt-1'>
                📅 {formatDate(t.created_at)}
              </p>

              {/* MEDIA CARD (NO HEIGHT LIMIT) */}
              <div className='mt-3 flex-1 text-text-light dark:text-text-dark '>
                <MediaCard
                  type='video'
                  src={t.before_media}
                  title={t.before_title}
                  description={t.before_description}
                />
              </div>

              <div className='mt-4'>
                {t.is_downloadable && (
                  <DownloadButton
                    url={testimoniesApi.downloadBefore(t.id)}
                    filename={`${t.before_title || 'before'}.mp4`}
                  />
                )}
              </div>
            </div>

            {/* AFTER */}
            <div className='flex flex-col h-full'>
              <h3 className='text-green-500 font-semibold text-lg'>After</h3>

              <p className='text-xs opacity-70 mt-1'>
                📅 {formatDate(t.created_at)}
              </p>

              <div className='mt-3 flex-1 text-text-light dark:text-text-dark '>
                <MediaCard
                  type='video'
                  src={t.after_media}
                  title={t.after_title}
                  description={t.after_description}
                />
              </div>

              <div className='mt-4'>
                {t.is_downloadable && (
                  <DownloadButton
                    url={testimoniesApi.downloadAfter(t.id)}
                    filename={`${t.after_title || 'after'}.mp4`}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Testimonies;
