import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home/Home';
import LiveRadio from '../pages/Radio/LiveRadio';
import Programs from '../pages/Programs/Programs';
import Prophesies from '../pages/prophesies/Prophesies';
import Events from '../pages/Events/Events';
import Teachings from '../pages/Teachings/Teachings';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';
import Videos from '../pages/Videos/Videos';

const Router = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/radio' element={<LiveRadio />} />
          <Route path='/programs' element={<Programs />} />
          <Route path='/prophesies' element={<Prophesies />} />
          <Route path='/events' element={<Events />} />
          <Route path='/teachings' element={<Teachings />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/videos' element={<Videos />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default Router;
