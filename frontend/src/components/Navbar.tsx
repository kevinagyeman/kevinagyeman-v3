import { useEffect, useState } from 'react';
import { logout } from '../services/auth';
import { ModeToggle } from './ModeToggle';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import Logo from './Logo';
import { fetchInformation } from '@/services/information';
import { AUTH_API_BASE_URL, DASHBOARD_URL } from '@/constants';
import { getResourceUrl } from '@/utils/utils';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [information, setInformation] = useState<any>();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
    loadInformation();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const loadInformation = async () => {
    const data = await fetchInformation();
    setInformation(data);
  };

  const resumeUrl = getResourceUrl(information?.resume);
  const imageUrl = getResourceUrl(information?.image);

  const navigation = [
    { name: `Home`, href: '/' },
    { name: `About`, href: '/about' },
    { name: `Contact`, href: '/contact' },
    { name: `Resume`, href: resumeUrl },
    ...(false
      ? [
          { name: `Dashboard`, href: '/admin/dashboard' },
          { name: `New Project`, href: '/admin/project/new' },
          {
            name: `Edit Profile`,
            href: '/admin/information',
          },
        ]
      : []),
  ];

  return (
    <>
      {/* <Disclosure
        as='nav'
        className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm'
      > */}
      <Disclosure
        as='nav'
        className='z-50 border-b bg-background/80 backdrop-blur-sm mb-6'
      >
        {({ open }: any) => (
          <>
            <div className='mx-auto container px-4 sm:px-0'>
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
                        <Button asChild variant={'ghost'} key={item.name}>
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
                  <img
                    src={imageUrl}
                    alt='profile'
                    className='w-[30px] h-auto object-cover rounded-full border cursor-pointer'
                    style={{ aspectRatio: '1/1' }}
                    onClick={() => (window.location.href = DASHBOARD_URL)}
                  />
                </div>
              </div>
            </div>
            <Disclosure.Panel className='sm:hidden'>
              <div className='space-y-1 pb-2 container'>
                {/* MOBILE MENU */}
                {navigation.map((item, index: number) => (
                  <a
                    href={item.href}
                    key={index}
                    className={
                      'text-light hover:text-light block rounded-md py-2 text-base font-medium'
                    }
                  >
                    <Disclosure.Button>{item.name}</Disclosure.Button>
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default Navbar;
