import React from 'react';
import { Button } from './ui/button';
export default function Links({ linksString }: { linksString?: string }) {
  const safeLinksString = linksString ?? '';

  const linksArray = safeLinksString.split(';').filter((item) => item.trim());

  const links = [];
  for (let i = 0; i < linksArray.length; i += 2) {
    if (linksArray[i + 1]) {
      links.push({ label: linksArray[i], url: linksArray[i + 1] });
    }
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {links.map((link, index) => (
        <Button key={index} variant='outline'>
          <a href={link.url} target='_blank' rel='noopener noreferrer'>
            {link.label}
          </a>
        </Button>
      ))}
    </div>
  );
}
