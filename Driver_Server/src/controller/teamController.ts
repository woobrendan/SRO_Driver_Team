import type { Request, Response } from "express";
import Team from "../models/teamModel.js";
import mongoose from "mongoose";

export const createTeam = async (req: Request, res: Response) => {
	try {
		const label = String(req.body.label ?? "").trim();
		if (!label) {
			return res.status(400).json({ error: "label is required" });
		}
		const team = await Team.create({ label, value: label });
		res.status(201).json(team);
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const getAllTeams = async (req: Request, res: Response) => {
	try {
		const teams = await Team.find();
		res.status(200).json(teams);
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
		const deleted = await Team.findByIdAndDelete(req.params.teamId);
		if (!deleted) {
			return res.status(404).json({ error: "Team not found" });
		}
		res.status(200).json({ _id: req.params.teamId });
	} catch (error) {
		res.status(500).json({ error });
	}
};
