import { getDatabaseErrorCode } from "../../db/error.ts";
import { createProject as insertProject, deleteProject, getProject, listProjects, updateProject } from "./project.repository.ts";

export class ProjectError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "ProjectError";
  }
}

export const createWorkspaceProject = async (input: Parameters<typeof insertProject>[0]) => {
  try {
    return (await insertProject(input))[0];
  } catch (error) {
    if (getDatabaseErrorCode(error) === "23503") throw new ProjectError("Workspace or user not found", 404);
    throw error;
  }
};

export const getWorkspaceProjects = listProjects;

export const getWorkspaceProject = async (workspaceId: string, projectId: string) => {
  const [project] = await getProject(workspaceId, projectId);
  if (!project) throw new ProjectError("Project not found", 404);
  return project;
};

export const editWorkspaceProject = async (workspaceId: string, projectId: string, changes: Parameters<typeof updateProject>[2]) => {
  const [project] = await updateProject(workspaceId, projectId, changes);
  if (!project) throw new ProjectError("Project not found", 404);
  return project;
};

export const removeWorkspaceProject = async (workspaceId: string, projectId: string) => {
  const [deleted] = await deleteProject(workspaceId, projectId);
  if (!deleted) throw new ProjectError("Project not found", 404);
};
