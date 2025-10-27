import { getUserInfo } from '@/services/auth';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function EditAsAdmin({ href }: { href: string }) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const verify = async () => {
			try {
				const user = await getUserInfo();
				if (user) {
					setIsVisible(true);
				} else {
					setIsVisible(false);
				}
			} catch (_e) {
				setIsVisible(false);
			}
		};

		verify();
	}, []);

	if (!isVisible) {
		return null;
	}

	return (
		<Button asChild size='sm' className='my-4 text-cyan-500 p-0' variant='link'>
			<a href={href}>Edit as admin</a>
		</Button>
	);
}
