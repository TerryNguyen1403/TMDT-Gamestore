import express from "express";
import { allUsers } from "../controller/adminController.js";
import { createGame, updateGame, deleteGame } from "../controller/gameController.js";
import { verify, adminOnly } from "../middleware/authUser.js";

const router = express.Router();

// User management routes
router.get("/all-users", verify, adminOnly, allUsers);

// Game management routes (admin only)
router.post("/games", verify, adminOnly, createGame);
router.put("/games/:gameId", verify, adminOnly, updateGame);
router.delete("/games/:gameId", verify, adminOnly, deleteGame);

export default router;
