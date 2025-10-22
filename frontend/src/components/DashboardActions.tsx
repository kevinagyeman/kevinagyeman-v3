import { LogOut } from 'lucide-react';
import { logout } from '@/services/auth';
import TriggerRedeployButton from './TriggerRedeploy';
import { Button } from './ui/button';

const handleLogout = async () => {
	await logout();
	window.location.href = '/';
};

function DashboardActions() {
	return (
		<div className='flex gap-2 mt-5 flex-wrap'>
			<Button variant={'secondary'}>
				<a href='/admin/project/new'>New Project</a>
			</Button>
			<Button variant={'secondary'}>
				<a href='/admin/information'>Edit Profile</a>
			</Button>

			<TriggerRedeployButton />
			<Button variant={'outline'} onClick={handleLogout} className='ml-auto'>
				<LogOut />
			</Button>
		</div>
	);
}

export default DashboardActions;
