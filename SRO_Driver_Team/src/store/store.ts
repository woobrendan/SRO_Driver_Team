import { configureStore } from "@reduxjs/toolkit";
import teamsSlice from "./teams/teamsSlice";

const store = configureStore({
	reducer: {
		teams: teamsSlice.reducer
		// entry: entrySlice.reducer,
		// results: resultsSlice.reducer,
		// events: eventSlice.reducer,
		// series: seriesSlice.reducer,
	}
});

export default store;
