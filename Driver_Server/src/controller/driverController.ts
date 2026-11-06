import type { Request, Response } from "express";
import Driver from "../models/driverModel.js";
import mongoose from "mongoose";

export const createDriver = async (req: Request, res: Response) => {
	try {
		const label = String(req.body.label ?? "").trim();
		if (!label) {
			return res.status(400).json({ error: "label is required" });
		}
		const team = await Driver.create({ label, value: label });
		res.status(201).json(team);
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const getAllDrivers = async (req: Request, res: Response) => {
	try {
		const drivers = await Driver.find();
		res.status(200).json(drivers);
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const getDriverById = async (req: Request, res: Response) => {
	const DriverId = req.params.DriverId;

	try {
		const driver = await Driver.findById(DriverId);
		return driver ? res.status(200).json({ driver }) : res.status(400).json({ message: "Driver Not Found" });
	} catch (err) {
		return res.status(500).json({ err });
	}
};

export const updateDriver = async (req: Request, res: Response) => {
	try {
		const updatedDriver = await Driver.findByIdAndUpdate(req.params.driverId, req.body, {
			new: true,
			runValidators: true
		});

		if (!updatedDriver) {
			return res.status(404).json({
				message: "Driver not found"
			});
		}
		return res.status(200).json(updatedDriver);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

//** Delete Driver */
export const deleteDriver = async (req: Request, res: Response) => {
	try {
		const deleted = await Driver.findByIdAndDelete(req.params.driverId);
		if (!deleted) {
			return res.status(404).json({ error: "Team not found" });
		}
		res.status(200).json({ _id: req.params.driverId });
	} catch (error) {
		res.status(500).json({ error });
	}
};
