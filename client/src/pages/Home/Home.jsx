import About from './sections/About';
import Contact from './sections/Contact';
import Events from './sections/Events';
import Gallery from './sections/Gallery';
import Programs from './sections/Programs';
import Prophecies from './sections/Prophecies';
import Teachings from './sections/Teachings';
import Testimonies from './sections/Testimonies';
import HeroSection from './sections/HeroSection';

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0b1e3A] to-[#076aec]'>
      {/* GLOBAL CONTENT WRAPPER (90% for all sections) */}
      <div className='w-[90%] mx-auto space-y-6'>
        <HeroSection />
        <Prophecies />
        <Teachings />
        <Events />
        <Testimonies />
        <Gallery />
        <Programs />
        <Contact />
        <About />
      </div>
    </div>
  );
};

export default Home;
