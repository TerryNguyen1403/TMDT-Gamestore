import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    genreName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Genre = new mongoose.model("Genre", genreSchema);

export default Genre;
