import { useEffect, useState } from 'react';
import { teachingsApi } from '../../api/teachings';

import MediaCard from '../../components/ui/media/MediaCard';
import Pagination from '../../components/ui/Pagination';
import SearchInput from '../../components/ui/SearchInput';

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

      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.results)
          ? res.results
          : [];

      setTeachings(list);

      const count = res?.count || list.length;
      setTotalPages(Math.max(1, Math.ceil(count / 10)));
    } catch (err) {
      console.error('Failed to load teachings:', err);
      setTeachings([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className='w-full px-4 py-10'>
        <p className='text-center text-secondary'>Loading teachings...</p>
      </main>
    );
  }

  return (
    <main className='w-full px-4 py-10'>
      {/* TITLE */}
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-6'>
        Teachings
      </h1>

      {/* SEARCH */}
      <SearchInput
        placeholder='Search teachings...'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* EMPTY STATE */}
      {!loading && teachings.length === 0 && (
        <p className='text-center text-text-light dark:text-text-dark mt-6'>
          No teachings found.
        </p>
      )}

      {/* GRID: 2 PER ROW */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-stretch'>
        {teachings.map((t) => (
          <div key={t.id} className='h-full'>
            <MediaCard
              type={t.media_type}
              src={t.media_file}
              title={t.title}
              location={t.location}
              downloadable={t.is_downloadable}
              downloadUrl={teachingsApi.getDownloadUrl(t.id)}
            />
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className='mt-10'>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </main>
  );
};

export default Teachings;
