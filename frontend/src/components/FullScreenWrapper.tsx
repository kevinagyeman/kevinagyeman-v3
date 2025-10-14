import type React from 'react';

function FullScreenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-xs'>{children}</div>
    </div>
  );
}

export default FullScreenWrapper;
