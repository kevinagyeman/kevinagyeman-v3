import { z } from "zod";
import {
	dateFormat,
	fileFormat,
	shortTextFormat,
	textFormat,
} from "./custom-formats";

export const projectSchema = z.object({
	id: z.number().optional(),
	is_present_date: z.boolean(),

	is_published: z.boolean(),

	start_date: dateFormat,
	end_date: dateFormat.optional(),

	title: z.string().min(1),
	description: textFormat,
	short_description: shortTextFormat,
	skills: textFormat,
	links: textFormat,
	image: fileFormat,
});

export type ProjectSchema = z.infer<typeof projectSchema>;
