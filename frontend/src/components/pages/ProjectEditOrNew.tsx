import React from 'react';
import AuthGuard from '../AuthGruard';
import ProjectForm from '../ProjectForm';

const ProjectEditOrNew = ({ projectId }: { projectId?: any }) => {
  return (
    <AuthGuard>
      <ProjectForm projectId={projectId} />
    </AuthGuard>
  );
};

export default ProjectEditOrNew;
