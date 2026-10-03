import * as argon2 from "argon2";
import { createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import type { LoginInput } from "../../schema/login.schema.ts";
import type { RegistrationInput } from "../../schema/registration.schema.ts";
import { getDatabaseErrorCode } from "../../db/error.ts";
import {
  createUser,
  findUserByEmail,
  markEmailVerified,
  revokeRefreshToken,
  rotateRefreshToken,
  storeRefreshToken,
} from "./auth.repository.ts";
import { sendVerificationEmail } from "./auth.email.ts";

const refreshLifetime = 30 * 24 * 60 * 60 * 1000;
const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
const newRefreshToken = () => randomBytes(32).toString("base64url");
const dummyHash = argon2.hash("dummy-password-for-timing");

export class AuthError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "AuthError";
  }
}

const jwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new AuthError("Internal server error", 500);
  return secret;
};

const safeUser = (user: NonNullable<Awaited<ReturnType<typeof findUserByEmail>>>) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  emailVerified: user.emailVerified,
});

export const register = async (user: RegistrationInput) => {
  try {
    const created = await createUser(user, await argon2.hash(user.password));
    sendVerificationEmail(created).catch((err) => console.error("verification email failed", err));
    return safeUser(created);
  } catch (error) {

    const databaseError = error as { code?: string; cause?: { code?: string } };
    if (databaseError.code === "23505" || databaseError.cause?.code === "23505") {
      throw new AuthError("User already exists", 409);
    }
    throw error;
  }

};

export const verifyEmail = async (token : string) =>{

  let userId:string;
  try {
    userId = (jwt.verify(token , process.env.EMAIL_VERIFY_SECRET!) as jwt.JwtPayload).sub!;
  } catch (error) {
    throw new AuthError("Invalid or expired verification token", 401);
  }
  await markEmailVerified(userId);
}

export const login = async (credentials: LoginInput) => {
  const secret = jwtSecret();
  const user = await findUserByEmail(credentials.email);
  const valid = await argon2.verify(user?.passwordHash ?? await dummyHash, credentials.password);

  if (!user || !valid) {
    throw new AuthError("Invalid email or password", 401);
  }

  // Only reached with the right password, so this can't be used to probe emails or spam inboxes
  if (!user.emailVerified) {
    sendVerificationEmail(user).catch((err) => console.error("verification email failed", err));
    throw new AuthError("Please verify your email. We just sent you a new link.", 403);
  }

  const refreshToken = newRefreshToken();
  await storeRefreshToken(user.id, hashToken(refreshToken), new Date(Date.now() + refreshLifetime));
  return {
    accessToken: jwt.sign({ sub: user.id }, secret, { expiresIn: "15m" }),
    refreshToken,
    user: safeUser(user),
  };
};

export const refresh = async (token?: string) => {
  if (!token) throw new AuthError("Refresh token required", 401);
  const secret = jwtSecret();
  const nextToken = newRefreshToken();
  const now = new Date();
  const userId = await rotateRefreshToken(
    hashToken(token),
    hashToken(nextToken),
    new Date(now.getTime() + refreshLifetime),
    now,
  );
  if (!userId) throw new AuthError("Invalid or expired refresh token", 401);

  return {
    accessToken: jwt.sign({ sub: userId }, secret, { expiresIn: "15m" }),
    refreshToken: nextToken,
  };
};

export const logout = async (token?: string) => {
  if (token) await revokeRefreshToken(hashToken(token), new Date());
};
