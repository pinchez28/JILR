import HeroSection from './sections/HeroSection';
import Events from './sections/Events';
import Programs from './sections/Programs';
import Contact from './sections/Contact';
import About from './sections/About';

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#254575] to-[#076aec]'>
      <HeroSection />
      <div className='w-[90%] mx-auto'>
        <div className='mt-2'>
          <Events />
        </div>

        <div className='mt-8'>
          <Programs />
        </div>

        <div className='mt-8'>
          <Contact />
        </div>

        <div className='mt-8 pb-10'>
          <About />
        </div>
      </div>
    </div>
  );
};

export default Home;
