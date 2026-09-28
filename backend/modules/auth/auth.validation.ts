import { z } from "zod";
import { User } from "../../types";

export const UserSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(6).max(100),
    email: z.string().email(),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100)
});


export const validateInputs = (user: User) => {
    const result = UserSchema.safeParse(user);
    if (!result.success) {
        return {
            success: false,
            error: result.error
        }

    } else {
        return {
            success: true,
            data: result.data
        }
    }

}