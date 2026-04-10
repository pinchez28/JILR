import { useEffect, useState } from 'react';
import { teachingsApi } from '../../../api/teachings';

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
    <section id='teachings' className='w-full space-y-6'>
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
      <div className='grid md:grid-cols-2 gap-6'>
        {teachings.map((t) => (
          <div
            key={t.id}
            className='
              p-5 rounded-xl shadow-lg
              bg-surface-light dark:bg-surface-dark
              border border-accent-light dark:border-accent-dark
              animate-fadeIn
            '
          >
            {/* TITLE */}
            <h2 className='font-bold text-lg text-primary dark:text-secondary'>
              {t.title}
            </h2>

            <p className='text-sm text-text-light dark:text-text-dark opacity-80'>
              📍 {t.location}
            </p>

            <p className='text-xs text-secondary mt-1 uppercase tracking-wider'>
              {t.media_type}
            </p>

            {/* AUDIO */}
            {t.media_type === 'audio' && (
              <audio controls className='w-full mt-3'>
                <source src={t.media_file} />
              </audio>
            )}

            {/* VIDEO */}
            {t.media_type === 'video' && (
              <video controls className='w-full mt-3 rounded-lg'>
                <source src={t.media_file} />
              </video>
            )}

            {/* ACTIONS */}
            <div className='flex gap-3 mt-4'>
              {t.is_downloadable && t.media_file && (
                <button
                  onClick={() => handleDownload(t.id)}
                  className='
                    px-4 py-2 rounded-lg font-semibold
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
        ))}
      </div>

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
