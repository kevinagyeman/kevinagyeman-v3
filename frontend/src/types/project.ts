export interface Project {
  id?: number;
  is_published: boolean;
  start_date: string; // formato ISO date, es. "2025-09-12"
  end_date: string | null;
  is_present_date: boolean | null;
  title: string;
  description: string | null;
  short_description: string | null;
  image_link: string | null;
  skills: string | null;
  links: string | null;
}
