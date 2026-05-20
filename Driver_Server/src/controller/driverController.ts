import type { Request, Response } from "express";
import Driver from "../models/driverModel.js";

export const getAllDrivers = async (req: Request, res: Response) => {
	try {
		const Drivers = await Driver.find();
		res.status(200).json({ Drivers });
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
		const driverId = req.params.driverId;
		const driver = await Driver.findByIdAndDelete(driverId);

		if (driver) {
			return res.status(204).json({ message: "Deleted" });
		} else {
			return res.status(404).json({ message: "Not Found" });
		}
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};
