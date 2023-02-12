//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from "express-async-handler";
import FavPhotos from "../models/favoritePhotoModel.js";
import UserModel from "../models/userModel.js";

export const storeNewPhoto = asyncHandler(async (req, res) => {
  const { body } = req;
  let { photoUrl, description, username, explanation } = body;
  const { id } = req.token;

  if (!username || !photoUrl)
    return res
      .status(403)
      .json({ message: "Username or photo URL is missing" });
  if (!description) description = "No description";
  if (!explanation) explanation = "No explanation";

  const favPhoto = {
    user: id,
    url: photoUrl,
    username,
    description,
    explanation,
  };

  await FavPhotos.create(favPhoto);

  delete favPhoto.user;
  res.status(201).json(favPhoto);
});
