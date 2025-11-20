import express from "express";
import {
  allGames,
  gameById,
  gameByPlatform,
  hotGames,
  newGames,
} from "../controller/gameController.js";

const router = express.Router();

router.get("/all", allGames);
router.get("/new", newGames);
router.get("/hot", hotGames);
router.get("/id/:gameId", gameById);
router.get("/platform/:platformName", gameByPlatform);

export default router;
