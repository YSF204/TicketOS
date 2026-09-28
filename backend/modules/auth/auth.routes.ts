import { Router } from "express";
import { Register } from "./auth.controller.ts";
export const Authrouter = Router();

Authrouter.post("/register", Register);
