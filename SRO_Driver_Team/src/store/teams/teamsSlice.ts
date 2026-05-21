import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Team } from "../../types/teams";
import { updateTeam, deleteTeam } from "./teamsActions";

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
		setTeams(state, action: PayloadAction<Team[]>) {
			state.teamsArr = action.payload;
		},

		addTeam(state, action: PayloadAction<Team>) {
			const existingTeam = state.teamsArr.find((team) => team._id === action.payload._id);
			if (!existingTeam) {
				state.teamsArr = [...state.teamsArr, action.payload];
			}
		},

		removeTeam(state, action: PayloadAction<Team>) {
			const adjusted = state.teamsArr.filter((team) => team._id !== action.payload._id);
			state.teamsArr = adjusted;
			deleteTeam(action.payload);
		},

		updateTeam(state, action: PayloadAction<Team>) {
			updateTeam(action.payload);

			state.teamsArr = state.teamsArr.map((team) =>
				team._id === action.payload._id ? { ...action.payload } : team
			);
		}
	}
});

export const teamActions = teamsSlice.actions;

export default teamsSlice;
