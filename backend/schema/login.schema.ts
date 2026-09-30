import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().trim().email().transform((email) => email.toLowerCase()),
    password: z.string().min(1).max(100),
});

export type LoginInput = z.output<typeof LoginSchema>;
