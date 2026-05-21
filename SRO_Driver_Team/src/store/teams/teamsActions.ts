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

export const updateTeam = async (team: Team) => {
	try {
		await api.patch(`/teams/${team._id}`, team);
	} catch (error) {
		console.log("Error updating team", error);
	}
};

export const deleteTeam = async (team: Team) => {
	try {
		await api.delete(`/teams/${team._id}`);
	} catch (error) {
		console.log("Error deleting Team", error);
	}
};
