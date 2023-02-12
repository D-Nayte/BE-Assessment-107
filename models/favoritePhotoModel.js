import mongoose from "mongoose";

const photosSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const FavPhotos = mongoose.model("FavPhotos", photosSchema);
export default FavPhotos;
