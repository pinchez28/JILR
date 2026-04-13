import { useEffect, useState } from 'react';
import { programsApi } from '../../../api/programs.js';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setLoading(true);

    try {
      const data = await programsApi.getAll();
      setPrograms(data || []);
    } catch (err) {
      console.error('Failed to load programs:', err);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className='text-center text-secondary animate-fadeIn'>
        Loading programs...
      </p>
    );
  }

  return (
    <section id='programs' className='w-full'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* TITLE */}
        <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-10'>
          Daily Programs
        </h1>

        {/* GRID */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {programs.map((p) => (
            <div
              key={p.id}
              className='
                bg-surface-light dark:bg-surface-dark
                rounded-xl shadow-lg
                border border-accent-light dark:border-accent-dark
                p-5 flex flex-col gap-3
                hover:scale-[1.02] transition
              '
            >
              {/* TITLE */}
              <h2 className='text-xl font-bold text-primary dark:text-secondary'>
                {p.title}
              </h2>

              {/* HOST */}
              {p.host && (
                <p className='text-sm opacity-80'>
                  👤 Host: <span className='font-semibold'>{p.host}</span>
                </p>
              )}

              {/* DAY */}
              <p className='text-sm opacity-80'>📅 {p.day_of_week}</p>

              {/* TIME */}
              <p className='text-xs opacity-70 uppercase tracking-wider'>
                ⏰ {p.start_time} → {p.end_time}
              </p>

              {/* DESCRIPTION */}
              {p.description && (
                <p className='text-sm opacity-80 leading-relaxed'>
                  {p.description}
                </p>
              )}

              {/* ACTIVE STATUS */}
              <div className='mt-auto'>
                <span
                  className={`
                    text-xs px-2 py-1 rounded-full
                    ${
                      p.is_active
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-400 text-black'
                    }
                  `}
                >
                  {p.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {programs.length === 0 && (
          <p className='text-center text-gray-400 mt-6'>
            No programs available
          </p>
        )}
      </div>
    </section>
  );
};

export default Programs;
