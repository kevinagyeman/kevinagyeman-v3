import { MAX_FILE_SIZE } from '@/constants';
import z from 'zod';

export const textFormat = z.string().optional().nullable();
export const imageFormat = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE);

export const fileFormat = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE);

export const dateFormat = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD format');
