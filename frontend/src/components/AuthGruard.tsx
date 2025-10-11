import { getUserInfo } from '@/services/auth';
import React, { useState, useEffect } from 'react';

interface AdminRouteGuardProps {
  children: any;
}

const AuthGuard = ({ children }: AdminRouteGuardProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const userData = await getUserInfo();
        // aggiungi controllo su ruolo admin se serve
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return null; // o fallback
  }

  return <>{children}</>;
};

export default AuthGuard;
