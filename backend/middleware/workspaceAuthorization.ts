import type { NextFunction, Request, Response } from "express";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.ts";
import { workspaceMembers } from "../db/models/workspaceMembers.ts";
import { hasWorkspaceRole, type WorkspaceRole } from "./workspaceAuthorization.policy.ts";

export const requireWorkspaceRole = (...roles: WorkspaceRole[]) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const workspaceId = z.uuid().safeParse(req.params.workspaceId);
  const userId = z.uuid().safeParse(req.user?.sub);
  if (!workspaceId.success) return res.status(400).json({ message: "Invalid workspace ID" });
  if (!userId.success) return res.status(401).json({ message: "Authentication required" });

  const [membership] = await db.select({ role: workspaceMembers.role })
    .from(workspaceMembers)
    .where(and(
      eq(workspaceMembers.workspaceId, workspaceId.data),
      eq(workspaceMembers.userId, userId.data),
    ))
    .limit(1);

  if (!hasWorkspaceRole(membership?.role, roles)) {
    return res.status(403).json({ message: "Insufficient workspace permissions" });
  }
  return next();
};
