import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className='text-sm text-text-light dark:text-text-dark opacity-70 mb-4'>
      <Link to='/' className='hover:text-secondary transition'>
        Home
      </Link>
      {paths.map((path, index) => {
        const route = '/' + paths.slice(0, index + 1).join('/');

        return (
          <span key={path}>
            {' / '}
            <Link
              to={route}
              className='hover:text-secondary transition capitalize'
            >
              {path}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
