import { DASHBOARD_URL } from '@/constants';
import { projectSchema, type ProjectSchema } from '@/schemas/project-schema';
import {
  createProject,
  deleteProject,
  fetchProject,
  updateProject,
} from '@/services/project';
import { filterData, handleFilePreview } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import CustomCheckbox from './form/CustomCheckbox';
import CustomInput from './form/CustomInput';
import CustomTextArea from './form/CustomTextArea';
import CustomUpload from './form/CustomUpload';
import { Button } from './ui/button';

interface ProjectFormProps {
  projectId?: string;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const [imagePreview, setImagePreview] = useState<string>('');

  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
  });

  const errors = form.formState.errors;

  useEffect(() => {
    if (!projectId) return;
    if (projectId === 'new') return;

    loadProject(projectId);
  }, [projectId]);

  const loadProject = async (id: string) => {
    const data: any = await fetchProject(id);
    handleFilePreview(data, setImagePreview, 'image');
    form.reset(data);
  };

  const submitProject: SubmitHandler<ProjectSchema> = async (data) => {
    if (projectId) {
      await updateProject(projectId, filterData(data));
    } else {
      await createProject(filterData(data));
    }
    window.location.href = DASHBOARD_URL;
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    window.location.href = DASHBOARD_URL;
  };

  return (
    <>
      <div className='flex gap-2 my-5 justify-between'>
        <Button size={'sm'} variant={'outline'}>
          <a href={DASHBOARD_URL}>Dashboard</a>
        </Button>
        {projectId && (
          <Button
            onClick={() => handleDelete(projectId)}
            size={'sm'}
            variant={'destructive'}
          >
            <TrashIcon className='size-4' />
          </Button>
        )}
      </div>
      <form
        onSubmit={form.handleSubmit(submitProject)}
        className='space-y-6'
        encType='multipart/form-data'
      >
        <CustomCheckbox
          inputProps={form.register('is_published')}
          label='Published'
        />
        <CustomUpload
          preview={imagePreview}
          typeOfFile={'image'}
          fieldName='image'
          formControl={form.control}
          error={errors.image?.message}
          labelText='Project Image'
          aspectRatio='16/9'
        />
        <div className='flex flex-wrap gap-4 items-end'>
          <div className='flex-1 min-w-full sm:min-w-0'>
            <CustomInput
              inputType='text'
              placeholder='Title'
              labelText='Title'
              inputProps={form.register('title')}
              error={errors.title?.message}
            />
          </div>
          <div className='w-full sm:w-auto'>
            <CustomInput
              inputType='date'
              labelText='Start Date'
              placeholder='Start Date'
              inputProps={form.register('start_date')}
              error={errors.start_date?.message}
            />
          </div>
          <div className='w-full sm:w-auto'>
            <CustomInput
              inputType='date'
              labelText='End Date'
              placeholder='End Date'
              inputProps={form.register('end_date')}
              error={errors.end_date?.message}
            />
          </div>
          <div className='w-full sm:w-auto'>
            <CustomCheckbox
              inputProps={form.register('is_present_date')}
              label='Present'
            />
          </div>
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
          hint='Separate with ; e.g, React;Python;Java'
        />
        <CustomTextArea
          labelText='Links'
          placeholder='Links'
          textAreaProps={form.register('links')}
          error={errors.links?.message}
          hint='Separate with ; e.g, Example;https://ex.com;Google;https://gg.com'
        />
        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='w-full'
        >
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
