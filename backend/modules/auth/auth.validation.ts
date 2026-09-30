import { RegistrationSchema } from "../../schema/registration.schema.ts";
import { LoginSchema } from "../../schema/login.schema.ts";
import type { LoginInput } from "../../schema/login.schema.ts";
import type { RegistrationInput } from "../../schema/registration.schema.ts";


export const validateInputs = (input: unknown): RegistrationInput => {
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
