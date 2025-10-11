import React from 'react';
import { Button } from './ui/button';
import { File, Github, LinkedinIcon } from 'lucide-react';
import { getResourceUrl } from '@/utils/utils';

function Socials({ resume }: { resume: string }) {
  return (
    <>
      <Button variant='secondary' asChild>
        <a href={getResourceUrl(resume)}>
          {' '}
          Resume <File />
        </a>
      </Button>
      <Button variant='outline' size='icon' className='rounded-full'>
        <a href={'https://www.linkedin.com/in/kevinagyeman/'} target='_blank'>
          <LinkedinIcon className='w-4 h-4' />
        </a>
      </Button>
      <Button variant='outline' size='icon' className='rounded-full'>
        <a href={'https://github.com/kevinagyeman'} target='_blank'>
          <Github className='w-4 h-4' />
        </a>
      </Button>
    </>
  );
}

export default Socials;
