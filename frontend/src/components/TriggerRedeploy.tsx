import React, { useState } from 'react';
import { Button } from './ui/button';
import { triggerRedeploy } from '@/services/vercel';
import { Loader2 } from 'lucide-react';

function TriggerRedeployButton() {
  const [isLoading, setIsLoading] = useState(false);
  const redeploy = async () => {
    setIsLoading(true);
    try {
      await triggerRedeploy();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={redeploy} className='bg-yellow-500' disabled={isLoading}>
      {isLoading ? <Loader2 className='animate-spin' /> : 'Redeploy'}
    </Button>
  );
}

export default TriggerRedeployButton;
