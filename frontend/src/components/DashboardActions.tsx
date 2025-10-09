import React from 'react';
import { Button } from './ui/button';
import AdminRouteGuard from './AdminRouteGruard';

function DashboardActions() {
  return (
    <AdminRouteGuard>
      <div className='flex gap-2 mt-5'>
        <Button variant={'secondary'}>
          <a href='/admin/project/new'>New Project</a>
        </Button>
        <Button variant={'secondary'}>
          <a href='/admin/information'>Edit Profile</a>
        </Button>
      </div>
    </AdminRouteGuard>
  );
}

export default DashboardActions;
