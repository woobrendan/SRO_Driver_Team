import type { Request, Response } from "express";
import Team from "../models/teamModel.js";

export const getAllTeams = async (req: Request, res: Response) => {
	try {
		const teams = await Team.find();
		res.status(200).json({ teams });
	} catch (error) {
		res.status(500).json({ error });
	}
};
