import { useEffect, useState } from 'react';
import { prophecyApi } from '../../../api/prophecies';
import VideoCard from '../../../components/ui/media/VideoCard';
import Pagination from '../../../components/ui/Pagination';

const Prophesies = () => {
  const [prophecies, setProphecies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProphecies();
  }, [page]);

  const loadProphecies = async () => {
    setLoading(true);

    try {
      const data = await prophecyApi.getAll(page);

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      setProphecies(list);

      const count = data?.count || 0;
      setTotalPages(Math.ceil(count / 10));
    } catch (err) {
      console.error('Failed to load prophecies:', err);
      setProphecies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className='text-center text-text-light dark:text-text-dark animate-fadeIn'>
        Loading prophecies...
      </p>
    );
  }

  return (
    <section id='prophecies' className='w-full'>
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-10'>
        Prophecies
      </h1>

      <div className='flex flex-col gap-12'>
        {prophecies.map((p) => (
          <div key={p.id} className='relative'>
            {/* TIMELINE LINE */}
            <div className='hidden md:block absolute left-1/2 top-0 h-full w-1 bg-accent-light dark:bg-accent-dark transform -translate-x-1/2'></div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch'>
              {/* PROPHECY */}
              <div className='flex flex-col h-full'>
                <div className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-4 flex flex-col gap-4 h-full relative'>
                  <VideoCard
                    src={p.prophecy_media}
                    title='Prophecy'
                    downloadable
                    downloadUrl={prophecyApi.downloadProphecy(p.id)}
                  />

                  <div>
                    <h2 className='text-lg font-bold text-primary dark:text-secondary'>
                      {p.title}
                    </h2>

                    <p className='text-xs opacity-70 text-text-light dark:text-text-dark'>
                      {new Date(p.created_at).toLocaleString()}
                    </p>

                    {p.description && (
                      <p className='text-sm mt-2 opacity-80 text-text-light dark:text-text-dark'>
                        {p.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* FULFILLMENTS */}
              <div className='flex flex-col gap-6 h-full'>
                {p.fulfillments?.length > 0 ? (
                  p.fulfillments.map((f) => (
                    <div
                      key={f.id}
                      className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-md p-4 flex flex-col gap-4 h-full relative'
                    >
                      <VideoCard
                        src={f.fulfillment_media}
                        title={'Fulfillment'}
                        downloadable
                        downloadUrl={prophecyApi.downloadFulfillment(f.id)}
                      />

                      <div>
                        <h4 className='text-md font-bold text-secondary'>
                          {'Fulfillment'}
                        </h4>

                        <p className='text-xs opacity-70 text-text-light dark:text-text-dark'>
                          {new Date(f.created_at).toLocaleString()}
                        </p>

                        {f.description && (
                          <p className='text-sm mt-2 opacity-80 text-text-light dark:text-text-dark'>
                            {f.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col justify-center items-center h-full text-text-dark dark:text-text-dark border border-accent-light dark:border-accent-dark p-6 rounded-lg'>
                    Awaiting Fulfillment
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE CONNECTOR */}
            <div className='md:hidden flex flex-col items-center mt-6'>
              <div className='w-1 h-6 bg-accent-light dark:bg-accent-dark'></div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default Prophesies;
