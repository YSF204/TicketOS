import { Router } from "express";
import authenticateToken from "../../middleware/JwtAuth.ts";
import { requireWorkspaceRole } from "../../middleware/workspaceAuthorization.ts";
import { workspaceRoles } from "../../middleware/workspaceAuthorization.policy.ts";
import { addWorkspaceMemberController, createWorkspaceController } from "./workspace.controller.ts";

export const workspaceRouter = Router();

workspaceRouter.use(authenticateToken);

const requireWorkspaceManager = requireWorkspaceRole(...workspaceRoles.manager);

workspaceRouter.post("/", createWorkspaceController);
workspaceRouter.post("/:workspaceId/members", requireWorkspaceManager, addWorkspaceMemberController);
