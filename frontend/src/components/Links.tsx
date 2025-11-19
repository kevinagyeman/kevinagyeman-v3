import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
export default function Links({ linksString }: { linksString?: string }) {
	const safeLinksString = linksString ?? "";

	const linksArray = safeLinksString.split(";").filter((item) => item.trim());

	const links = [];
	for (let i = 0; i < linksArray.length; i += 2) {
		if (linksArray[i + 1]) {
			links.push({ label: linksArray[i], url: linksArray[i + 1] });
		}
	}

	return (
		<div className="flex flex-wrap gap-2">
			{links.map((link) => (
				<Button key={`${link.label}-${link.url}`} variant="outline" asChild>
					<a href={link.url} target="_blank" rel="noopener noreferrer">
						{link.label}
						<ArrowUpRight />
					</a>
				</Button>
			))}
		</div>
	);
}
