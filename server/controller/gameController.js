import Game from "../model/Game.js";
import Platform from "../model/Platform.js";
import Genres from "../model/Genre.js";

// GET all games
export const allGames = async (req, res) => {
  try {
    const games = await Game.find({})
      .populate("platform", "platformName")
      .populate("genres", "genreName");
    res.json(games);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// GET game by platform
export const gameByPlatform = async (req, res) => {
  const { platformName } = req.params;

  const games = await Game.find({})
    .populate("platform", "platformName")
    .populate("genres", "genreName");

  const gameFiltered = games.filter((game) =>
    game.platform.some((p) => p.platformName === platformName)
  );

  res.json(gameFiltered);
};

// GET new games
export const newGames = async (req, res) => {
  try {
    const games = await Game.find({});
    const newGames = games.slice(-8);

    res.json(newGames);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
