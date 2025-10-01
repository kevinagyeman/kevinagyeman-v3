import { formatDate } from '@/utils/utils';
import React from 'react';

type DateDisplayProps = {
  period: {
    start_date: string;
    end_date: string;
    is_present_date: boolean;
  };
};

function DateDisplay({ period }: DateDisplayProps) {
  return (
    <p className='text-sm text-muted-foreground'>
      {formatDate(period.start_date)} -{' '}
      {period.is_present_date || period.end_date === null
        ? 'Present'
        : formatDate(period.end_date)}
    </p>
  );
}

export default DateDisplay;
