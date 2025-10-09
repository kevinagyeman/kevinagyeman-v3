import { DASHBOARD_URL } from '@/constants';
import { authSchema, type AuthSchema } from '@/schemas/auth-schema';
import { login } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import CustomInput from './form/CustomInput';
import { Button } from './ui/button';
import { useEffect } from 'react';

export default function Auth() {
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const errors = form.formState.errors;

  const submitAuth: SubmitHandler<AuthSchema> = async (data) => {
    await login(data.username, data.password);
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = DASHBOARD_URL;
  };

  return (
    <form onSubmit={form.handleSubmit(submitAuth)} className='space-y-6'>
      <CustomInput
        labelText='Username'
        inputType='text'
        placeholder='Username'
        inputProps={form.register('username')}
        error={errors.username?.message}
      />
      <CustomInput
        labelText='Password'
        inputType='password'
        placeholder='Password'
        inputProps={form.register('password')}
        error={errors.password?.message}
      />
      <Button type='submit' className='w-full'>
        {form.formState.isSubmitting ? (
          <Loader2 className='animate-spin' />
        ) : (
          'Login'
        )}
      </Button>
    </form>
  );
}
