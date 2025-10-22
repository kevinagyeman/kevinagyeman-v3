import AuthGuard from '../AuthGruard';
import DashboardActions from '../DashboardActions';
import DashboardProjectsList from '../DashboardProjectsList';

function Dashboard() {
	return (
		<AuthGuard>
			<DashboardActions />
			<DashboardProjectsList />
		</AuthGuard>
	);
}

export default Dashboard;
