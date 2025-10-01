'use client';

import { ArrowRight, Github, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import Skills from './Skills';
import { Button } from './ui/button';

export default function ProfileInfo({ profile }: { profile: Profile }) {
  return (
    <div className='flex gap-0 sm:gap-12 py-12 md:py-24 lg:py-32 flex-col md:flex-row'>
      <div className='flex gap-4 items-center'>
        <img
          src='/assets/profile.webp'
          alt='profile image'
          className='rounded-lg object-cover aspect-square w-[80px] md:h-full md:w-full'
        />
        <div className='block sm:hidden'>
          <code className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
            {profile.role}
          </code>
          <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-2'>
            {profile.firstName} {profile.lastName}
          </h1>
        </div>
      </div>
      <div className='space-y-6  my-auto'>
        <div className='hidden sm:block'>
          <code className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
            {profile.role}
          </code>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6'>
            {profile.firstName} {profile.lastName}
          </h1>
        </div>
        <p className='text-base sm:text-lg md:text-xl text-muted-foreground font-light'>
          {profile.about}
        </p>
        {profile.skills && (
          <Skills
            skillsString={profile.skills}
            limit={4}
            variant={'secondary'}
          />
        )}
        <div className='flex gap-4 flex-wrap'>
          <Button variant='default' asChild>
            <Link href={`/about`}>
              Read More <ArrowRight className='ml-1 w-4 h-4' />
            </Link>
          </Button>
          <Button variant='secondary' asChild>
            <Link href={`/assets/kevin_agyeman_resume.pdf`}>
              Read my CV <ArrowRight className='ml-1 w-4 h-4' />
            </Link>
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full'
            asChild
          >
            <Link
              href={'https://www.linkedin.com/in/kevinagyeman/'}
              target='_blank'
            >
              <LinkedinIcon className='w-4 h-4' />
            </Link>
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full'
            asChild
          >
            <Link href={'https://github.com/kevinagyeman'} target='_blank'>
              <Github className='w-4 h-4' />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
