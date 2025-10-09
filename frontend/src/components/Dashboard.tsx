import React, { useEffect } from 'react';
import DashboardActions from './DashboardActions';
import DashboardProjectsList from './DashboardProjectsList';

function Dashboard() {
  useEffect(() => {
    console.log('dahsboard');
  }, []);

  return (
    <>
      <DashboardActions />
      <DashboardProjectsList />
    </>
  );
}

export default Dashboard;
