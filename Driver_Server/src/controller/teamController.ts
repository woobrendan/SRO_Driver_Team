import type { Request, Response } from "express";
import Team from "../models/teamModel.js";
import mongoose from "mongoose";

export const createTeam = async (req: Request, res: Response) => {
	try {
		const { label, value } = req.body;
		const newTeam = await Team.create({ label, value });

		return res.status(201).json(newTeam);
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			return res.status(400).json({
				message: error.message
			});
		}

		return res.status(500).json({
			message: "Internal server error"
		});
	}
};

export const getAllTeams = async (req: Request, res: Response) => {
	try {
		const teams = await Team.find();
		res.status(200).json({ teams });
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const getTeamById = async (req: Request, res: Response) => {
	const TeamId = req.params.TeamId;

	try {
		const team = await Team.findById(TeamId);
		return team ? res.status(200).json({ team }) : res.status(400).json({ message: "Team Not Found" });
	} catch (err) {
		return res.status(500).json({ err });
	}
};

export const updateTeam = async (req: Request, res: Response) => {
	try {
		const updatedTeam = await Team.findByIdAndUpdate(req.params.teamId, req.body, {
			new: true,
			runValidators: true
		});

		if (!updatedTeam) {
			return res.status(404).json({
				message: "Team not found"
			});
		}
		return res.status(200).json(updatedTeam);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

//** Delete Team */
export const deleteTeam = async (req: Request, res: Response) => {
	try {
		const teamId = req.params.teamId;
		const team = await Team.findByIdAndDelete(teamId);

		if (team) {
			return res.status(204).json({ message: "Deleted" });
		} else {
			return res.status(404).json({ message: "Not Found" });
		}
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};
