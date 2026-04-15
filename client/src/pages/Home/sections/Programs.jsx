import { useEffect, useState } from 'react';
import { programsApi } from '../../../api/programs.js';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await programsApi.getAll();

      // 🔥 DEBUG (only in dev)
      if (import.meta.env.DEV) {
        console.log('🔥 Programs API response:', data);
      }

      // 🧠 Normalize API response (array OR paginated)
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      // 🧠 Sort: Monday → Sunday + time
      const dayOrder = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];

      list.sort((a, b) => {
        const dayDiff =
          dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week);

        if (dayDiff !== 0) return dayDiff;

        return (a.start_time || '').localeCompare(b.start_time || '');
      });

      setPrograms(list);
    } catch (err) {
      console.error('❌ Failed to load programs:', err);
      setError('Failed to load programs. Please try again later.');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Smart grid (auto-centers single card)
  const getGridClass = () => {
    if (programs.length === 1) {
      return 'grid grid-cols-1 place-items-center';
    }

    if (programs.length === 2) {
      return 'grid grid-cols-1 md:grid-cols-2 justify-items-center';
    }

    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section id='programs' className='w-full py-10'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* TITLE */}
        <div className='text-center mb-10'>
          <h1 className='text-lg md:text-3xl font-extrabold text-secondary uppercase underline'>
            Weeky Programs
          </h1>
          <p className='text-sm text-text-dark dark:text-text-dark opacity-70 mt-2'>
            Weekly broadcast schedule
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className='text-center text-secondary animate-pulse'>
            Loading programs...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className='text-center text-red-400 font-medium'>{error}</div>
        )}

        {/* GRID */}
        {!loading && !error && (
          <div className={`${getGridClass()} gap-6`}>
            {programs.map((p) => (
              <div
                key={p.id}
                className='
                  w-full max-w-sm
                  bg-surface-light dark:bg-surface-dark
                  border border-accent-light dark:border-accent-dark
                  rounded-xl shadow-lg
                  p-5 flex flex-col gap-3
                  hover:scale-[1.02] transition-transform duration-200
                '
              >
                {/* TITLE */}
                <h2 className='text-xl font-bold text-primary dark:text-secondary'>
                  {p.title}
                </h2>

                {/* HOST */}
                {p.host && (
                  <p className='text-sm text-text-light dark:text-text-dark opacity-80'>
                    👤 <span className='font-semibold'>{p.host}</span>
                  </p>
                )}

                {/* DAY */}
                <p className='text-sm text-text-light dark:text-text-dark opacity-80'>
                  📅 {p.day_of_week}
                </p>

                {/* TIME */}
                <p className='text-xs text-text-light dark:text-text-dark opacity-70 uppercase tracking-wider'>
                  ⏰ {p.start_time} → {p.end_time}
                </p>

                {/* DESCRIPTION */}
                {p.description && (
                  <p className='text-sm text-text-light dark:text-text-dark opacity-80 leading-relaxed'>
                    {p.description}
                  </p>
                )}

                {/* STATUS */}
                <div className='mt-auto'>
                  <span
                    className={`
                      text-xs px-3 py-1 rounded-full font-medium
                      ${
                        p.is_active
                          ? 'bg-green-500 text-white'
                          : 'bg-accent-light dark:bg-accent-dark text-text-light dark:text-text-dark'
                      }
                    `}
                  >
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && programs.length === 0 && (
          <div className='text-center text-text-light dark:text-text-dark opacity-60 mt-6'>
            No programs available
          </div>
        )}
      </div>
    </section>
  );
};

export default Programs;
