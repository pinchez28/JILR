import { useEffect, useState } from 'react';
import { eventsApi } from '../../../api/events.js';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);

    try {
      const data = await eventsApi.getAll();
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to load events:', err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className='text-center text-secondary animate-fadeIn'>
        Loading events...
      </p>
    );
  }

  return (
    <section id='events' className='w-full mt-0'>
      {/* TITLE */}
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-6'>
        Events
      </h1>

      {/* GRID */}
      <div className='grid md:grid-cols-2 gap-6'>
        {events.map((e) => (
          <div
            key={e.id}
            className='
              bg-surface-light dark:bg-surface-dark
              rounded-xl shadow-lg overflow-hidden
              border border-accent-light dark:border-accent-dark
              flex flex-col
              animate-fadeIn
            '
          >
            {/* ===================== */}
            {/* 🖼️ POSTER */}
            {/* ===================== */}
            {e.poster && (
              <div className='w-full h-64 md:h-72 overflow-hidden'>
                <div className='w-full overflow-hidden md:h-72'>
                  <img
                    src={e.poster}
                    alt={e.title}
                    loading='lazy'
                    className='w-full h-auto md:h-full md:object-cover object-contain'
                  />
                </div>
              </div>
            )}

            {/* ===================== */}
            {/* 📄 CONTENT */}
            {/* ===================== */}
            <div className='p-5 flex flex-col gap-3'>
              {/* TITLE */}
              <h2 className='text-xl font-bold text-primary dark:text-secondary'>
                {e.title}
              </h2>

              {/* LOCATION */}
              <p className='text-sm opacity-80'>📍 {e.location}</p>

              {/* DATE + DURATION */}
              <p className='text-xs opacity-70'>
                {e.start_date} → {e.end_date} ({e.duration} days)
              </p>

              {/* DESCRIPTION */}
              <p className='text-sm opacity-80 leading-relaxed'>
                {e.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {events.length === 0 && !loading && (
        <p className='text-center text-gray-400 mt-6'>No events found</p>
      )}
    </section>
  );
};

export default Events;
