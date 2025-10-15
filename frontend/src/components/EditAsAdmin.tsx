import { Button } from './ui/button';
import { isAuthenticated } from '../store/user';

export default function EditAsAdmin({ href }: { href: string }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return (
    <>
      {isAuthenticated ? (
        <Button asChild size={'sm'} className='my-4' variant={'outline'}>
          <a href={href} className='text-cyan-500'>
            Edit as admin
          </a>
        </Button>
      ) : null}
    </>
  );
}
