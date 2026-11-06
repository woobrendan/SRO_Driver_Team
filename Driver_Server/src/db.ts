import mongoose from "mongoose";
import { config } from "../config/config.js";

let connecting: Promise<typeof mongoose> | null = null;

export const connectDB = () => {
	if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose);

	if (!connecting) {
		mongoose.set("strictQuery", true);
		connecting = mongoose
			.connect(config.mongo.url, { maxPoolSize: 5, serverSelectionTimeoutMS: 8000 })
			.catch((err) => {
				connecting = null; // allow a retry on the next request
				throw err;
			});
	}
	return connecting;
};
