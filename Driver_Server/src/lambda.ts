// src/lambda.ts: the Lambda entry point
import serverless from "serverless-http";
import type { APIGatewayProxyEvent, Context } from "aws-lambda";
import app from "./app.js";
import { connectDB } from "./db.js";

const handleRequest = serverless(app);

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
	await connectDB();
	return handleRequest(event, context);
};
