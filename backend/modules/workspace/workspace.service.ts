import { addWorkspaceMember as addMember, createWorkspaceWithOwner } from "./workspace.repository.ts";
import { getDatabaseErrorCode } from "../../db/error.ts";

export class WorkspaceError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "WorkspaceError";
  }
}

const translateDatabaseError = (error: unknown, duplicateMessage: string): never => {
  const code = getDatabaseErrorCode(error);
  if (code === "23505") throw new WorkspaceError(duplicateMessage, 409);
  if (code === "23503") throw new WorkspaceError("User not found", 404);
  throw error;
};

export const createWorkspace = async (input: Parameters<typeof createWorkspaceWithOwner>[0]) => {
  try {
    return await createWorkspaceWithOwner(input);
  } catch (error) {
    return translateDatabaseError(error, "Workspace slug already exists");
  }
};

export const addWorkspaceMember = async (input: Parameters<typeof addMember>[0]) => {
  try {
    const result = await addMember(input);
    if (result.result === "workspace_not_found") throw new WorkspaceError("Workspace not found", 404);
    if (result.result === "forbidden") throw new WorkspaceError("Workspace owner or admin role required", 403);
    return result.member;
  } catch (error) {
    if (error instanceof WorkspaceError) throw error;
    return translateDatabaseError(error, "User is already a workspace member");
  }
};
