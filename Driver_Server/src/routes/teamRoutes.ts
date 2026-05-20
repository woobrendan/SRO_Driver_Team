import express from "express";
import { getAllTeams } from "../controller/teamController.js";

const router = express.Router();

// api/entries ....

// router.post("/", controller.createEntry);
router.get("/", getAllTeams);
// router.get("/events", controller.getEntriesByEvent);
// router.get("/events/:event", controller.getEntryByEvent);
// router.get("/:entryId", controller.getEntryById);
// router.patch("/:entryId", controller.updateEntry);
// router.delete("/:entryId", controller.deleteEntry);

export default router;
