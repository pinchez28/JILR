import logo from '../../../assets/logo.png';
import heroVideo from '../../../assets/clips/hero.mp4';

const HeroSection = () => {
  return (
    <section className='relative w-screen min-h-screen overflow-hidden'>
      {/* 🎥 Background Video */}
      <video
        className='absolute inset-0 w-full h-full object-cover'
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🌑 Overlay for readability */}
      <div className='absolute inset-0 bg-black/50'></div>

      {/* 🧾 Content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6 md:px-8'>
        {/* Title */}
        <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight'>
          JESUS IS LORD RADIO
        </h1>

        {/* Subtitle */}
        <p className='mt-3 sm:mt-4 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-gray-200'>
          Streaming live from Nakuru, Kenya. Stay inspired through music,
          sermons, and worship.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
