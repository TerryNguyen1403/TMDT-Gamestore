import express from "express";
import {
  allGames,
  gameByPlatform,
  newGames,
} from "../controller/gameController.js";

const router = express.Router();

router.get("/all", allGames);
router.get("/new", newGames);
router.get("/:platformName", gameByPlatform);

export default router;
