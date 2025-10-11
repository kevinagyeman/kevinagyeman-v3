import { DASHBOARD_URL } from '@/constants';
import {
  informationSchema,
  type InformationSchema,
} from '@/schemas/information-schema';
import { fetchInformation, updateInformation } from '@/services/information';
import { filterData, handleFilePreview } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import CustomInput from './form/CustomInput';
import CustomTextArea from './form/CustomTextArea';
import CustomUpload from './form/CustomUpload';
import { Button } from './ui/button';
import AuthGuard from './AuthGruard';
import type { Information } from '@/types/information-type';

export default function InformationForm() {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [resumePreview, setResumePreview] = useState<string>('');

  const form = useForm<InformationSchema>({
    resolver: zodResolver(informationSchema),
  });

  const errors = form.formState.errors;

  useEffect(() => {
    loadInformation();
  }, []);

  const loadInformation = async () => {
    const data: any = await fetchInformation();
    handleFilePreview(data, setImagePreview, 'image');
    handleFilePreview(data, setResumePreview, 'resume');
    form.reset(data);
  };

  const submitInformation: SubmitHandler<InformationSchema> = async (data) => {
    await updateInformation(filterData(data));
    window.location.href = DASHBOARD_URL;
  };

  return (
    <AuthGuard>
      <form
        onSubmit={form.handleSubmit(submitInformation)}
        className='space-y-6'
        encType='multipart/form-data'
      >
        <CustomUpload
          preview={imagePreview}
          typeOfFile={'image'}
          fieldName='image'
          formControl={form.control}
          error={errors.image?.message}
          labelText='Profile Image'
          aspectRatio='1/1'
        />

        <CustomUpload
          preview={resumePreview}
          typeOfFile={'file'}
          fieldName='resume'
          formControl={form.control}
          error={errors.resume?.message}
          labelText='Resume'
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <CustomInput
            inputType='text'
            placeholder='First Name'
            labelText='First Name'
            inputProps={form.register('first_name')}
            error={errors.first_name?.message}
          />
          <CustomInput
            inputType='text'
            placeholder='Last Name'
            labelText='Last Name'
            inputProps={form.register('last_name')}
            error={errors.last_name?.message}
          />
          <CustomInput
            inputType='email'
            placeholder='Email'
            labelText='Email'
            inputProps={form.register('email')}
            error={errors.email?.message}
          />
          <CustomInput
            inputType='text'
            placeholder='Role'
            labelText='Role'
            inputProps={form.register('role')}
            error={errors.role?.message}
          />
        </div>
        <CustomInput
          inputType='text'
          placeholder='Main Link'
          labelText='Main Link'
          inputProps={form.register('main_link')}
          error={errors.main_link?.message}
        />
        <CustomTextArea
          labelText='Summary'
          placeholder='Summary'
          textAreaProps={form.register('summary')}
          error={errors.summary?.message}
        />
        <CustomTextArea
          labelText='About'
          placeholder='About'
          textAreaProps={form.register('about')}
          error={errors.about?.message}
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

        <Button type='submit'>
          {form.formState.isSubmitting ? (
            <Loader2 className='animate-spin' />
          ) : (
            'Confirm'
          )}
        </Button>
      </form>
    </AuthGuard>
  );
}
