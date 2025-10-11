import React, { useEffect } from 'react';
import DashboardActions from './DashboardActions';
import DashboardProjectsList from './DashboardProjectsList';
import AdminRouteGuard from './AdminRouteGruard';

function Dashboard() {
  useEffect(() => {
    console.log('dahsboard');
  }, []);

  return (
    <>
      <AdminRouteGuard>
        <DashboardActions />
        <DashboardProjectsList />
      </AdminRouteGuard>
    </>
  );
}

export default Dashboard;
