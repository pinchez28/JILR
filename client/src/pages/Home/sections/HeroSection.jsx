import logo from '../../../assets/logo.png';
import heroVideo from '../../../assets/clips/hero.mp4';

const HeroSection = () => {
  return (
    <section id='home' className='p-6 max-w-6xl mx-auto space-y-8'>
      {/* 🎥 Background Video */}
      <video
        className='absolute inset-0 w-full h-full object-cover'
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🌑 Overlay for readability, adapts to dark mode */}
      <div className='absolute inset-0 bg-black/60 transition-colors'></div>

      {/* 🧾 Content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6 md:px-8'>
        {/* Logo */}
        <img
          src={logo}
          alt='JIL Radio Logo'
          className='h-20 sm:h-24 md:h-28 mb-4'
        />

        {/* Title */}
        <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-light leading-tight transition-colors'>
          JESUS IS LORD RADIO
        </h1>

        {/* Subtitle */}
        <p className='mt-3 sm:mt-4 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-text-dark transition-colors'>
          (Broadcasting Live From Nakuru, Kenya)
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
