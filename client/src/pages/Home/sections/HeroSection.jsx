import logo from '../../../assets/logo.png';

const HeroSection = () => {
  return (
    <section className='relative w-screen h-screen overflow-hidden'>
      {/* Background using Tailwind config colors */}
      <div className='absolute inset-0 bg-gradient-to-r from-blueTheme via-blueTheme-light to-blueTheme-dark animate-borderGlow bg-[length:200%_200%]'></div>

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm'></div>

      {/* Animated doves */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className="absolute w-12 h-12 bg-[url('/images/dove.svg')] bg-contain bg-no-repeat animate-fly-slow top-10 left-0"></div>
        <div className="absolute w-16 h-16 bg-[url('/images/dove.svg')] bg-contain bg-no-repeat animate-fly-fast top-32 left-1/4"></div>
        <div className="absolute w-10 h-10 bg-[url('/images/dove.svg')] bg-contain bg-no-repeat animate-fly-medium top-1/2 right-0"></div>
      </div>

      {/* Content */}
      <div className='relative z-20 flex flex-col h-full w-screen'>
        {/* Center Content */}
        <div className='flex flex-1 flex-col items-center justify-center text-center px-4'>
          {/* Logo */}
          <img
            src={logo}
            alt='Logo'
            className='h-20 md:h-24 w-auto mb-6 animate-fadeIn'
          />

          {/* Title */}
          <h1 className='text-5xl md:text-6xl font-bold text-secondary animate-fadeIn'>
            JESUS IS LORD RADIO
          </h1>

          {/* Subtitle */}
          <p className='text-lg md:text-xl text-text-dark mt-4 max-w-xl animate-fadeIn'>
            Streaming live from Nakuru, Kenya. Stay inspired through music,
            sermons, and worship.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
