import assert from "node:assert/strict";
import { hasWorkspaceRole, workspaceRoles, type WorkspaceRole } from "../middleware/workspaceAuthorization.policy.ts";

const roles: WorkspaceRole[] = ["OWNER", "ADMIN", "MEMBER"];

for (const role of roles) {
  assert.equal(hasWorkspaceRole(role, workspaceRoles.member), true, `${role} can create and view projects`);
}

assert.equal(hasWorkspaceRole("OWNER", workspaceRoles.manager), true, "workspace owner can manage projects and members");
assert.equal(hasWorkspaceRole("ADMIN", workspaceRoles.manager), true, "workspace admin can manage projects and members");
assert.equal(hasWorkspaceRole("MEMBER", workspaceRoles.manager), false, "workspace member cannot manage projects or add members");
assert.equal(hasWorkspaceRole(undefined, workspaceRoles.member), false, "nonmembers cannot access workspace projects");
