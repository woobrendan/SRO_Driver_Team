import express from "express";
import {
	createDriver,
	deleteDriver,
	getAllDrivers,
	getDriverById,
	updateDriver
} from "../controller/driverController.js";

const router = express.Router();

router.post("/", createDriver);
router.get("/", getAllDrivers);
router.get("/:driverId", getDriverById);
router.patch("/:driverId", updateDriver);
router.delete("/:driverId", deleteDriver);

export default router;
