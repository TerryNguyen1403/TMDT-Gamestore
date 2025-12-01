import Game from "../model/Game.js";
import Platform from "../model/Platform.js";
import Genres from "../model/Genre.js";

// GET all games
export const allGames = async (req, res) => {
  try {
    const games = await Game.find({})
      .populate("platform", "platformName")
      .populate("genres", "genreName");
    res.json({ games: games, totalGames: games.length }); //Thêm total games để trả về tổng số game trên chức năng quản trị
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
    const newGames = await Game.find({ isNewGame: true });

    res.json(newGames);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// GET hot games
export const hotGames = async (req, res) => {
  try {
    const hotGames = await Game.find({ isFeatured: true });
    res.json(hotGames);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get game by ID
export const gameById = async (req, res) => {
  try {
    const { gameId } = req.params;

    const found = await Game.findById(gameId);

    res.json(found, gameId);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// CREATE game (admin only)
export const createGame = async (req, res) => {
  try {
    const { gameName, platform, genres, price, discount, description, image, isFeatured, isNewGame } = req.body;

    // Validate required fields
    if (!gameName || !platform || !genres || !price || !description || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newGame = new Game({
      gameName,
      platform,
      genres,
      price,
      discount: discount || 0,
      description,
      image,
      isFeatured: isFeatured || false,
      isNewGame: isNewGame || false,
    });

    const savedGame = await newGame.save();
    const populatedGame = await Game.findById(savedGame._id)
      .populate("platform", "platformName")
      .populate("genres", "genreName");
      
    res.status(201).json(populatedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE game (admin only)
export const updateGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { gameName, platform, genres, price, discount, description, image, isFeatured, isNewGame } = req.body;

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      {
        gameName,
        platform,
        genres,
        price,
        discount,
        description,
        image,
        isFeatured,
        isNewGame,
      },
      { new: true }
    ).populate("platform", "platformName").populate("genres", "genreName");

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE game (admin only)
export const deleteGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    const deletedGame = await Game.findByIdAndDelete(gameId);

    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json({ message: "Game deleted successfully", game: deletedGame });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all platforms
export const getAllPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find({});
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all genres
export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genres.find({});
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
