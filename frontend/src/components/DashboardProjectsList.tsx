import type { ProjectSchema } from "@/schemas/project-schema";
import { fetchProjects } from "@/services/project";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import DateDisplay from "./DateDisplay";
import DeleteProject from "./DeleteProject";
import { Button } from "./ui/button";

function DashboardProjectsList() {
	const [projects, setProjects] = useState<ProjectSchema[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>("");

	const loadProjects = async () => {
		try {
			setIsLoading(true);
			setError("");
			const data = await fetchProjects();
			setProjects(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load projects");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadProjects();
	}, []);

	return (
		<div>
			<h2 className="text-2xl font-semibold">Projects List</h2>
			{error && (
				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded mt-2">
					{error}
				</div>
			)}
			{isLoading ? (
				<div className="flex justify-center items-center py-8">
					<Loader2 className="animate-spin h-8 w-8" />
				</div>
			) : (
				<div className="space-y-3 mt-2">
					{projects?.map((project: ProjectSchema) => (
						<div
							className="flex justify-between p-2 border rounded-xl items-center bg-card"
							key={project.id}
						>
							<div className="flex gap-4 items-start">
								<div>
									<DateDisplay period={project} />
									<div className="flex gap-2 items-center">
										<span
											className={`w-[10px] h-[10px] flex-shrink-0 rounded-full ${
												project.is_published ? "bg-green-500" : "bg-yellow-500"
											}`}
										></span>
										<h4 className="text-base font-semibold line-clamp-1">
											{project.title}
										</h4>
									</div>
								</div>
							</div>
							<div className="flex gap-2">
								<Button size={"sm"} variant={"outline"}>
									<a href={`/admin/project/${project.id}`}>Edit</a>
								</Button>
								{project.id && <DeleteProject projectId={project.id} />}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default DashboardProjectsList;
