import { configureStore } from "@reduxjs/toolkit";
import teamsSlice from "./teams/teamsSlice";
import driversSlice from "./drivers/driversSlice";

const store = configureStore({
	reducer: {
		teams: teamsSlice.reducer,
		drivers: driversSlice.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
