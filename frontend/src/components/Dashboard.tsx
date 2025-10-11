import React, { useEffect } from 'react';
import DashboardActions from './DashboardActions';
import DashboardProjectsList from './DashboardProjectsList';
import AuthGuard from './AuthGruard';

function Dashboard() {
  useEffect(() => {
    console.log('dahsboard');
  }, []);

  return (
    <>
      <AuthGuard>
        <DashboardActions />
        <DashboardProjectsList />
      </AuthGuard>
    </>
  );
}

export default Dashboard;
