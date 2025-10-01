import { z } from 'zod';
import { fileFormat, imageFormat, textFormat } from './custom-formats';

export const informationSchema = z.object({
  first_name: z.string().min(1),
  last_name: textFormat,
  role: textFormat,
  main_link: textFormat,
  email: textFormat,
  summary: textFormat,
  about: textFormat,
  skills: textFormat,
  links: textFormat,
  image: imageFormat.optional(),
  resume: fileFormat.optional(),
});

export type InformationSchema = z.infer<typeof informationSchema>;
