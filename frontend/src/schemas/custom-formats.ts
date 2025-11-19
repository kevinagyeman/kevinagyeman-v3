import z from "zod";
import { MAX_FILE_SIZE } from "@/constants";

export const textFormat = z.string().nullable();
export const fileFormat = z
	.union([
		z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
			message: "File size must be less than 1MB",
		}),
		z.string(),
	])
	.nullable()
	.optional();

export const dateFormat = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format");
