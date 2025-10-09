import { AUTH_API_BASE_URL } from '@/constants';
import { useEffect, useState } from 'react';

function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (window.location.pathname === '/login') {
        setLoading(false); // Se siamo già su login, non fare altro
        return;
      }

      try {
        const res = await fetch(`${AUTH_API_BASE_URL}/user`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (!res.ok) throw new Error();
        setLoading(false);
      } catch {
        localStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.replace('/login');
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default AdminRouteGuard;
