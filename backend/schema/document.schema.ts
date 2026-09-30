import { z } from "zod";

export const CreateDocumentSchema = z.object({
  projectId: z.uuid().nullable().optional(),
  name: z.string().trim().min(1).max(255),
  fileUrl: z.url().max(2048),
  fileType: z.string().trim().min(1).max(255),
  fileSize: z.number().int().nonnegative(),
});
