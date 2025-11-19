import { z } from "zod";
import { dateFormat, fileFormat, textFormat } from "./custom-formats";

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
	image: fileFormat,
});

export type ProjectSchema = z.infer<typeof projectSchema>;
