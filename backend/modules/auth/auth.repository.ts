import { db } from "../../db/index.ts";
import type { User } from "../../types.d.ts";
import { users } from "../../db/models/users.ts";
import * as argon2 from "argon2";

export const createUser = async (user: User) => {
    const hashedPassword = await argon2.hash(user.password);

    const [createdUser] = await db
        .insert(users)
        .values({
            email: user.email,
            passwordHash: hashedPassword,
            firstName: user.firstName,
            lastName: user.lastName,
        })
        .returning();

    return createdUser;
};
