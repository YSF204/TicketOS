import { Router } from "express";
import { Login, Logout, Refresh, Register, VerifyEmail } from "./auth.controller.ts";
export const Authrouter = Router();

Authrouter.post("/register", Register);
Authrouter.post("/login", Login);
Authrouter.post("/refresh", Refresh);
Authrouter.post("/logout", Logout);
Authrouter.post("/verify-email", VerifyEmail);