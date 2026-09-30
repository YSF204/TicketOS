import { z } from "zod";

export const WorkspaceRoleSchema = z.enum(["OWNER", "ADMIN", "MEMBER"]);

export const CreateWorkspaceSchema = z.object({
  name: z.string().trim().min(1).max(150),
  slug: z.string().trim().toLowerCase().min(1).max(150).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  memberIds: z.array(z.uuid()).optional(),
});

export const UpdateWorkspaceSchema = z.object({
  name: z.string().trim().min(1).max(150).optional(),
  slug: z.string().trim().toLowerCase().min(1).max(150).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
}).refine((value) => Object.keys(value).length > 0, "At least one field is required");

export const AddWorkspaceMemberSchema = z.object({
  userId: z.uuid(),
  role: z.enum(["ADMIN", "MEMBER"]).default("MEMBER"),
});

export const UpdateWorkspaceMemberSchema = z.object({
  role: z.enum(["ADMIN", "MEMBER"]),
});
