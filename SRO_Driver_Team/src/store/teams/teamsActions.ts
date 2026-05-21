import type { Team } from "../../types/teams";
import api from "../../api/api";

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
