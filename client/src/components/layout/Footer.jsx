import { ArrowUp } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
  const scrollToTop = () => {
    const nav = document.getElementById('navbar');

    if (nav) {
      const y =
        nav.getBoundingClientRect().top + window.pageYOffset - nav.offsetHeight;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className='bg-[#0b1e3A] text-white py-10  relative'>
      {/* 🔝 Scroll to top button */}
      <button
        onClick={scrollToTop}
        className='absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-500 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition'
      >
        <ArrowUp size={20} />
      </button>

      <div className='max-w-6xl mx-auto px-6'>
        {/* TOP: CENTER LOGO + TITLE */}
        <div className='flex flex-col items-center text-center mb-10'>
          <img src={logo} alt='Logo' className='h-16 mb-2' />

          <h2 className='text-yellow-500 font-extrabold text-xl md:text-2xl'>
            JESUS IS LORD RADIO
          </h2>
        </div>

        {/* MIDDLE: DISTRIBUTED CONTENT */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base text-gray-300'>
          {/* LEFT */}
          <div className='space-y-2'>
            <h3 className='text-yellow-500 font-bold mb-2'>Location</h3>
            <p>P.O Box 16641</p>
            <p>Nakuru 20100</p>
            <p>Kenya</p>
          </div>

          {/* CENTER */}
          <div className='space-y-2'>
            <h3 className='text-yellow-500 font-bold mb-2'>Contacts</h3>
            <p>📞 +254 53 8014798</p>
            <p>📞 +254 774 445 851</p>
            <p>📞 +254 756 605 399</p>
            <p>💬 +254 727 503 030</p>
          </div>

          {/* RIGHT */}
          <div className='space-y-2'>
            <h3 className='text-yellow-500 font-bold mb-2'>Email & Web</h3>
            <p>📧 jesusislord.fmradio@gmail.com</p>
            <p>🌐 www.jesusislordradio.info</p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className='border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-xs md:text-sm'>
          &copy; {new Date().getFullYear()} JESUS IS LORD RADIO. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
