import React from 'react';
import { logout } from '../services/auth';

function Navbar() {
  return (
    <div className='mb-5'>
      <a href='/' className='mx-5 underline text-blue-700'>
        Home
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
      <button onClick={logout} className='mx-5 underline text-blue-700'>
        logout
      </button>
    </div>
  );
}

export default Navbar;
