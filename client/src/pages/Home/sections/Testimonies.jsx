import { useEffect, useState } from 'react';
import { testimoniesApi } from '../../../api/testimonies';
import VideoCard from '../../../components/ui/media/VideoCard';

const Testimonies = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonies();
  }, []);

  const loadTestimonies = async () => {
    try {
      const data = await testimoniesApi.getAll();
      setTestimonies(data.results || data);
    } catch (err) {
      console.error('Failed to load testimonies:', err);
    } finally {
      setLoading(false);
    }
  };

  // 📅 format timestamp
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
      <p className='text-center text-secondary animate-fadeIn'>
        Loading testimonies...
      </p>
    );
  }

  return (
    <section id='testimonies' className='w-full'>
      {/* TITLE */}
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-6'>
        Testimonies
      </h1>

      {/* GRID */}
      <div className='flex flex-col gap-8'>
        {testimonies.map((t) => (
          <div
            key={t.id}
            className='
              grid grid-cols-1 md:grid-cols-2
              gap-6
              items-stretch
              bg-surface-light dark:bg-surface-dark
              rounded-xl shadow-lg p-4
            '
          >
            {/* ================= BEFORE ================= */}
            <div className='flex flex-col gap-2'>
              <h3 className='text-red-500 font-semibold'>Before</h3>

              <p className='text-xs text-text-light dark:text-text-dark opacity-70'>
                📅 {formatDate(t.created_at)}
              </p>

              <VideoCard
                src={t.before_media}
                title={t.before_title}
                downloadable={t.is_downloadable}
                downloadUrl={testimoniesApi.downloadBefore(t.id)}
              />

              {/* ✅ FORCE VISIBILITY */}
              <div className='mt-2'>
                <p className='text-sm text-text-light dark:text-text-dark'>
                  {t.before_description}
                </p>
              </div>
            </div>

            {/* ================= AFTER ================= */}
            <div className='flex flex-col gap-2'>
              <h3 className='text-green-500 font-semibold'>After</h3>

              <p className='text-xs text-text-light dark:text-text-dark opacity-70'>
                📅 {formatDate(t.created_at)}
              </p>

              <VideoCard
                src={t.after_media}
                title={t.after_title}
                downloadable={t.is_downloadable}
                downloadUrl={testimoniesApi.downloadAfter(t.id)}
              />

              {/* ✅ FORCE VISIBILITY */}
              <div className='mt-2'>
                <p className='text-sm text-text-light dark:text-text-dark'>
                  {t.after_description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonies;
