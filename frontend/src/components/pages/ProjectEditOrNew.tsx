import AuthGuard from "../AuthGruard";
import ProjectForm from "../ProjectForm";

const ProjectEditOrNew = ({ projectId }: { projectId?: string }) => {
	return (
		<AuthGuard>
			<ProjectForm projectId={projectId} />
		</AuthGuard>
	);
};

export default ProjectEditOrNew;
