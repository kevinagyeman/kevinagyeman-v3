import React from 'react';
import { Button } from './ui/button';
import { logout } from '@/services/auth';

const handleLogout = async () => {
  await logout();
  window.location.href = '/';
};

function DashboardActions() {
  return (
    <div className='flex gap-2 mt-5'>
      <Button variant={'secondary'}>
        <a href='/admin/project/new'>New Project</a>
      </Button>
      <Button variant={'secondary'}>
        <a href='/admin/information'>Edit Profile</a>
      </Button>
      <Button variant={'outline'} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default DashboardActions;
