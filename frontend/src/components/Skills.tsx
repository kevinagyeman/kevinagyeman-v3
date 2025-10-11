import React from 'react';
import { Badge } from './ui/badge';

export default function Skills({
  skillsString,
  limit = Number.MAX_VALUE,
  variant,
}: {
  skillsString?: string;
  limit?: number;
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | null
    | undefined;
}) {
  const safeSkillsString = skillsString ?? '';

  const skills = safeSkillsString
    .split(';')
    .map((skill) => skill.trim())
    .filter((skill) => skill);

  const displayedSkills = skills.slice(0, limit);

  return (
    <div className='flex flex-wrap gap-2'>
      {displayedSkills.map((skill, index) => (
        <Badge key={index} variant={variant}>
          {skill}
        </Badge>
      ))}
    </div>
  );
}
