import type { ProjectSchema } from '@/schemas/project-schema';
import { fetchProjects } from '@/services/project';
import { useCallback, useEffect, useState } from 'react';
import DateDisplay from './DateDisplay';
import DeleteProject from './DeleteProject';
import { Button } from './ui/button';

function DashboardProjectsList() {
	const [projects, setProjects] = useState<ProjectSchema[]>();

	const loadProjects = useCallback(async () => {
		const data = await fetchProjects();
		setProjects(data);
	}, []);

	useEffect(() => {
		loadProjects();
	}, [loadProjects]);

	return (
		<div>
			<h2 className='text-2xl font-semibold mt-5'>Projects List</h2>
			<div className='space-y-3 mt-2'>
				{projects?.map((project: ProjectSchema) => (
					<div
						className='flex justify-between p-2 border rounded-xl items-center bg-card'
						key={project.id}
					>
						<div className='flex gap-4 items-start'>
							<div>
								<DateDisplay period={project} />
								<div className='flex gap-2 items-center'>
									<span
										className={`w-[10px] h-[10px] flex-shrink-0 rounded-full ${
											project.is_published ? 'bg-green-500' : 'bg-yellow-500'
										}`}
									></span>
									<h4 className='text-base font-semibold line-clamp-1'>
										{project.title}
									</h4>
								</div>
							</div>
						</div>
						<div className='flex gap-2'>
							<Button size={'sm'} variant={'outline'}>
								<a href={`/admin/project/${project.id}`}>Edit</a>
							</Button>
							{project.id && <DeleteProject projectId={project.id} />}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default DashboardProjectsList;
