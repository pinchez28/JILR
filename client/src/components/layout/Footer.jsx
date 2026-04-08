import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className='bg-[#0b1e3A] text-white w-full py-8 shadow-inner'>
      {/* Container */}
      <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-between items-center gap-6'>
        {/* 🔝 Logo Section */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <img src={logo} alt='JIL Logo' className='h-16 w-auto mb-2' />
          <h2 className='text-yellow-500 font-extrabold text-lg md:text-xl lg:text-2xl drop-shadow-[1px_1px_0px_#000]'>
            JESUS IS LORD RADIO
          </h2>
          <p className='text-gray-300 text-xs md:text-sm mt-1'>
            Broadcasting Live 153.9 FM Nakuru, Kenya
          </p>
        </div>

        {/* 🔗 Links Section */}
        <div className='flex flex-wrap justify-center md:justify-end gap-6 text-sm md:text-base lg:text-lg font-extrabold'>
          <Link to='/' className='hover:text-yellow-400 transition'>
            Home
          </Link>
          <Link to='/prophesies' className='hover:text-yellow-400 transition'>
            Prophesies
          </Link>
          <Link to='/events' className='hover:text-yellow-400 transition'>
            Events
          </Link>
          <Link to='/about' className='hover:text-yellow-400 transition'>
            About
          </Link>
          <Link to='/healings' className='hover:text-yellow-400 transition'>
            Healings & Testimonies
          </Link>

          <Link to='/contact' className='hover:text-yellow-400 transition'>
            Contact Us
          </Link>
        </div>
      </div>

      {/* 🔻 Bottom Note */}
      <div className='mt-6 border-t border-gray-700 pt-4 text-center text-gray-400 text-xs md:text-sm'>
        &copy; {new Date().getFullYear()} JESUS IS LORD RADIO. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
