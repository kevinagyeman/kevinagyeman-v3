import { deleteProject, fetchProjects } from '@/services/project';
import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import DateDisplay from './DateDisplay';
import { Button } from './ui/button';
import type { Project } from '@/types/project-type';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

function DashboardProjectsList() {
  const [projects, setProjects] = useState<Project[]>();

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: number) => {
    const data = await deleteProject(id);
    window.location.reload();
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold mt-5'>Projects List</h2>
      <div className='space-y-3 mt-2'>
        {projects?.map((project: Project, index: number) => (
          <div
            className='flex justify-between p-2 border rounded-xl items-center bg-card'
            key={project.id}
          >
            <div className='flex gap-4 items-center'>
              <span
                className={`w-[10px] h-[10px] flex-shrink-0 rounded-full ${
                  project.is_published ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              ></span>
              <DateDisplay period={project} />
              <h4 className='text-lg font-semibold line-clamp-1'>
                {project.title}
              </h4>
            </div>
            <div className='flex gap-2'>
              <Button size={'sm'} variant={'outline'}>
                <a href={`/admin/project/${project.id}`}>Edit</a>
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='destructive' size={'sm'}>
                    <TrashIcon className='size-4' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-fit'>
                  <Button
                    onClick={() => handleDelete(project.id)}
                    variant={'destructive'}
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardProjectsList;
