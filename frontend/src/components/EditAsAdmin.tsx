import { Button } from './ui/button';

export default function EditAsAdmin({ href }: { href: string }) {
  return (
    <>
      {false ? (
        <Button asChild size={'sm'} className='my-4' variant={'outline'}>
          <a href={href} className='text-cyan-500'>
            Edit as admin
          </a>
        </Button>
      ) : null}
    </>
  );
}
