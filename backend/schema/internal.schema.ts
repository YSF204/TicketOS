import { z } from "zod";

// These validate values created by backend services, not request bodies.
export const CreateRefreshTokenSchema = z.object({
  userId: z.uuid(),
  tokenHash: z.string().regex(/^[a-f0-9]{64}$/),
  expiresAt: z.date(),
});

export const CreateAIRequestSchema = z.object({
  userId: z.uuid(),
  workspaceId: z.uuid().nullable().optional(),
  provider: z.string().trim().min(1).max(100),
  model: z.string().trim().min(1).max(150),
  purpose: z.string().trim().min(1).max(100),
  inputTokens: z.number().int().nonnegative().nullable().optional(),
  outputTokens: z.number().int().nonnegative().nullable().optional(),
  status: z.enum(["SUCCEEDED", "FAILED"]),
});
