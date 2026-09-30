import type { Request, Response } from "express";
import { z } from "zod";
import { AddWorkspaceMemberSchema, CreateWorkspaceSchema } from "../../schema/workspace.schema.ts";
import { addWorkspaceMember, createWorkspace, WorkspaceError } from "./workspace.service.ts";

export const createWorkspaceController = async (req: Request, res: Response) => {
    const input = CreateWorkspaceSchema.safeParse(req.body);
    const ownerId = req.user?.sub;

    if (!input.success) return res.status(400).json({ message: "Invalid workspace data" });
    if (typeof ownerId !== "string") return res.status(401).json({ message: "Authentication required" });

    try {
        const workspace = await createWorkspace({ ...input.data, ownerId });
        return res.status(201).json(workspace);
    } catch (error) {
      if (error instanceof WorkspaceError) return res.status(error.status).json({ message: error.message });
        throw error;
    }
};

export const addWorkspaceMemberController = async (req: Request, res: Response) => {
    const workspaceId = z.uuid().safeParse(req.params.workspaceId);
    const input = AddWorkspaceMemberSchema.safeParse(req.body);
    const requesterId = req.user?.sub;

    if (!workspaceId.success || !input.success) {
        return res.status(400).json({ message: "Invalid workspace member data" });
    }
    if (typeof requesterId !== "string") {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const result = await addWorkspaceMember({
            ...input.data,
            workspaceId: workspaceId.data,
            requesterId,
        });
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof WorkspaceError) return res.status(error.status).json({ message: error.message });
        throw error;
    }
};
