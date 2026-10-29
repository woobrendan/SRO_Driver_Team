import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Driver } from "../../types/drivers";
import { updateDriverThunk, deleteDriverThunk } from "./driversActions";

interface DriversState {
	driversArr: Driver[];
}

const initialState: DriversState = {
	driversArr: []
};

const driversSlice = createSlice({
	name: "drivers",
	initialState,
	reducers: {
		setDrivers(state, action: PayloadAction<Driver[]>) {
			state.driversArr = action.payload;
		},

		addDrivers(state, action: PayloadAction<Driver>) {
			const existingDriver = state.driversArr.find((driver) => driver._id === action.payload._id);
			if (!existingDriver) {
				state.driversArr = [...state.driversArr, action.payload];
			}
		},

		removeDriver(state, action: PayloadAction<Driver>) {
			const adjusted = state.driversArr.filter((driver) => driver._id !== action.payload._id);
			state.driversArr = adjusted;
			deleteDriverThunk(action.payload);
		},

		updateDriver(state, action: PayloadAction<Driver>) {
			updateDriverThunk(action.payload);

			state.driversArr = state.driversArr.map((driver) =>
				driver._id === action.payload._id ? { ...action.payload } : driver
			);
		}
	}
});

export const driverActions = driversSlice.actions;

export default driversSlice;
