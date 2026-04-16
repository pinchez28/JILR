import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import RadioPlayer from '../pages/Radio/LiveRadio';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-[#254575] to-[#076aec]'>
      <Navbar />

      <main className='flex-1 pt-20 sm:pt-24 md:pt-32 lg:pt-52'>
        <Outlet />
      </main>

      <RadioPlayer />
      <Footer />
    </div>
  );
};

export default MainLayout;
