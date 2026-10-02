import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { projects } from "../../db/models/projects.ts";

export const createProject = (input: {
  workspaceId: string;
  createdBy: string;
  name: string;
  description?: string;
}) => db.insert(projects).values(input).returning();

export const listProjects = (workspaceId: string) => db.select().from(projects)
  .where(eq(projects.workspaceId, workspaceId));

export const getProject = (workspaceId: string, projectId: string) => db.select().from(projects)
  .where(and(eq(projects.workspaceId, workspaceId), eq(projects.id, projectId)))
  .limit(1);

export const updateProject = (workspaceId: string, projectId: string, changes: {
  name?: string;
  description?: string | null;
  status?: "ACTIVE" | "ARCHIVED";
}) => db.update(projects).set(changes)
  .where(and(eq(projects.workspaceId, workspaceId), eq(projects.id, projectId)))
  .returning();

export const deleteProject = (workspaceId: string, projectId: string) => db.delete(projects)
  .where(and(eq(projects.workspaceId, workspaceId), eq(projects.id, projectId)))
  .returning({ id: projects.id });
