import { Router } from "express";
import db from "../../db";

export const HealthRouter = Router();

HealthRouter.get("/health", async (req, res) => {
    try {
        await db.execute("SELECT 1");
        res.status(200).json({ status: "ok", database: "connected" });
    } catch {
        res.status(503).json({ status: "error", database: "disconnected" });
    }
})