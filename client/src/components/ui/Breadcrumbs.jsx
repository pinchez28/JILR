import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <div className='text-sm text-gray-400 mb-4'>
      <Link to='/' className='hover:text-yellow-400'>
        Home
      </Link>

      {paths.map((path, index) => {
        const route = '/' + paths.slice(0, index + 1).join('/');

        return (
          <span key={route}>
            {' / '}
            <Link to={route} className='hover:text-yellow-400 capitalize'>
              {path}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
