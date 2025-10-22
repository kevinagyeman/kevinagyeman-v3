import { DASHBOARD_URL } from '@/constants';
import type { InformationSchema } from '@/schemas/information-schema';
import { fetchInformation } from '@/services/information';
import { getResourceUrl } from '@/utils/utils';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import Logo from './Logo';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';

function Navbar() {
	const [information, setInformation] = useState<InformationSchema>();

	const loadInformation = useCallback(async () => {
		const data = await fetchInformation();
		setInformation(data);
	}, []);

	useEffect(() => {
		loadInformation();
	}, [loadInformation]);

	const resumeUrl = getResourceUrl(information?.resume);

	const navigation = [
		{ name: `Home`, href: '/' },
		{ name: `About`, href: '/about' },
		{ name: `Contact`, href: '/contact' },
		{ name: `Resume`, href: resumeUrl },
	];

	return (
		<Disclosure
			as='nav'
			className='z-50 sticky top-0 border-b bg-background/80 backdrop-blur-sm mb-6'
			style={{ top: 'env(safe-area-inset-top, 0px)' }}
		>
			{/* sticky top-0 */}
			{({ open }: { open: boolean }) => (
				<>
					<div className='mx-auto container px-4'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								<Disclosure.Button className='relative inline-flex items-center justify-center rounded-md pr-2 text-black hover:text-black   dark:text-white  dark:hover:text-white '>
									<span className='absolute' />
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<Bars3Icon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
								<ModeToggle />
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<a href='/'>
										<Logo />
									</a>
								</div>
								<div className='hidden sm:ml-6 sm:block w-full'>
									<div className='flex space-x-4 flex-wrap'>
										{/* DESKTOP MENU */}
										{navigation.map((item) => (
											<Button
												asChild
												variant={'ghost'}
												key={item.name}
												className=' uppercase'
											>
												<a href={item.href}>{item.name}</a>
											</Button>
										))}
									</div>
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<div className='hidden sm:block'>
									<ModeToggle />
								</div>
								{/* <img
                    src={imageUrl}
                    alt='profile'
                    className='w-[30px] h-auto object-cover rounded-full border cursor-pointer'
                    style={{ aspectRatio: '1/1' }}
                    onClick={() => (window.location.href = DASHBOARD_URL)}
                  /> */}
								<Button
									size={'icon'}
									variant={'outline'}
									className='rounded-full border bg-accent cursor-pointer'
									onClick={() => {
										window.location.href = DASHBOARD_URL;
									}}
								></Button>
							</div>
						</div>
					</div>
					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 pb-2 container px-4'>
							{/* MOBILE MENU */}
							{navigation.map((item) => (
								<a
									href={item.href}
									key={item.href}
									className={
										'text-light hover:text-light block rounded-md py-2 text-base font-medium'
									}
								>
									<Disclosure.Button className=' uppercase'>
										{item.name}
									</Disclosure.Button>
								</a>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

export default Navbar;
