import React from 'react';
import { Button } from './ui/button';

function DashboardActions() {
  return (
    <div className='flex gap-2 mt-5'>
      <Button variant={'secondary'}>
        <a href='/admin/project/new'>New Project</a>
      </Button>
      <Button variant={'secondary'}>
        <a href='/admin/information'>Edit Profile</a>
      </Button>
    </div>
  );
}

export default DashboardActions;
