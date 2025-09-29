import { isAuthenticated } from '@/store/user';
import React, { useEffect } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const refreshUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/auth/user/', {
          credentials: 'include',
        });
        if (res.ok) {
          isAuthenticated.set(true);
          console.log('User is authenticated');
        } else {
          isAuthenticated.set(false);
        }
      } catch {
        isAuthenticated.set(false);
      }
    };

    refreshUser();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
