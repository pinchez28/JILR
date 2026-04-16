import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';

const Gallery = lazy(() => import('../pages/Gallery/Gallery'));
const Teachings = lazy(() => import('../pages/Teachings/Teachings'));
const Testimonies = lazy(() => import('../pages/Testimonies/Testimonies'));
const Prophecies = lazy(() => import('../pages/Prophecies/Prophecies'));

const Loader = () => (
  <div className='flex items-center justify-center h-screen text-yellow-400'>
    Loading...
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      {
        path: 'gallery',
        element: (
          <Suspense fallback={<Loader />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: 'teachings',
        element: (
          <Suspense fallback={<Loader />}>
            <Teachings />
          </Suspense>
        ),
      },
      {
        path: 'testimonies',
        element: (
          <Suspense fallback={<Loader />}>
            <Testimonies />
          </Suspense>
        ),
      },
      {
        path: 'prophecies',
        element: (
          <Suspense fallback={<Loader />}>
            <Prophecies />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
