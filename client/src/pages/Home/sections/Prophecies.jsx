import { useEffect, useState } from 'react';
import { prophecyApi } from '../../../api/prophecies';

const Prophesies = () => {
  const [prophecies, setProphecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    prophecyApi
      .getAll()
      .then((data) => {
        setProphecies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // ✅ Get navbar height dynamically
    const updateHeight = () => {
      const nav = document.getElementById('navbar');
      setNavHeight(nav?.offsetHeight || 0);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  if (loading) return <p>Loading prophecies...</p>;

  return (
    <section id='prophecies' className='w-full'>
      '{/* PAGE TITLE */}
      <div>
        <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline'>
          Prophecies
        </h1>
      </div>
      {/* GRID HEADER */}
      <div className='hidden md:grid grid-cols-2 gap-6 text-center font-bold text-secondary text-2xl pt-10'>
        <div className='bg-gray-100 dark:bg-surface-dark py-2 rounded-lg text-2xl'>
          Prophecy
        </div>
        <div className='bg-gray-100 dark:bg-surface-dark py-2 rounded-lg'>
          Fulfillment
        </div>
      </div>
      {/* CONTENT */}
      {prophecies.map((p) => (
        <div
          key={p.id}
          className='grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch pt-20 md:pt-10'
        >
          {/* PROPHECY */}
          <div className='bg-white dark:bg-surface-dark rounded-xl shadow-lg p-4 flex flex-col'>
            <div className='md:hidden mb-2 font-bold text-secondary text-center'>
              Prophecy
            </div>

            <h2 className='text-lg font-bold mb-1 dark:text-gray-50'>
              {p.title}
            </h2>

            <p className='text-xs text-gray-900 mb-2 dark:text-gray-50'>
              {p.created_at
                ? new Date(p.created_at).toLocaleString()
                : 'No timestamp'}
            </p>

            {p.description && (
              <p className='text-sm text-gray-500 dark:text-gray-100 mb-3'>
                {p.description}
              </p>
            )}

            <div className='flex-1 flex items-center'>
              {p.prophecy_media ? (
                p.prophecy_type === 'video' ? (
                  <video
                    src={prophecyApi.getMediaUrl(p.prophecy_media)}
                    controls
                    className='w-full h-56 object-cover rounded-lg bg-black'
                    preload='auto'
                  />
                ) : (
                  <audio
                    src={prophecyApi.getMediaUrl(p.prophecy_media)}
                    controls
                    className='w-full'
                    preload='auto'
                  />
                )
              ) : (
                <div className='text-gray-400 text-sm'>
                  ❌ No prophecy media
                </div>
              )}
            </div>
          </div>

          {/* FULFILLMENT */}
          <div className='bg-white dark:bg-surface-dark rounded-xl shadow-lg p-4 flex flex-col'>
            <div className='md:hidden mb-2 font-bold text-secondary text-center'>
              Fulfillment
            </div>

            {p.fulfillments?.length > 0 ? (
              p.fulfillments.map((f) => (
                <div key={f.id} className='flex-1 flex flex-col'>
                  <p className='text-xs text-gray-900 dark:text-gray-50 mb-1'>
                    {f.created_at
                      ? new Date(f.created_at).toLocaleString()
                      : 'No timestamp'}
                  </p>

                  {f.description && (
                    <p className='text-sm text-gray-500 dark:text-gray-300 mb-3'>
                      {f.description}
                    </p>
                  )}

                  <div className='flex-1 flex items-center'>
                    {f.fulfillment_media ? (
                      f.fulfillment_type === 'video' ? (
                        <video
                          src={prophecyApi.getMediaUrl(f.fulfillment_media)}
                          controls
                          className='w-full h-56 object-cover rounded-lg bg-black'
                          preload='auto'
                        />
                      ) : (
                        <audio
                          src={prophecyApi.getMediaUrl(f.fulfillment_media)}
                          controls
                          className='w-full'
                          preload='auto'
                        />
                      )
                    ) : (
                      <div className='text-gray-400 text-sm'>
                        ❌ No fulfillment media
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className='flex flex-col items-center justify-center h-full border-2 border-dashed rounded-lg text-gray-400'>
                <span className='text-4xl mb-2'>⏳</span>
                Awaiting Fulfillment
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Prophesies;

// import { useEffect, useState } from 'react';
// import { prophecyApi } from '../../../api/prophecies';

// const Prophecies = () => {
//   return (
//     <section id='events' className='p-6 max-w-6xl mx-auto space-y-8'>
//       {/* PAGE TITLE */}
//       <div>
//         <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline'>
//           Prophecies
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default Prophecies;
