import { z } from "zod";

export const TaskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "BLOCKED", "DONE"]);
export const TaskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const CreateTaskSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().max(20_000).optional(),
  status: TaskStatusSchema.default("TODO"),
  priority: TaskPrioritySchema.default("MEDIUM"),
  assignedTo: z.uuid().nullable().optional(),
  dueDate: z.iso.date().nullable().optional(),
});

export const UpdateTaskSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  description: z.string().trim().max(20_000).nullable().optional(),
  status: TaskStatusSchema.optional(),
  priority: TaskPrioritySchema.optional(),
  assignedTo: z.uuid().nullable().optional(),
  dueDate: z.iso.date().nullable().optional(),
}).refine((value) => Object.keys(value).length > 0, "At least one field is required");
