import type { Request, Response } from "express";
import { validateInputs, validateLoginInputs } from "./auth.validation.ts";
import { AuthError, login, logout, refresh, register } from "./auth.service.ts";

const refreshCookie = "refreshToken";
const refreshLifetime = 30 * 24 * 60 * 60 * 1000;
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/api/auth",
};

const getRefreshToken = (req: Request) => req.headers.cookie
  ?.split(";")
  .map((part) => part.trim())
  .find((part) => part.startsWith(`${refreshCookie}=`))
  ?.slice(refreshCookie.length + 1);

const sendError = (res: Response, error: unknown) => {
  if (error instanceof AuthError) return res.status(error.status).json({ message: error.message });
  throw error;
};

export const Register = async (req: Request, res: Response) => {
  let input;
  try {
    input = validateInputs(req.body);
  } catch {
    return res.status(400).json({ message: "Invalid registration data" });
  }

  try {
    const user = await register(input);
    return res.status(201).json({ ...user, message: "Registration successful." });
  } catch (error) {
    if (!(error instanceof AuthError)) throw error;
    return res.status(error.status).json({ message: error.message });
  }
};

export const Login = async (req: Request, res: Response) => {
  let credentials;
  try {
    credentials = validateLoginInputs(req.body);
  } catch {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    const result = await login(credentials);
    res.cookie(refreshCookie, result.refreshToken, { ...cookieOptions, maxAge: refreshLifetime });
    return res.json({ accessToken: result.accessToken, user: result.user });
  } catch (error) {
    return sendError(res, error);
  }
};

export const Refresh = async (req: Request, res: Response) => {
  try {
    const result = await refresh(getRefreshToken(req));
    res.cookie(refreshCookie, result.refreshToken, { ...cookieOptions, maxAge: refreshLifetime });
    return res.json({ accessToken: result.accessToken });
  } catch (error) {
    if (error instanceof AuthError && error.status === 401) {
      res.clearCookie(refreshCookie, cookieOptions);
    }
    return sendError(res, error);
  }
};

export const Logout = async (req: Request, res: Response) => {
  await logout(getRefreshToken(req));
  res.clearCookie(refreshCookie, cookieOptions);
  return res.status(204).end();
};
