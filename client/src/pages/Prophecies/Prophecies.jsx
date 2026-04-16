import { useEffect, useState } from 'react';
import { prophecyApi } from '../../api/prophecies';

import MediaCard from '../../components/ui/media/MediaCard';
import Pagination from '../../components/ui/Pagination';
import SearchInput from '../../components/ui/SearchInput';
import { TimelineDivider } from '../../components/ui/TimelineDivider';

const Prophecies = () => {
  const [prophecies, setProphecies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProphecies();
  }, [page]);

  const loadProphecies = async () => {
    setLoading(true);

    try {
      const data = await prophecyApi.getAll(page);
      const list = Array.isArray(data) ? data : [];
      setProphecies(list);
    } catch (err) {
      console.error('Failed to load prophecies:', err);
      setProphecies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className='w-full px-4 py-10'>
        <p className='text-center text-text-light dark:text-text-dark'>
          Loading prophecies...
        </p>
      </main>
    );
  }

  return (
    <main className='w-full px-4 py-10'>
      {/* TITLE */}
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-10'>
        Prophecies
      </h1>

      {/* SEARCH */}
      <SearchInput
        placeholder='Search prophecies...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      <div className='flex flex-col gap-12 mt-8'>
        {prophecies.map((p, index) => (
          <div key={p.id} className='relative'>
            {/* 🔥 DIVIDER PER ITEM (correct placement) */}
            <TimelineDivider isLast={index === prophecies.length - 1} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch'>
              {/* PROPHECY SIDE */}
              <div className='h-full'>
                <MediaCard
                  type={p.prophecy_type}
                  src={p.prophecy_media}
                  title={p.title}
                  date={p.created_at}
                  description={p.description}
                  downloadable
                  downloadUrl={prophecyApi.downloadProphecy(p.id)}
                />
              </div>

              {/* FULFILLMENT SIDE */}
              <div className='h-full flex flex-col gap-6'>
                {p.fulfillments?.length > 0 ? (
                  p.fulfillments.map((f) => (
                    <MediaCard
                      key={f.id}
                      type={f.fulfillment_type}
                      src={f.fulfillment_media}
                      title='Fulfillment'
                      date={f.created_at}
                      description={f.description}
                      downloadable
                      downloadUrl={prophecyApi.downloadFulfillment(f.id)}
                    />
                  ))
                ) : (
                  <div className='flex items-center justify-center h-full p-6 rounded-xl border border-accent-light dark:border-accent-dark'>
                    <h1 className='font-extrabold animate-pulse text-center'>
                      Awaiting Fulfillment...
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className='mt-10'>
        <Pagination page={page} totalPages={1} onPageChange={setPage} />
      </div>
    </main>
  );
};

export default Prophecies;
