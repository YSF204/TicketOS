import { db } from "../../db/index.ts";
import { users } from "../../db/models/users.ts";
import { and, eq, isNull } from "drizzle-orm";
import { refreshTokens } from "../../db/models/refreshTokens.ts";
import type { RegistrationInput } from "../../schema/registration.schema.ts";

export const createUser = async (user: RegistrationInput, passwordHash: string) => {
    const [createdUser] = await db
        .insert(users)
        .values({
            email: user.email,
            passwordHash,
            firstName: user.firstName,
            lastName: user.lastName,
        })
        .returning();

    return createdUser;
};

export const markEmailVerified = async (userId: string) => {
    await db.update(users).set({ emailVerified: true }).where(eq(users.id, userId));
}

export const findUserByEmail = async (email: string) => {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
};

export const storeRefreshToken = async (userId: string, tokenHash: string, expiresAt: Date) => {
    await db.insert(refreshTokens).values({ userId, tokenHash, expiresAt });
};

export const rotateRefreshToken = async (
    tokenHash: string,
    nextTokenHash: string,
    expiresAt: Date,
    now: Date,
) => db.transaction(async (tx) => {
    const [stored] = await tx.select().from(refreshTokens)
        .where(eq(refreshTokens.tokenHash, tokenHash))
        .limit(1)
        .for("update");
    if (!stored) return null;

    if (stored.revokedAt) {
        await tx.update(refreshTokens).set({ revokedAt: now }).where(and(
            eq(refreshTokens.userId, stored.userId),
            isNull(refreshTokens.revokedAt),
        ));
        return null;
    }
    if (stored.expiresAt <= now) return null;

    await tx.update(refreshTokens).set({ revokedAt: now }).where(eq(refreshTokens.id, stored.id));
    await tx.insert(refreshTokens).values({
        userId: stored.userId,
        tokenHash: nextTokenHash,
        expiresAt,
    });
    return stored.userId;
});

export const revokeRefreshToken = async (tokenHash: string, revokedAt: Date) => {
    await db.update(refreshTokens)
        .set({ revokedAt })
        .where(and(eq(refreshTokens.tokenHash, tokenHash), isNull(refreshTokens.revokedAt)));
};
