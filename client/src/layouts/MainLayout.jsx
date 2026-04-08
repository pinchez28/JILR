import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import RadioPlayer from '../pages/Radio/LiveRadio';

import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className='min-h-screen bg-[#0B1E3A] p-[18px]'>
      {/* Gradient Border Frame */}
      <div
        className='min-h-screen rounded-2xl 
        bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500
        bg-[length:200%_200%] animate-borderGlow
        shadow-[0_0_15px_rgba(59,130,246,0.4)]'
      >
        {/* Inner App */}
        <div
          className='min-h-screen flex flex-col rounded-2xl overflow-hidden 
          bg-surface-light text-black 
          dark:bg-surface-dark dark:text-white'
        >
          <Navbar /> {/* Main Navbar, will be transparent on Home */}
          <main className='flex-1 mx-auto px-4 sm:px-6 lg:px-0 py-0'>
            {<Outlet />} {/* Render matched route component */}
          </main>
          <RadioPlayer />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
