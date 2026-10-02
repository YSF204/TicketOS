import { Router } from "express";
import authenticateToken from "../../middleware/JwtAuth.ts";
import { requireWorkspaceRole } from "../../middleware/workspaceAuthorization.ts";
import { workspaceRoles } from "../../middleware/workspaceAuthorization.policy.ts";
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  listProjectsController,
  updateProjectController,
} from "./project.controller.ts";

export const projectRouter = Router({ mergeParams: true });

projectRouter.use(authenticateToken);

const requireWorkspaceMember = requireWorkspaceRole(...workspaceRoles.member);
const requireWorkspaceManager = requireWorkspaceRole(...workspaceRoles.manager);

projectRouter.post("/", requireWorkspaceMember, createProjectController);
projectRouter.get("/", requireWorkspaceMember, listProjectsController);
projectRouter.get("/:projectId", requireWorkspaceMember, getProjectController);
projectRouter.patch("/:projectId", requireWorkspaceManager, updateProjectController);
projectRouter.delete("/:projectId", requireWorkspaceManager, deleteProjectController);
