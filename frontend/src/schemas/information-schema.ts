import { z } from "zod";
import { fileFormat, shortTextFormat, textFormat } from "./custom-formats";

export const informationSchema = z.object({
	first_name: z.string().min(1),
	last_name: textFormat,
	role: textFormat,
	main_link: textFormat,
	email: textFormat,
	summary: shortTextFormat,
	about: textFormat,
	skills: textFormat,
	links: textFormat,
	image: fileFormat,
	resume: fileFormat,
	location: textFormat,
});

export type InformationSchema = z.infer<typeof informationSchema>;
