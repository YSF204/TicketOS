import { z } from "zod";

export const RegistrationSchema = z.object({
    password: z.string().min(8).max(100),
    email: z.string().trim().email().transform((email) => email.toLowerCase()),
    confirmEmail: z.string().trim().email().transform((email) => email.toLowerCase()),
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
}).refine((data) => data.email === data.confirmEmail, {
    message: "Email addresses do not match",
    path: ["confirmEmail"],
});
