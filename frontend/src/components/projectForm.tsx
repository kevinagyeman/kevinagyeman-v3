import { projectSchema, type ProjectSchema } from '@/schemas/project-schema';
import {
  createProject,
  deleteProject,
  fetchProject,
  updateProject,
} from '@/services/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import CustomInput from './form/CustomInput';
import CustomTextArea from './form/CustomTextArea';
import { Button } from './ui/button';
import { Label } from './ui/label';
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
    loadProject(projectId);
  }, [projectId]);

  const handleDelete = async (id: string) => {
    try {
      const data = await deleteProject(id);
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const BACKEND_URL = 'http://localhost:8000';

  const loadProject = async (id: string) => {
    try {
      const data = await fetchProject(id);
      if (data.image) {
        // Se data.image è percorso relativo, concatena l'URL del backend
        const imageUrl = data.image.startsWith('http')
          ? data.image
          : `${BACKEND_URL}${data.image}`;
        setProjectImage(imageUrl);
      }
      if (typeof data.image === 'string') {
        delete data.image;
        // Salva URL in uno stato separato
      }
      form.reset(data);
    } catch (error) {
      console.log('Error: ', error);
      window.location.href = '/404';
    }
  };
  const submitProject: SubmitHandler<ProjectSchema> = async (data) => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== '')
      );
      if (projectId) {
        await updateProject(projectId, filteredData);
      } else {
        await createProject(filteredData);
      }
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <>
      {projectId && (
        <button onClick={() => handleDelete(projectId)}>delete project</button>
      )}
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
              <input
                type='file'
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
