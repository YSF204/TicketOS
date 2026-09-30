import express from "express";
import { Authrouter } from "./modules/auth/auth.routes";
import { HealthRouter } from "./modules/health/health.router";
import { workspaceRouter } from "./modules/workspace/workspace.routes";

const app = express();

app.use(express.json());


app.use("/api/auth", Authrouter);
app.use("/api/workspaces", workspaceRouter);
app.use("/api", HealthRouter);

export default app; 
