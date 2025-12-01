import express from "express";
import {
  allGames,
  gameById,
  gameByPlatform,
  hotGames,
  newGames,
  getAllPlatforms,
  getAllGenres,
} from "../controller/gameController.js";

const router = express.Router();

router.get("/all", allGames);
router.get("/new", newGames);
router.get("/hot", hotGames);
router.get("/id/:gameId", gameById);
router.get("/platform/:platformName", gameByPlatform);
router.get("/platforms/list/all", getAllPlatforms);
router.get("/genres/list/all", getAllGenres);

export default router;
