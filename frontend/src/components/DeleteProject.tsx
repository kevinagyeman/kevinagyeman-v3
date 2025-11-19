import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { DASHBOARD_URL } from "@/constants";
import { deleteProject } from "@/services/project";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function DeleteProject({ projectId }: { projectId: number }) {
	const [error, setError] = useState<string>("");
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async (id: number) => {
		try {
			setError("");
			setIsDeleting(true);
			await deleteProject(id);
			window.location.href = DASHBOARD_URL;
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to delete project.",
			);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="destructive" size={"sm"}>
					<TrashIcon className="size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit">
				{error && (
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-3 py-2 rounded text-sm mb-2">
						{error}
					</div>
				)}
				<Button
					onClick={() => handleDelete(projectId)}
					variant={"destructive"}
					disabled={isDeleting}
				>
					{isDeleting ? "Deleting..." : "Delete"}
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export default DeleteProject;
