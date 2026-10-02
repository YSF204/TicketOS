import type { Request, Response } from "express";
import { z } from "zod";
import { CreateProjectSchema, UpdateProjectSchema } from "../../schema/project.schema.ts";
import {
  createWorkspaceProject,
  editWorkspaceProject,
  getWorkspaceProject,
  getWorkspaceProjects,
  ProjectError,
  removeWorkspaceProject,
} from "./project.service.ts";

const parseIds = (req: Request) => ({
  workspaceId: z.uuid().safeParse(req.params.workspaceId),
  projectId: req.params.projectId === undefined ? undefined : z.uuid().safeParse(req.params.projectId),
});

const handleError = (res: Response, error: unknown) => {
  if (error instanceof ProjectError) return res.status(error.status).json({ message: error.message });
  throw error;
};

export const createProjectController = async (req: Request, res: Response) => {
  const { workspaceId } = parseIds(req);
  const input = CreateProjectSchema.safeParse(req.body);
  const createdBy = req.user?.sub;
  if (!workspaceId.success || !input.success) return res.status(400).json({ message: "Invalid project data" });
  if (typeof createdBy !== "string") return res.status(401).json({ message: "Authentication required" });
  try {
    return res.status(201).json(await createWorkspaceProject({ ...input.data, workspaceId: workspaceId.data, createdBy }));
  } catch (error) { return handleError(res, error); }
};

export const listProjectsController = async (req: Request, res: Response) => {
  const { workspaceId } = parseIds(req);
  if (!workspaceId.success) return res.status(400).json({ message: "Invalid workspace ID" });
  try { return res.json(await getWorkspaceProjects(workspaceId.data)); }
  catch (error) { return handleError(res, error); }
};

export const getProjectController = async (req: Request, res: Response) => {
  const { workspaceId, projectId } = parseIds(req);
  if (!workspaceId.success || !projectId?.success) return res.status(400).json({ message: "Invalid project ID" });
  try { return res.json(await getWorkspaceProject(workspaceId.data, projectId.data)); }
  catch (error) { return handleError(res, error); }
};

export const updateProjectController = async (req: Request, res: Response) => {
  const { workspaceId, projectId } = parseIds(req);
  const input = UpdateProjectSchema.safeParse(req.body);
  if (!workspaceId.success || !projectId?.success || !input.success) return res.status(400).json({ message: "Invalid project data" });
  try { return res.json(await editWorkspaceProject(workspaceId.data, projectId.data, input.data)); }
  catch (error) { return handleError(res, error); }
};

export const deleteProjectController = async (req: Request, res: Response) => {
  const { workspaceId, projectId } = parseIds(req);
  if (!workspaceId.success || !projectId?.success) return res.status(400).json({ message: "Invalid project ID" });
  try {
    await removeWorkspaceProject(workspaceId.data, projectId.data);
    return res.status(204).end();
  } catch (error) { return handleError(res, error); }
};
