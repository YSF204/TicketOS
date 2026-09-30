import { z } from "zod";

export const UpdateUserSchema = z.object({
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  avatarUrl: z.url({ protocol: /^https?$/ }).max(2048).nullable().optional(),
}).refine((value) => Object.keys(value).length > 0, "At least one field is required");
