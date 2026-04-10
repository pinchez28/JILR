import Navbar from '../components/layout/Navbar';
import RadioPlayer from '../pages/Radio/LiveRadio';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      {/* page content */}
      <main className='flex-1'>{children}</main>

      {/* persistent components */}
      <RadioPlayer />
      <Footer />
    </div>
  );
};

export default MainLayout;
