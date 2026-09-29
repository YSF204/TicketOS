import { validateInputs, validateLoginInputs } from "./auth.validation.ts";
import type { Request, Response } from "express";
import type { User } from "../../types.d.ts";
import { users } from "../../db/models/users.ts";
import { db } from "../../db/index.ts";
import { and, eq, isNull } from "drizzle-orm";
import { createUser } from "./auth.repository.ts";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "node:crypto";
import { refreshTokens } from "../../db/models/refreshTokens.ts";

const refreshCookie = "refreshToken";
const refreshLifetime = 30 * 24 * 60 * 60 * 1000;
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/api/auth",
};

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
const newRefreshToken = () => randomBytes(32).toString("base64url");
const getRefreshToken = (req: Request) => req.headers.cookie
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${refreshCookie}=`))
    ?.slice(refreshCookie.length + 1);

export const Register = async (req: Request, res: Response) => {
    let user: User;
    try {
        user = validateInputs(req.body);
    } catch {
        return res.status(400).json({ message: "Invalid registration data" });
    }

    const [existingUser] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);

    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    let createdUser;
    try {
        createdUser = await createUser(user);
    } catch (error) {
        if ((error as { code?: string }).code === "23505") {
            return res.status(409).json({ message: "User already exists" });
        }
        throw error;
    }

    return res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        emailVerified: createdUser.emailVerified,
        message: "Registration successful.",
    });
};





export const Login = async (req: Request, res: Response) => {
    let credentials;
    try {
        credentials = validateLoginInputs(req.body);
    } catch {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const [user] = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);

    if (!user || !(await argon2.verify(user.passwordHash, credentials.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "Internal server error" });

    const token = newRefreshToken();
    const expiresAt = new Date(Date.now() + refreshLifetime);
    await db.insert(refreshTokens).values({
        userId: user.id,
        tokenHash: hashToken(token),
        expiresAt,
    });
    res.cookie(refreshCookie, token, { ...cookieOptions, maxAge: refreshLifetime });

    return res.json({
        accessToken: jwt.sign({ sub: user.id }, secret, { expiresIn: "15m" }),
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            emailVerified: user.emailVerified,
        },
    });
};

export const Refresh = async (req: Request, res: Response) => {
    const token = getRefreshToken(req);
    const secret = process.env.JWT_SECRET;
    if (!token || !secret) {
        res.clearCookie(refreshCookie, cookieOptions);
        return res.status(token ? 500 : 401).json({ message: token ? "Internal server error" : "Refresh token required" });
    }

    const now = new Date();
    const nextToken = newRefreshToken();
    const result = await db.transaction(async (tx) => {
        const [stored] = await tx.select().from(refreshTokens)
            .where(eq(refreshTokens.tokenHash, hashToken(token)))
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
            tokenHash: hashToken(nextToken),
            expiresAt: new Date(now.getTime() + refreshLifetime),
        });
        return stored.userId;
    });

    if (!result) {
        res.clearCookie(refreshCookie, cookieOptions);
        return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    res.cookie(refreshCookie, nextToken, { ...cookieOptions, maxAge: refreshLifetime });
    return res.json({ accessToken: jwt.sign({ sub: result }, secret, { expiresIn: "15m" }) });
};

export const Logout = async (req: Request, res: Response) => {
    const token = getRefreshToken(req);
    if (token) {
        await db.update(refreshTokens)
            .set({ revokedAt: new Date() })
            .where(and(eq(refreshTokens.tokenHash, hashToken(token)), isNull(refreshTokens.revokedAt)));
    }
    res.clearCookie(refreshCookie, cookieOptions);
    return res.status(204).end();
};
