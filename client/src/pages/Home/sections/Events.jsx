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

  const isCentered = events.length > 0 && events.length <= 3;

  return (
    <section id='events' className='w-full mt-0'>
      {/* TITLE */}
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline mb-6'>
        Events
      </h1>

      {/* GRID WRAPPER */}
      <div
        className={`gap-6 ${
          isCentered ? 'flex flex-wrap justify-center' : 'grid md:grid-cols-2'
        }`}
      >
        {events.map((e) => (
          <div
            key={e.id}
            className={`
              p-[3px] rounded-xl
              bg-gradient-to-r from-primary via-blueTheme to-secondary
              bg-200 animate-borderGlow

              ${isCentered ? 'w-full max-w-md' : 'w-full'}
            `}
          >
            <div
              className='
                rounded-xl p-4 shadow-lg
                bg-surface-light dark:bg-surface-dark
                flex flex-col gap-3 h-full
              '
            >
              {/* POSTER */}
              {e.poster && (
                <img
                  src={eventsApi.getImageUrl(e.poster)}
                  alt={e.title}
                  className='w-full rounded-lg object-cover aspect-video'
                />
              )}

              {/* TITLE */}
              <h2 className='text-xl font-bold text-primary dark:text-secondary'>
                {e.title}
              </h2>

              {/* LOCATION */}
              <p className='text-sm text-text-light dark:text-text-dark'>
                📍 {e.location}
              </p>

              {/* DATE RANGE */}
              <p className='text-xs text-text-light dark:text-text-dark'>
                📅 {new Date(e.start_date).toLocaleDateString()} →{' '}
                {new Date(e.end_date).toLocaleDateString()}
              </p>

              {/* DURATION */}
              <p className='text-xs text-text-light dark:text-text-dark'>
                Duration: {e.duration} days
              </p>

              {/* DESCRIPTION */}
              <p className='text-sm text-text-light dark:text-text-dark leading-relaxed'>
                {e.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {events.length === 0 && !loading && (
        <p className='text-center text-text-light dark:text-text-dark mt-6'>
          No events found
        </p>
      )}
    </section>
  );
};

export default Events;
