import express from "express";
import { sql } from "drizzle-orm";
import db from "./db";
import { Authrouter } from "./modules/auth/auth.routes";
import { HealthRouter } from "./modules/health/health.router";

const app = express();

app.use(express.json());


app.use("/api/auth", Authrouter);
app.use("/api", HealthRouter);

export default app; 
