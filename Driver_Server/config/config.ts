import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
	throw new Error("MONGO_URI is missing");
}

export const config = {
	mongo: {
		url: MONGO_URI
	},
	server: {
		port: Number(process.env.PORT) || 2020
	}
};
