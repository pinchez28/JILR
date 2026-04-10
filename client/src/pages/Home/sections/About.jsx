import { useEffect, useState } from 'react';
import { prophecyApi } from '../../../api/prophecies';

const About = () => {
  return (
    <section id='about' className='p-6 max-w-6xl mx-auto space-y-8'>
      {/* PAGE TITLE */}
      <div>
        <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline'>
          About
        </h1>
      </div>
    </section>
  );
};

export default About;
