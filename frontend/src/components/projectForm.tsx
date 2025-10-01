import { projectSchema, type ProjectSchema } from '@/schemas/project-schema';
import {
  createProject,
  deleteProject,
  fetchProject,
  updateProject,
} from '@/services/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import CustomInput from './form/CustomInput';
import CustomTextArea from './form/CustomTextArea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { DASHBOARD_URL } from '@/constants';
import { Input } from './ui/input';

interface ProjectFormProps {
  projectId?: string;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const [projectImage, setProjectImage] = useState<string>('');

  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
  });

  const errors = form.formState.errors;

  useEffect(() => {
    console.log('errors: ', errors);
  }, [errors, form.watch()]);

  useEffect(() => {
    if (!projectId) return;
    if (projectId === 'new') return;

    loadProject(projectId);
  }, [projectId]);

  const handleDelete = async (id: string) => {
    const data = await deleteProject(id);
    window.location.href = DASHBOARD_URL;
  };

  const loadProject = async (id: string) => {
    const data = await fetchProject(id);

    if (!data) {
      window.location.href = '/404';
      return;
    }

    if (data.image) {
      const imageUrl = data.image.startsWith('http')
        ? data.image
        : `${import.meta.env.PUBLIC_BACKEND_URL}${data.image}`;
      setProjectImage(imageUrl);
    }

    if (typeof data.image === 'string') {
      delete data.image;
    }

    form.reset(data);
  };

  const submitProject: SubmitHandler<ProjectSchema> = async (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '')
    );
    if (projectId) {
      await updateProject(projectId, filteredData);
    } else {
      await createProject(filteredData);
    }
    window.location.href = DASHBOARD_URL;
  };

  return (
    <>
      <div className='flex gap-2 my-5 justify-between'>
        <Button className='cursor-pointer' size={'sm'} variant={'outline'}>
          <a href={DASHBOARD_URL}>Dashboard</a>
        </Button>
        {projectId && (
          <Button
            onClick={() => handleDelete(projectId)}
            className='cursor-pointer'
            size={'sm'}
            variant={'destructive'}
          >
            <TrashIcon className='size-4' />
          </Button>
        )}
      </div>
      <form
        onSubmit={form.handleSubmit(submitProject)}
        className='space-y-4'
        encType='multipart/form-data'
      >
        <div className='flex items-center space-x-2'>
          <input type='checkbox' {...form.register('is_published')} />
          <Label>Is Published</Label>
        </div>
        <Controller
          name='image'
          control={form.control}
          render={({ field }) => (
            <>
              {projectImage && !field.value && (
                <img src={projectImage} alt='Preview' />
              )}
              <Input
                type='file'
                accept='image/*'
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
              <small>{errors.image?.message}</small>
            </>
          )}
        />

        <CustomInput
          inputType='text'
          placeholder='Title'
          labelText='Title'
          inputProps={form.register('title')}
          error={errors.title?.message}
        />
        <CustomInput
          inputType='date'
          labelText='Start Date'
          placeholder='Start Date'
          inputProps={form.register('start_date')}
          error={errors.start_date?.message}
        />
        <CustomInput
          inputType='date'
          labelText='End Date'
          placeholder='End Date'
          inputProps={form.register('end_date')}
          error={errors.end_date?.message}
        />
        <div className='flex items-center space-x-2'>
          <input type='checkbox' {...form.register('is_present_date')} />
          <Label>Is Present</Label>
        </div>
        <CustomTextArea
          labelText='Short Description'
          placeholder='Short Description'
          textAreaProps={form.register('short_description')}
          error={errors.short_description?.message}
        />
        <CustomTextArea
          labelText='Description'
          placeholder='Description'
          textAreaProps={form.register('description')}
          error={errors.description?.message}
        />
        <CustomTextArea
          labelText='Skills'
          placeholder='Skills'
          textAreaProps={form.register('skills')}
          error={errors.skills?.message}
        />
        <CustomTextArea
          labelText='Links'
          placeholder='Links'
          textAreaProps={form.register('links')}
          error={errors.links?.message}
        />
        <Button type='submit' className='cursor-pointer'>
          {form.formState.isSubmitting ? (
            <Loader2 className='animate-spin' />
          ) : (
            'Confirm'
          )}
        </Button>
      </form>
    </>
  );
}
