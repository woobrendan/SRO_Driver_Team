import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import http from "http";

import { config } from "../config/config.js";

import teamRoute from "./routes/teamRoutes.js";
import driverRoute from "./routes/driverRoutes.js";

const app = express();

app.use(morgan("dev"));

mongoose.set("strictQuery", true);

mongoose
	.connect(config.mongo.url)
	.then(() => {
		console.log("Connected");
		startServer();
	})
	.catch((error) => {
		console.log("Error connecting to server: ", error);
	});

//** Only Start Server if Mongo Connects */

const startServer = () => {
	app.use(cors());

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	//** Routes */
	app.use("/api/teams", teamRoute);
	app.use("/api/drivers", driverRoute);

	//** Error handling */
	app.use((req, res) => {
		return res.status(404).json({
			message: "Route not found"
		});
	});

	app.listen(config.server.port, () => {
		console.log(`Server running on port ${config.server.port}`);
	});
};
