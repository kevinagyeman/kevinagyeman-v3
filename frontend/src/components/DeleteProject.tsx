import { TrashIcon } from 'lucide-react';
import { DASHBOARD_URL } from '@/constants';
import { deleteProject } from '@/services/project';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

function DeleteProject({ projectId }: { projectId: number }) {
	const handleDelete = async (id: number) => {
		await deleteProject(id);
		window.location.href = DASHBOARD_URL;
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='destructive' size={'sm'}>
					<TrashIcon className='size-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-fit'>
				<Button onClick={() => handleDelete(projectId)} variant={'destructive'}>
					Delete
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export default DeleteProject;
