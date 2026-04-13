import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'prophecies', label: 'Prophecies' },
    { id: 'teachings', label: 'Teachings' },
    { id: 'events', label: 'Events' },
    { id: 'testimonies', label: 'Programs' },
    { id: 'programs', label: 'Healings & Testimonies' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'about', label: 'About' },
  ];

  // Smooth scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    const nav = document.getElementById('navbar');

    if (el && nav) {
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - nav.offsetHeight;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }

    setIsOpen(false);
  };

  // Scroll spy (active section detection)
  useEffect(() => {
    const handleScroll = () => {
      const offset = 200; // adjust for navbar height

      let closestSection = 'home';
      let minDistance = Infinity;

      links.forEach((link) => {
        const section = document.getElementById(link.id);
        if (!section) return;

        const rect = section.getBoundingClientRect();

        // distance from top of screen
        const distance = Math.abs(rect.top - offset);

        if (rect.top - offset <= 0 && distance < minDistance) {
          minDistance = distance;
          closestSection = link.id;
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id='navbar'
      className='bg-[#0b1e3A] text-white w-full fixed top-0 left-0 z-50 shadow-lg'
    >
      {/* Desktop */}
      <div className='hidden md:flex flex-col items-center py-4 px-6 space-y-6 max-w-6xl mx-auto'>
        {/* Logo */}
        <div className='flex flex-col items-center text-center'>
          <img src={logo} alt='Logo' className='h-16 md:h-20 lg:h-24 mb-2' />
          <h1 className='font-extrabold text-lg md:text-xl lg:text-2xl xl:text-3xl text-yellow-500'>
            JESUS IS LORD RADIO
          </h1>
          <p className='text-xs md:text-sm text-gray-300 mt-1'>
            Preparing The Way For The Return of The Messiah!
          </p>
        </div>

        {/* Links */}
        <div className='flex justify-between w-full items-center text-sm md:text-base lg:text-lg'>
          <div className='flex gap-6'>
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-extrabold transition ${
                  activeSection === link.id
                    ? 'text-yellow-400 underline'
                    : 'hover:text-yellow-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Header */}
      <div className='md:hidden flex items-center justify-between px-4 py-3'>
        <div className='flex items-center gap-2'>
          <img src={logo} alt='Logo' className='h-10' />
          <span className='text-sm font-bold text-yellow-500'>JIL Radio</span>
        </div>

        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-[#1D3A5F] flex flex-col items-center py-6 space-y-5'>
          <img src={logo} alt='Logo' className='h-14' />
          <h1 className='text-lg font-bold text-yellow-500'>
            JESUS IS LORD RADIO
          </h1>

          <div className='flex flex-col gap-3 text-base'>
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition ${
                  activeSection === link.id
                    ? 'text-yellow-400 font-bold underline'
                    : 'hover:text-yellow-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
