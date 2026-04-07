import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Prophesies', path: '/prophesies' },
  { name: 'Events', path: '/events' },
  { name: 'Teachings', path: '/teachings' },
  { name: 'Testimonies', path: '/testimonies' },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-[#0b1e3A] dark:bg-[#0F1C2B] shadow-lg  z-50 transition-colors duration-300 fixed top-0 left-0 right-0'>
      <div className='container mx-auto flex items-center justify-between h-20 px-4 md:px-6 '>
        {/* Logo and Title */}
        <div className='flex items-center gap-3'>
          <img src={logo} alt='Logo' className='h-12 md:h-16 w-auto' />
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-600'>
            Jesus Is LORD Radio
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-10'>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  relative text-white font-semibold
                  text-sm sm:text-base md:text-lg lg:text-xl
                  hover:text-yellow-400 transition
                  after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all
                  ${isActive ? 'after:w-full' : 'after:w-0'}
                  hover:after:w-full
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Always visible theme toggle & hamburger */}
        <div className='flex items-center gap-4'>
          <div className='transform scale-125 md:scale-150 text-white hover:text-yellow-800 transition-colors'>
            <ThemeToggle />
          </div>
          {/* Hamburger for mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='focus:outline-none text-white md:hidden'
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-[#1D3A5F] dark:bg-[#0F1C2B] flex flex-col items-center py-6 space-y-4 transition-all'>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`
                  text-white font-semibold
                  text-base sm:text-lg
                  hover:text-yellow-400 transition
                  ${isActive ? 'text-yellow-400' : ''}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
