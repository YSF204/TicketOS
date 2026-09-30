import { z } from "zod";

export const ProjectStatusSchema = z.enum(["ACTIVE", "ARCHIVED"]);
export const ProjectRoleSchema = z.enum(["PROJECT_ADMIN", "PROJECT_MEMBER"]);

export const CreateProjectSchema = z.object({
  name: z.string().trim().min(1).max(150),
  description: z.string().trim().max(10_000).optional(),
});

export const UpdateProjectSchema = z.object({
  name: z.string().trim().min(1).max(150).optional(),
  description: z.string().trim().max(10_000).nullable().optional(),
  status: ProjectStatusSchema.optional(),
}).refine((value) => Object.keys(value).length > 0, "At least one field is required");

export const AddProjectMemberSchema = z.object({
  userId: z.uuid(),
  role: ProjectRoleSchema.default("PROJECT_MEMBER"),
});

export const UpdateProjectMemberSchema = z.object({ role: ProjectRoleSchema });
