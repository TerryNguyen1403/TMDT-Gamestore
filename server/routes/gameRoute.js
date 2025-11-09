import express from "express";
import {
  allGames,
  gameByPlatform,
  hotGames,
  newGames,
} from "../controller/gameController.js";

const router = express.Router();

router.get("/all", allGames);
router.get("/new", newGames);
router.get("/hot", hotGames);
router.get("/:platformName", gameByPlatform);

export default router;
