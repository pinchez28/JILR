const Contact = () => {
  const contacts = {
    phones: [
      '+254 53 8014798',
      '+254 774 445 851',
      '+254 756 605 399',
      '+254 727 503 030',
    ],
    email: 'jesusislord.fmradio@gmail.com',
    website: 'www.jesusislordradio.info',
    location: ['P.O Box 16641', 'Nakuru 20100', 'Kenya'],
  };

  const scrollToTop = () => {
    const nav = document.getElementById('navbar');

    if (nav) {
      const y =
        nav.getBoundingClientRect().top + window.pageYOffset - nav.offsetHeight;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id='contact' className='w-full py-10'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* TITLE */}
        <div className='text-center mb-10'>
          <h1 className='text-lg md:text-3xl font-extrabold text-secondary uppercase underline'>
            Contact Us
          </h1>
          <p className='text-sm opacity-70 mt-2'>
            Get in touch with Jesus Is Lord Radio Ministry
          </p>
        </div>

        {/* GRID */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* LOCATION */}
          <div className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-5 border border-accent-light dark:border-accent-dark'>
            <h3 className='text-primary dark:text-secondary font-bold mb-3'>
              📍 Physical Address
            </h3>

            <div className='text-sm opacity-80 space-y-1'>
              {contacts.location.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          {/* CONTACT NUMBERS */}
          <div className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-5 border border-accent-light dark:border-accent-dark'>
            <h3 className='text-primary dark:text-secondary font-bold mb-3'>
              📞 Phone
            </h3>

            <div className='space-y-2 text-sm'>
              {contacts.phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone}`}
                  className='block hover:text-primary dark:hover:text-secondary transition'
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          {/* EMAIL + WEBSITE */}
          <div className='bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-5 border border-accent-light dark:border-accent-dark'>
            <h3 className='text-primary dark:text-secondary font-bold mb-3'>
              🌐 Online
            </h3>

            <div className='space-y-3 text-sm'>
              <a
                href={`mailto:${contacts.email}`}
                className='block hover:text-primary dark:hover:text-secondary transition'
              >
                📧 {contacts.email}
              </a>

              <a
                href={`https://${contacts.website}`}
                target='_blank'
                rel='noreferrer'
                className='block hover:text-primary dark:hover:text-secondary transition'
              >
                🌍 {contacts.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
