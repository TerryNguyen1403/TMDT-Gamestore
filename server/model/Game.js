import mongoose, { Schema } from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    gameName: {
      type: String,
      required: true,
    },
    platform: [
      {
        type: Schema.Types.ObjectId,
        ref: "Platform",
        required: true,
      },
    ],
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Game = new mongoose.model("Game", gameSchema);

export default Game;
