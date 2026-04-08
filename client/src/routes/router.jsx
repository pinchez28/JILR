import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home/Home';
import LiveRadio from '../pages/Radio/LiveRadio';
import Programs from '../pages/Programs/Programs';
import Prophesies from '../pages/prophesies/Prophesies';
import Events from '../pages/Events/Events';
import Teachings from '../pages/Teachings/Teachings';
import Testimonies from '../pages/Testimonies/Testimonies';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';
import Gallery from '../pages/Gallery/Gallery';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='radio' element={<LiveRadio />} />
          <Route path='programs' element={<Programs />} />
          <Route path='prophesies' element={<Prophesies />} />
          <Route path='events' element={<Events />} />
          <Route path='teachings' element={<Teachings />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='testimonies' element={<Testimonies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
