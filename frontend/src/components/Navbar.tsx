import { useEffect, useState } from 'react';
import { logout } from '../services/auth';
import { ModeToggle } from './ModeToggle';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('Navbar mounted');

    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
  }, []);

  const handleLogout = async () => {
    try {
      const data = await logout();
      localStorage.setItem('isAuthenticated', 'false');
      window.location.href = '/';
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='mb-5'>
      <a href='/' className='mx-5 underline text-blue-700'>
        {isAuthenticated ? 'logged in ' : 'Logged out'} - Home
      </a>
      <a href='/admin/project/new' className='mx-5 underline text-blue-700'>
        new project
      </a>
      <a href='/admin/dashboard' className='mx-5 underline text-blue-700'>
        dashboard
      </a>
      <a href='/login' className='mx-5 underline text-blue-700'>
        Login
      </a>
      <button onClick={handleLogout} className='mx-5 underline text-blue-700'>
        logout
      </button>
      <ModeToggle />
    </div>
  );
}

export default Navbar;
