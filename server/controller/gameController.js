import Game from "../model/Game.js";

// GET all games
export const allGames = async (req, res) => {
  const games = await Game.find({});
  res.json(games);
};
