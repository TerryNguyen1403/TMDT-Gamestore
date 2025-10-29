import express from "express";
import { allGames } from "../controller/gameController.js";

const router = express.Router();

router.get("/all", allGames);

export default router;
