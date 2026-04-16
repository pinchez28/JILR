import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import { scrollToSection } from '../../utils/scrollToSection';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // ✅ ADDED

  const navigate = useNavigate();

  // ROUTE LINKS (pages)
  const routeLinks = [
    { to: '/', label: 'Home' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/prophecies', label: 'Prophecies' },
    { to: '/testimonies', label: 'Testimonies' },
    { to: '/teachings', label: 'Teachings' },
  ];

  // SECTION LINKS (Home sections)
  const sectionLinks = [
    { id: 'events', label: 'Events' },
    { id: 'programs', label: 'Programs' },
    { id: 'contacts', label: 'Contact Us' },
    { id: 'about', label: 'About' },
  ];

  const handleSectionClick = (id) => {
    setIsOpen(false);
    navigate('/');

    setTimeout(() => {
      scrollToSection(id);
    }, 200);
  };

  // ✅ SCROLL SPY (ADDED)
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className='bg-[#0b1e3A] text-white w-full fixed top-0 left-0 z-50 shadow-lg'>
      {/* ================= DESKTOP ================= */}
      <div className='hidden md:flex flex-col items-center py-4 px-6 space-y-6 max-w-6xl mx-auto'>
        {/* LOGO */}
        <div className='flex flex-col items-center text-center'>
          <img src={logo} alt='Logo' className='h-6 md:h-10 lg:h-12 mb-2' />
          <h1 className='font-extrabold text-lg md:text-xl lg:text-2xl xl:text-3xl text-yellow-500'>
            JESUS IS LORD RADIO
          </h1>
          <p className='text-xs md:text-sm text-gray-300 mt-1'>
            Preparing The Way For The Return of The Messiah!
          </p>
        </div>

        {/* LINKS */}
        <div className='flex w-full items-center justify-center gap-10 text-sm md:text-base lg:text-lg'>
          {/* ROUTE LINKS */}
          <div className='flex gap-6'>
            {routeLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative font-extrabold transition ${
                    isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* SECTION LINKS (UPDATED) */}
          <div className='flex gap-6'>
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSectionClick(link.id)}
                className={`font-extrabold transition ${
                  activeSection === link.id
                    ? 'text-yellow-400'
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

      {/* ================= MOBILE HEADER ================= */}
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

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className='fixed inset-0 bg-black/50 md:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className='fixed top-0 right-0 w-[75%] h-full bg-[#1D3A5F] md:hidden z-50 flex flex-col items-center py-10 space-y-6'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <img src={logo} alt='Logo' className='h-14' />

              <h1 className='text-lg font-bold text-yellow-500'>
                JESUS IS LORD RADIO
              </h1>

              {/* ROUTE LINKS */}
              {routeLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className='text-lg hover:text-yellow-400'
                >
                  {link.label}
                </NavLink>
              ))}

              {/* SECTION LINKS (UPDATED) */}
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleSectionClick(link.id)}
                  className={`text-lg transition ${
                    activeSection === link.id
                      ? 'text-yellow-400'
                      : 'hover:text-yellow-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
