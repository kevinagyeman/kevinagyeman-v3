import { useState, useEffect } from 'react';
import Auth from './Auth';

export default function LoginWrapper() {
  const [token, setToken] = useState(null);

  function handleLogin(newToken: any) {
    setToken(newToken);
  }

  useEffect(() => {
    if (token) {
      window.location.href = '/dashboard';
    }
  }, [token]);

  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  return null;
}
