import { useState } from 'react';

import type { BundledLanguage } from '@/components/kibo-ui/code-block';
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from '@/components/kibo-ui/code-block';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Information } from '@/types/information-type';

export default function CodeViewer({
  information,
}: {
  information: Information;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');

  // Funzione per sanitizzare stringhe in modo che siano sicure da inserire in un codice template
  const sanitizeString = (str: string | undefined) =>
    (str ?? '')
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');

  const tsCode = `// TypeScript object representing a user
interface User {
  firstName: string;
  lastName: string;
  role: string;
  summary: string;
}

const user: User = {
  firstName: "${sanitizeString(information.first_name)}",
  lastName: "${sanitizeString(information.last_name)}",
  role: "${sanitizeString(information.role)}",
  summary: \`${sanitizeString(information.summary)}\`,
};

console.log(user);
`;

  const pyCode = `# Python dictionary representing a user
user = {
    "first_name": "${sanitizeString(information.first_name)}",
    "last_name": "${sanitizeString(information.last_name)}",
    "role": "${sanitizeString(information.role)}",
    "summary": """${sanitizeString(information.summary)}""",
}

print(user)







`;

  const code = [
    {
      language: 'typescript',
      filename: 'user.ts',
      code: tsCode,
    },
    {
      language: 'python',
      filename: 'user.py',
      code: pyCode,
    },
  ];

  return (
    <div>
      <div className='flex w-full flex-col gap-1 overflow-hidden'>
        <Tabs defaultValue='typescript' onValueChange={setSelectedLanguage}>
          <TabsList className='h-10 w-full'>
            <TabsTrigger value='typescript'>Typescript</TabsTrigger>
            <TabsTrigger value='python'>Python</TabsTrigger>
          </TabsList>
        </Tabs>
        <CodeBlock data={code} value={selectedLanguage} className='w-full'>
          <CodeBlockHeader>
            <CodeBlockFiles>
              {(item) => (
                <CodeBlockFilename key={item.language} value={item.language}>
                  {item.filename}
                </CodeBlockFilename>
              )}
            </CodeBlockFiles>
            <CodeBlockCopyButton
              onCopy={() => console.log('Copied code to clipboard')}
              onError={() => console.error('Failed to copy code to clipboard')}
            />
          </CodeBlockHeader>
          <ScrollArea className='w-full'>
            <CodeBlockBody>
              {(item) => (
                <CodeBlockItem
                  key={item.language}
                  value={item.language}
                  className='max-h-96 w-full'
                >
                  <CodeBlockContent language={item.language as BundledLanguage}>
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </CodeBlock>
      </div>
    </div>
  );
}
