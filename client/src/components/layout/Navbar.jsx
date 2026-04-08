import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // 🔥 Get current path

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className='bg-[#0b1e3A] text-white w-full fixed top-0 left-0 z-50 shadow-lg'>
      {/* Desktop Layout */}
      <div className='hidden md:flex flex-col items-center py-4 px-6 space-y-6 max-w-6xl mx-auto'>
        {/* Logo + Title */}
        <div className='flex flex-col items-center text-center'>
          <img
            src={logo}
            alt='Logo'
            className='h-16 md:h-20 lg:h-24 w-auto mb-2'
          />
          <h1 className='font-extrabold text-lg md:text-xl lg:text-2xl xl:text-3xl text-yellow-500 drop-shadow-[2px_2px_0px_#000]'>
            JESUS IS LORD RADIO
          </h1>
          <p className='text-xs md:text-sm lg:text-base text-gray-300 mt-1'>
            Broadcasting Live 153.9 FM Nakuru Kenya
          </p>
        </div>

        {/* Links Row */}
        <div className='flex justify-between w-full text-sm md:text-base lg:text-lg'>
          {[
            { to: '/', label: 'Home' },
            { to: '/prophesies', label: 'Prophesies' },
            { to: '/events', label: 'Events' },
            { to: '/testimonies', label: 'Healings & Testimonies' },
            { to: '/gallery', label: 'Gallery' },
            { to: '/contact', label: 'Contact Us' },
            { to: '/about', label: 'About' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-extrabold transition ${
                isActive(link.to)
                  ? 'text-yellow-400 underline decoration-yellow-400'
                  : 'hover:text-yellow-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='md:hidden flex items-center justify-between px-4 py-3'>
        <div className='flex items-center gap-2'>
          <img src={logo} alt='Logo' className='h-10 w-auto' />
          <span className='text-sm font-bold text-yellow-500'>JIL Radio</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-[#1D3A5F] flex flex-col items-center text-center py-6 space-y-5'>
          <img src={logo} alt='Logo' className='h-14 w-auto' />
          <h1 className='text-lg font-bold text-yellow-500'>
            JESUS IS LORD RADIO
          </h1>
          <p className='text-xs text-gray-300'>
            Broadcasting Live 153.9 FM Nakuru Kenya
          </p>

          {/* Mobile Links */}
          <div className='flex flex-col gap-3 text-base'>
            {[
              { to: '/', label: 'Home' },
              { to: '/prophesies', label: 'Prophesies' },
              { to: '/events', label: 'Events' },
              { to: '/about', label: 'About' },
              { to: '/testimonies', label: 'Healings & Testimonies' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/contact', label: 'Contact Us' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`transition ${
                  isActive(link.to)
                    ? 'text-yellow-400 underline decoration-yellow-400 font-extrabold'
                    : 'hover:text-yellow-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
