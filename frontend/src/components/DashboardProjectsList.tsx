import { deleteProject, fetchProjects } from '@/services/project';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Trash, TrashIcon } from 'lucide-react';
import { formatDate } from '@/utils/utils';

function DashboardProjectsList() {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const data = await deleteProject(id);
    window.location.reload();
  };

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold mt-5'>Projects List</h2>
      <div className='space-y-3 mt-2'>
        {projects?.map((project: any, number: any) => (
          <div
            className='flex justify-between p-2 border rounded-xl items-center bg-card'
            key={number}
          >
            <div className='flex gap-4 items-center'>
              <div
                className={`w-[10px] h-[10px] rounded-full ${
                  project.is_published ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              />
              <p className='text-sm text-muted-foreground'>
                {formatDate(project.start_date)} -{' '}
                {project.is_present_date || project.end_date === null
                  ? 'Present'
                  : formatDate(project.end_date)}
              </p>
              <h4 className='text-lg font-semibold'>{project.title}</h4>
            </div>
            <div className='flex gap-2'>
              <Button size={'sm'} variant={'outline'}>
                <a href={`/admin/project/${project.id}`}>Edit</a>
              </Button>
              <Button
                onClick={() => handleDelete(project.id)}
                size={'sm'}
                variant={'destructive'}
              >
                <TrashIcon className='size-4' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardProjectsList;
