import type { Team } from "../../types/teams";
import api from "../../api/api";
import { teamActions } from "./teamsSlice";
import type { AppDispatch } from "../store";

export const fetchTeams = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await api.get<Team[]>("/teams");

			dispatch(teamActions.setTeams(response.data));
		} catch (err) {
			console.error(err);
		}
	};
};

export const updateTeamThunk = (team: Team) => async (dispatch: AppDispatch) => {
	try {
		await api.patch(`/teams/${team._id}`, team);
		dispatch(teamActions.updateTeam(team));
	} catch (error) {
		console.error("Error updating team", error);
	}
};

export const deleteTeamThunk = (team: Team) => async (dispatch: AppDispatch) => {
	try {
		await api.delete(`/teams/${team._id}`);
		dispatch(teamActions.removeTeam(team));
		await dispatch(fetchTeams());
	} catch (error) {
		console.error("Error deleting team", error);
	}
};

export const addTeamThunk = (label: string) => async (dispatch: AppDispatch) => {
	try {
		const response = await api.post<Team>("/teams", { label, value: label });
		dispatch(teamActions.addTeam(response.data)); // server returns the doc with its new _id
	} catch (error) {
		console.error("Error adding team", error);
	}
};
