const About = () => {
  return (
    <section id='about' className='w-full pb-12'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* TITLE */}
        <div className='text-center mb-10'>
          <h1
            id='about-title'
            className='text-lg md:text-3xl font-extrabold text-secondary uppercase underline'
          >
            About the Ministry
          </h1>

          <p className='text-sm text-text-dark dark:text-text-dark mt-2'>
            Jesus Is Lord Radio – Spreading the Gospel to the Nations
          </p>
        </div>

        {/* HERO DESCRIPTION */}
        <div className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-6 mb-10 border border-accent-light dark:border-accent-dark'>
          <p className='text-sm md:text-base leading-relaxed text-text-light dark:text-text-dark'>
            Jesus Is Lord Radio is a global Christian broadcasting ministry
            dedicated to spreading the Gospel of Jesus Christ to all nations.
            Through powerful teachings, live services, revival messages, and
            worship sessions, the ministry seeks to prepare the Church for the
            coming of the Lord and ignite revival across the world.
          </p>
        </div>

        {/* GRID SECTIONS */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* MISSION */}
          <div className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-5 border border-accent-light dark:border-accent-dark'>
            <h3 className='text-primary dark:text-secondary font-bold mb-3'>
              🎯 Mission
            </h3>

            <p className='text-sm text-text-light dark:text-text-dark leading-relaxed'>
              To preach holiness, righteousness, and repentance through
              broadcasting, reaching souls globally and preparing believers for
              the Kingdom of God.
            </p>
          </div>

          {/* VISION */}
          <div className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-5 border border-accent-light dark:border-accent-dark'>
            <h3 className='text-primary dark:text-secondary font-bold mb-3'>
              🌍 Vision
            </h3>

            <p className='text-sm text-text-light dark:text-text-dark leading-relaxed'>
              To become a global revival voice, impacting nations through media,
              drawing people to Christ, and awakening the Church for the return
              of Jesus.
            </p>
          </div>

          {/* WHAT WE DO */}
          <div className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-5 border border-accent-light dark:border-accent-dark'>
            <h3 className='text-primary dark:text-secondary font-bold mb-3'>
              📡 What We Do
            </h3>

            <ul className='text-sm text-text-light dark:text-text-dark space-y-1 list-disc list-inside'>
              <li>Live radio broadcasting</li>
              <li>Revival meetings coverage</li>
              <li>Teachings & sermons</li>
              <li>Global outreach programs</li>
            </ul>
          </div>
        </div>

        {/* QUOTE */}
        <div className='mt-10 text-center'>
          <p className='italic text-sm md:text-base text-primary dark:text-secondary font-extrabold'>
            “Preparing the way for the coming of the Lord through the power of
            the Gospel.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
