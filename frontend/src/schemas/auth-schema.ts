import { z } from 'zod';
import { dateFormat, imageFormat, textFormat } from './custom-formats';

export const authSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type AuthSchema = z.infer<typeof authSchema>;
