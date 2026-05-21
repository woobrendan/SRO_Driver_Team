import { configureStore } from "@reduxjs/toolkit";
import teamsSlice from "./teams/teamsSlice";

const store = configureStore({
	reducer: {
		teams: teamsSlice.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
