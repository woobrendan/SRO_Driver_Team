import type { Driver } from "../../types/drivers";
import api from "../../api/api";
import { driverActions } from "./driversSlice";
import type { AppDispatch } from "../store";

export const fetchDrivers = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await api.get<Driver[]>("/drivers");

			dispatch(driverActions.setDrivers(response.data));
		} catch (err) {
			console.error(err);
		}
	};
};

export const updateDriver = async (driver: Driver) => {
	try {
		await api.patch(`/drivers/${driver._id}`, driver);
	} catch (error) {
		console.log("Error updating driver", error);
	}
};

export const deleteDriver = async (driver: Driver) => {
	try {
		await api.delete(`/drivers/${driver._id}`);
	} catch (error) {
		console.log("Error deleting driver", error);
	}
};
