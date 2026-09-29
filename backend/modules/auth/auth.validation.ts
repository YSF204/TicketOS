import type { User, LoginInput } from "../../types.d.ts";
import { RegistrationSchema } from "../../schema/registration.schema.ts";
import { LoginSchema } from "../../schema/login.schema.ts";


export const validateInputs = (input: unknown): User => {
    const result = RegistrationSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }

    const { confirmEmail: _confirmEmail, ...user } = result.data;
    return user;
};

export const validateLoginInputs = (input: unknown): LoginInput => {
    const result = LoginSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }

    return result.data;
};