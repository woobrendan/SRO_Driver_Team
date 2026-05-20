import express from "express";
import { createTeam, deleteTeam, getAllTeams, getTeamById, updateTeam } from "../controller/teamController.js";

const router = express.Router();

router.post("/", createTeam);
router.get("/", getAllTeams);
router.get("/:teamId", getTeamById);
router.patch("/:teamId", updateTeam);
router.delete("/:teamId", deleteTeam);

export default router;
