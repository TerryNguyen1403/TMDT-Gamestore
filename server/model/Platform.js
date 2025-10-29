import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({
  platformName: {
    type: String,
    required: true,
  },
});

const Platform = new mongoose.model("Platform", platformSchema);

export default Platform;
