
import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { workspaceMembers } from "../../db/models/workspaceMembers.ts";
import { workspaces } from "../../db/models/workspaces.ts";

export const createWorkspaceWithOwner = (input: {
  name: string;
  slug: string;
  ownerId: string;
  memberIds?: string[];
}) =>
  db.transaction(async (tx) => {
    const [workspace] = await tx.insert(workspaces).values({
      name: input.name,
      slug: input.slug,
      ownerId: input.ownerId,
    }).returning();
    const members = [
      { workspaceId: workspace.id, userId: input.ownerId, role: "OWNER" as const },
      ...[...new Set(input.memberIds ?? [])]
        .filter((userId) => userId !== input.ownerId)
        .map((userId) => ({ workspaceId: workspace.id, userId, role: "MEMBER" as const })),
    ];
    await tx.insert(workspaceMembers).values(members);
    return workspace;
  });

export const addWorkspaceMember = (input: {
  workspaceId: string;
  requesterId: string;
  userId: string;
  role: "ADMIN" | "MEMBER";
}) => db.transaction(async (tx) => {
  const [workspace] = await tx.select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.id, input.workspaceId))
    .limit(1);
  if (!workspace) return { result: "workspace_not_found" as const };

  const [requesterMembership] = await tx.select({ role: workspaceMembers.role })
    .from(workspaceMembers)
    .where(and(
      eq(workspaceMembers.workspaceId, input.workspaceId),
      eq(workspaceMembers.userId, input.requesterId),
    ))
    .limit(1);
  if (!requesterMembership || !["OWNER", "ADMIN"].includes(requesterMembership.role)) {
    return { result: "forbidden" as const };
  }

  const [member] = await tx.insert(workspaceMembers).values({
    workspaceId: input.workspaceId,
    userId: input.userId,
    role: input.role,
  }).returning();
  return { result: "added" as const, member };
});
