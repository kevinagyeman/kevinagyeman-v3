import { z } from 'zod';

const dateFormat = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD format');

const textFormat = z.string().optional().nullable();

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const imageSchema = z
  .instanceof(File)
  .refine(
    (file) =>
      ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.type),
    {
      message:
        'Formato immagine non valido. Sono consentiti solo PNG, JPEG, JPG, GIF.',
    }
  )
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "La dimensione dell'immagine non deve superare i 5MB.",
  });

export const projectSchema = z.object({
  id: z.number().optional(),
  is_present_date: z.boolean(),

  is_published: z.boolean(),

  start_date: dateFormat,
  end_date: textFormat,

  title: z.string().min(1),
  description: textFormat,
  short_description: textFormat,
  skills: textFormat,
  links: textFormat,
  image: imageSchema.optional(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
