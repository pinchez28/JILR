import { useEffect, useState } from 'react';
import { teachingsApi } from '../../../api/teachings';

import VideoCard from '../../../components/ui/media/VideoCard';
import AudioCard from '../../../components/ui/media/AudioCard';
import Pagination from '../../../components/ui/Pagination';

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
      console.error('Failed to load teachings:', err);
    } finally {
      setLoading(false);
    }
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
                  downloadUrl={teachingsApi.getDownloadUrl(t.id)}
                />
              )}

              {/* 🎧 AUDIO */}
              {t.media_type === 'audio' && (
                <AudioCard
                  src={t.media_file}
                  title={t.title}
                  location={t.location}
                  downloadable={t.is_downloadable}
                  downloadUrl={teachingsApi.getDownloadUrl(t.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✅ REUSABLE PAGINATION (CLEAN) */}
      {!loading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
};

export default Teachings;
