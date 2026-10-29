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

export const updateDriverThunk = (driver: Driver) => async (dispatch: AppDispatch) => {
	try {
		await api.patch(`/drivers/${driver._id}`, driver);
		dispatch(driverActions.updateDriver(driver));
	} catch (error) {
		console.error("Error updating driver", error);
	}
};

export const deleteDriverThunk = (driver: Driver) => async (dispatch: AppDispatch) => {
	try {
		await api.delete(`/drivers/${driver._id}`);
		dispatch(driverActions.removeDriver(driver));
		await dispatch(fetchDrivers());
	} catch (error) {
		console.error("Error deleting driver", error);
	}
};

export const addDriverThunk = (label: string) => async (dispatch: AppDispatch) => {
	try {
		const response = await api.post<Driver>("/teams", { label, value: label });
		dispatch(driverActions.addDrivers(response.data)); // server returns the doc with its new _id
	} catch (error) {
		console.error("Error adding team", error);
	}
};
