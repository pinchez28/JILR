import { useEffect, useState } from 'react';
import { prophecyApi } from '../../../api/prophecies';

const Gallery = () => {
  return (
    <section id='gallery' className='p-6 max-w-6xl mx-auto space-y-8'>
      {/* PAGE TITLE */}
      <div>
        <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline'>
          Gallery
        </h1>
      </div>
    </section>
  );
};

export default Gallery;
