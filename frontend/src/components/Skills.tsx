import { v4 as uuidv4 } from "uuid";
import { Badge } from "./ui/badge";

export default function Skills({
	skillsString,
	limit = Number.MAX_VALUE,
	variant,
}: {
	skillsString?: string;
	limit?: number;
	variant?:
		| "default"
		| "secondary"
		| "destructive"
		| "outline"
		| null
		| undefined;
}) {
	const safeSkillsString = skillsString ?? "";

	const skills = safeSkillsString
		.split(";")
		.map((skill) => skill.trim())
		.filter((skill) => skill);

	const displayedSkills = skills.slice(0, limit);

	return (
		<div className="flex flex-wrap gap-2">
			{displayedSkills.map((skill: string) => (
				<Badge key={uuidv4()} variant={variant}>
					{skill}
				</Badge>
			))}
		</div>
	);
}
