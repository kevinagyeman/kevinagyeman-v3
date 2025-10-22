import { File, Github, LinkedinIcon } from 'lucide-react';
import { getResourceUrl } from '@/utils/utils';
import { Button } from './ui/button';

function Socials({ resume }: { resume?: string }) {
	return (
		<>
			{resume && (
				<Button variant='secondary' asChild>
					<a href={getResourceUrl(resume)}>
						{' '}
						Resume <File />
					</a>
				</Button>
			)}
			<Button variant='outline' size='icon' className='rounded-full'>
				<a
					href={'https://www.linkedin.com/in/kevinagyeman/'}
					target='_blank'
					rel='noopener'
				>
					<LinkedinIcon className='w-4 h-4' />
				</a>
			</Button>
			<Button variant='outline' size='icon' className='rounded-full'>
				<a
					href={'https://github.com/kevinagyeman'}
					target='_blank'
					rel='noopener'
				>
					<Github className='w-4 h-4' />
				</a>
			</Button>
		</>
	);
}

export default Socials;
