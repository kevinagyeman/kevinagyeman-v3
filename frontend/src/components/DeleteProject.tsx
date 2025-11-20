import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { DASHBOARD_URL } from "@/constants";
import { deleteProject } from "@/services/project";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ErrorAlert from "./ui/ErrorAlert";

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
				<ErrorAlert error={error} />
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
