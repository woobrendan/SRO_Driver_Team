import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import teamRoute from "./routes/teamRoutes.js";
import driverRoute from "./routes/driverRoutes.js";
import authRouter, { requireAuth } from "./routes/auth.js";

const app = express();

app.use(morgan("dev"));
app.use(
	cors({
		origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
		credentials: true
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/teams", requireAuth, teamRoute);
app.use("/api/drivers", requireAuth, driverRoute);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

export default app;
