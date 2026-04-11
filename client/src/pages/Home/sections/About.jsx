const About = () => {
  const scrollToTop = () => {
    const nav = document.getElementById('navbar');

    if (nav) {
      const y =
        nav.getBoundingClientRect().top + window.pageYOffset - nav.offsetHeight;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id='about' className='w-full pb-10'>
      {/* 🔝 Scroll to top button */}

      <div className='max-w-6xl mx-auto px-6'>
        {/* TOP: CENTER LOGO + TITLE */}
        <div className='flex flex-col items-center text-center mb-10'>
          <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline'>
            About
          </h1>
        </div>

        {/* MIDDLE: DISTRIBUTED CONTENT */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base text-gray-300'>
          {/* LEFT */}
          <div className='space-y-2'>
            <h3 className='text-yellow-500 font-bold mb-2'>Location</h3>
            <p>P.O Box 16641</p>
            <p>Nakuru 20100</p>
            <p>Kenya</p>
          </div>

          {/* CENTER */}
          <div className='space-y-2'>
            <h3 className='text-yellow-500 font-bold mb-2'>Contacts</h3>
            <p>📞 +254 53 8014798</p>
            <p>📞 +254 774 445 851</p>
            <p>📞 +254 756 605 399</p>
            <p>💬 +254 727 503 030</p>
          </div>

          {/* RIGHT */}
          <div className='space-y-2'>
            <h3 className='text-yellow-500 font-bold mb-2'>Email & Web</h3>
            <p>📧 jesusislord.fmradio@gmail.com</p>
            <p>🌐 www.jesusislordradio.info</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
