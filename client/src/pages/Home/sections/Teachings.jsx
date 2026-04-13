import { useEffect, useState } from 'react';
import { teachingsApi } from '../../../api/teachings';

// ✅ reusable components
import VideoCard from '../../../components/ui/media/VideoCard';
import ImageCard from '../../../components/ui/media/ImageCard';

const Teachings = () => {
  const [teachings, setTeachings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadTeachings();
  }, [page, search]);

  const loadTeachings = async () => {
    setLoading(true);

    try {
      const res = await teachingsApi.getAll(page, search);

      setTeachings(res.results || res);
      setTotalPages(Math.ceil((res.count || 0) / 10));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (id) => {
    window.open(teachingsApi.getDownloadUrl(id), '_blank');
  };

  return (
    <section id='teachings' className='w-full mt-0'>
      {/* TITLE */}
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-4'>
        Teachings
      </h1>

      {/* SEARCH */}
      <input
        type='text'
        placeholder='Search teachings...'
        className='
          w-full p-3 rounded-lg border
          bg-surface-light dark:bg-surface-dark
          text-text-light dark:text-text-dark
          border-accent-light dark:border-accent-dark
          focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary
          mb-6
        '
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* LOADING */}
      {loading && (
        <p className='text-center text-secondary animate-fadeIn'>
          Loading teachings...
        </p>
      )}

      {/* GRID */}
      {!loading && (
        <div className='grid md:grid-cols-2 gap-6'>
          {teachings.map((t) => (
            <div key={t.id} className='animate-fadeIn'>
              {/* 🎥 VIDEO */}
              {t.media_type === 'video' && (
                <VideoCard
                  src={t.media_file}
                  title={t.title}
                  downloadable={t.is_downloadable}
                  onDownload={() => handleDownload(t.id)}
                />
              )}

              {/* 🖼️ IMAGE */}
              {t.media_type === 'image' && (
                <ImageCard src={t.media_file} title={t.title} />
              )}

              {/* 🎧 AUDIO */}
              {t.media_type === 'audio' && (
                <div
                  className='
                    p-[3px] rounded-xl
                    bg-gradient-to-r from-primary via-blueTheme to-secondary
                    bg-200 animate-borderGlow
                  '
                >
                  <div
                    className='
                      p-4 rounded-xl shadow-lg
                      bg-surface-light dark:bg-surface-dark
                    '
                  >
                    <h2 className='font-bold text-lg text-primary dark:text-secondary'>
                      {t.title}
                    </h2>

                    <p className='text-sm text-text-light dark:text-text-dark opacity-80'>
                      📍 {t.location}
                    </p>

                    <audio controls className='w-full mt-3'>
                      <source src={t.media_file} />
                    </audio>

                    {t.is_downloadable && t.media_file && (
                      <button
                        onClick={() => handleDownload(t.id)}
                        className='
                          mt-4 w-full px-4 py-2 rounded-lg font-semibold
                          bg-primary hover:bg-primary-dark
                          dark:bg-secondary dark:hover:bg-secondary-dark
                          text-white dark:text-black
                          transition
                        '
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className='flex justify-center gap-4 pt-6 text-text-light dark:text-text-dark'>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className='
            px-3 py-1 rounded border
            border-accent-light dark:border-accent-dark
            hover:bg-accent-light dark:hover:bg-accent-dark
            disabled:opacity-40
          '
        >
          Prev
        </button>

        <span className='text-secondary font-semibold'>Page {page}</span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className='
            px-3 py-1 rounded border
            border-accent-light dark:border-primary-dark
            hover:bg-accent-light dark:hover:bg-accent-dark
            disabled:opacity-40
          '
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Teachings;
