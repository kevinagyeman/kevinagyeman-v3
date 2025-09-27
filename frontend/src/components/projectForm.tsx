import {
  createProject,
  fetchProject,
  updateProject,
  deleteProject,
  fetchProjects,
} from '@/services/projects';
import React, { useState, useEffect } from 'react';

interface ProjectFormProps {
  projectId?: number | string;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [projects, setProjects] = useState([]);

  // Fetch projects list on mount
  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects();
      setProjects(data);
    }
    loadProjects();
  }, []);

  // When projectId changes, fetch project data and fill form
  useEffect(() => {
    if (!projectId) return;

    async function loadProject() {
      const project = await fetchProject(projectId);
      setTitle(project.title);
      setStartDate(project.start_date);
    }
    loadProject();
  }, [projectId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (projectId) {
        // Update existing project
        await updateProject(projectId, { title, start_date: startDate });
        console.log('Project updated!');
      } else {
        // Create new project
        await createProject({ title, start_date: startDate });
        console.log('Project created!');
      }
      setTitle('');
      setStartDate('');
      // Refresh projects
      const data = await fetchProjects();
      setProjects(data);
    } catch {
      console.log('Error saving project.');
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteProject(id);
      const data = await fetchProjects();
      setProjects(data);
    } catch {
      console.log('Error deleting project.');
    }
  };

  return (
    <>
      <h2>Projects List:</h2>
      <ul>
        {projects.map((project: any) => (
          <li key={project.id}>
            {project.title}
            <button>edit</button>
            <button onClick={() => handleDelete(project.id)}>
              {' '}
              --- delete ---{' '}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} id='project-form'>
        <label>
          Title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>

        <button type='submit'>{projectId ? 'Update' : 'Submit'}</button>
      </form>
    </>
  );
}
