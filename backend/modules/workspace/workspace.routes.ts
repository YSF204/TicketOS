import { Router } from "express";
import authenticateToken from "../../middleware/JwtAuth.ts";
import { addWorkspaceMemberController, createWorkspaceController } from "./workspace.controller.ts";

export const workspaceRouter = Router();

workspaceRouter.post("/", authenticateToken, createWorkspaceController);
workspaceRouter.post("/:workspaceId/members", authenticateToken, addWorkspaceMemberController);
