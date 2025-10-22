export interface Project {
	id: number;
	is_published: boolean | null;
	start_date: string;
	end_date: string | null;
	is_present_date: boolean | null;
	title: string | null;
	description: string | null;
	short_description: string | null;
	image: string | File | null;
	skills: string | null;
	links: string | null;
}
