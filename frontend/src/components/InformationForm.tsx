import { DASHBOARD_URL } from '@/constants';
import {
  informationSchema,
  type InformationSchema,
} from '@/schemas/information-schema';
import { fetchInformation, updateInformation } from '@/services/information';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import CustomInput from './form/CustomInput';
import CustomTextArea from './form/CustomTextArea';
import { Button } from './ui/button';

export default function InformationForm() {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [resumePreview, setResumePreview] = useState<string>(''); // Se vuoi mostrare preview file resume (es. nome o icona)

  const form = useForm<InformationSchema>({
    resolver: zodResolver(informationSchema),
  });

  const errors = form.formState.errors;

  useEffect(() => {
    loadInformation();
  }, []);

  const loadInformation = async () => {
    const data = await fetchInformation();

    // Gestione preview immagine
    if (data.image) {
      const imageUrl = data.image.startsWith('http')
        ? data.image
        : `${import.meta.env.PUBLIC_BACKEND_URL}${data.image}`;
      setImagePreview(imageUrl);
    }

    // Gestione preview resume se serve, qui esempio generico del nome file
    if (data.resume) {
      const resumeUrl = data.resume.startsWith('http')
        ? data.resume
        : `${import.meta.env.PUBLIC_BACKEND_URL}${data.resume}`;
      setResumePreview(resumeUrl);
    }

    // Non passare stringa URL come valore di input file
    if (typeof data.image === 'string') {
      delete data.image;
    }
    if (typeof data.resume === 'string') {
      delete data.resume;
    }

    form.reset(data);
  };

  const submitInformation: SubmitHandler<InformationSchema> = async (data) => {
    // Filtra chiavi con valori ''
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '')
    );

    await updateInformation(filteredData);

    window.location.href = DASHBOARD_URL;
  };

  return (
    <form
      onSubmit={form.handleSubmit(submitInformation)}
      className='space-y-4'
      encType='multipart/form-data'
    >
      <Controller
        name='image'
        control={form.control}
        render={({ field }) => (
          <>
            <label>Profile pic</label>
            {imagePreview && !field.value && (
              <img src={imagePreview} alt='Information Image Preview' />
            )}
            <input
              type='file'
              accept='image/*'
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
            <small>{errors.image?.message}</small>
          </>
        )}
      />

      <Controller
        name='resume'
        control={form.control}
        render={({ field }) => (
          <>
            <label>Resume</label>
            {resumePreview && !field.value && (
              <a href={resumePreview} target='_blank' rel='noopener noreferrer'>
                View current resume
              </a>
            )}
            <input
              type='file'
              accept='application/pdf'
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
            <small>{errors.resume?.message}</small>
          </>
        )}
      />

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
        inputType='text'
        placeholder='Role'
        labelText='Role'
        inputProps={form.register('role')}
        error={errors.role?.message}
      />
      <CustomInput
        inputType='text'
        placeholder='Main Link'
        labelText='Main Link'
        inputProps={form.register('main_link')}
        error={errors.main_link?.message}
      />
      <CustomInput
        inputType='email'
        placeholder='Email'
        labelText='Email'
        inputProps={form.register('email')}
        error={errors.email?.message}
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
  );
}
