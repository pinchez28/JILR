import { useEffect, useState } from 'react';
import { prophecyApi } from '../../../api/prophecies';
import VideoCard from '../../../components/ui/media/VideoCard';

const Prophesies = () => {
  const [prophecies, setProphecies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProphecies();
  }, []);

  const loadProphecies = async () => {
    try {
      const data = await prophecyApi.getAll();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

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
      <p className='text-center text-secondary animate-fadeIn'>
        Loading prophecies...
      </p>
    );
  }

  return (
    <section id='prophecies' className='w-full'>
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-6'>
        Prophecies
      </h1>

      <div className='grid grid-cols-1 gap-6'>
        {prophecies.map((p) => (
          <div
            key={p.id}
            className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-4'
          >
            {/* PROPHECY */}
            <div className='flex flex-col gap-4'>
              <div>
                <h2 className='text-lg font-bold text-primary dark:text-secondary'>
                  {p.title}
                </h2>

                <p className='text-xs opacity-70'>
                  {new Date(p.created_at).toLocaleString()}
                </p>

                {p.description && (
                  <p className='text-sm mt-2 opacity-80'>{p.description}</p>
                )}
              </div>

              <VideoCard
                src={p.prophecy_media}
                title='Prophecy'
                downloadable
                downloadUrl={prophecyApi.downloadProphecy(p.id)}
              />
            </div>

            {/* FULFILLMENTS */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-green-500 font-semibold'>Fulfillment</h3>

              {p.fulfillments?.length > 0 ? (
                p.fulfillments.map((f) => (
                  <div key={f.id} className='flex flex-col gap-2'>
                    {/* ✅ TITLE */}

                    {/* ✅ TIMESTAMP */}
                    <p className='text-xs opacity-70'>
                      {new Date(f.created_at).toLocaleString()}
                    </p>

                    {/* ✅ DESCRIPTION */}
                    {f.description && (
                      <p className='text-sm opacity-80'>{f.description}</p>
                    )}

                    {/* ✅ MEDIA CARD */}
                    <VideoCard
                      src={f.fulfillment_media}
                      title='Fulfillment'
                      downloadable
                      downloadUrl={prophecyApi.downloadFulfillment(f.id)}
                    />
                  </div>
                ))
              ) : (
                <div className='text-gray-400 border border-dashed p-4 rounded-lg text-center'>
                  Awaiting Fulfillment
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Prophesies;
