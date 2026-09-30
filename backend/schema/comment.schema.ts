import { z } from "zod";

export const CreateCommentSchema = z.object({ content: z.string().trim().min(1).max(10_000) });
export const UpdateCommentSchema = CreateCommentSchema;
