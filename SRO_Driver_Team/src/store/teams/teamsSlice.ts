import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Team } from "../../types/teams";

interface TeamsState {
	teamsArr: Team[];
}

const initialState: TeamsState = {
	teamsArr: []
};

const teamsSlice = createSlice({
	name: "teams",
	initialState,
	reducers: {
		setSeries(state, action: PayloadAction<Team[]>) {
			state.teamsArr = action.payload;
		},

		addTeam(state, action: PayloadAction<Team>) {
			const existingTeam = state.teamsArr.find((team) => team._id === action.payload._id);
			if (!existingTeam) {
				state.teamsArr = [...state.teamsArr, action.payload];
			}
		}
	}
});

export const seriesActions = teamsSlice.actions;

export default teamsSlice;
