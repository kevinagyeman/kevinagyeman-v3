import { CopyIcon, SendIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const EmailCopy = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const sendEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <>
      <div className='flex gap-3 max-w-sm'>
        <Input value={email} className='w-full' readOnly />
        <Button
          variant='outline'
          size='icon'
          onClick={handleCopy}
          aria-label='Copy email'
        >
          <CopyIcon />
        </Button>
        <Button
          size='icon'
          onClick={sendEmail}
          aria-label='Send email'
          variant={'outline'}
        >
          <SendIcon />
        </Button>
      </div>
      {copied && <p className='text-sm text-green-600 mt-4'>Email copied!</p>}
    </>
  );
};

export default EmailCopy;
