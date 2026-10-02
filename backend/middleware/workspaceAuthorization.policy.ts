export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";

export const workspaceRoles = {
  member: ["OWNER", "ADMIN", "MEMBER"] as const,
  manager: ["OWNER", "ADMIN"] as const,
};

export const hasWorkspaceRole = (
  role: WorkspaceRole | undefined,
  allowedRoles: readonly WorkspaceRole[],
) => role !== undefined && allowedRoles.includes(role);
