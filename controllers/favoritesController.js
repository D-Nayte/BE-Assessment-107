//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from "express-async-handler";
import FavPhotos from "../models/favoritePhotoModel.js";

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

export const getPhotocollection = asyncHandler(async (req, res, next) => {
  const { id } = req.token;

  const allPhotos = await FavPhotos.find({ user: id });

  if (!allPhotos || allPhotos.length < 1)
    return res.status(404).json({ messsage: "No photos found" });

  res.json(allPhotos);
});

export const deletePhotoById = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ messsage: "Please id to remove photo" });

  const deleted = await FavPhotos.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ messsage: "Photo not found" });

  res.json(deleted);
});

export const changeDescription = asyncHandler(async (req, res) => {
  const { id, newDescription } = req.body;
  if (!id || !newDescription)
    return res
      .status(400)
      .json({ messsage: "Please add photo id and description" });

  const updatedPhoto = await FavPhotos.findByIdAndUpdate(
    id,
    {
      description: newDescription,
    },
    { returnDocument: "after" }
  );
  if (!updatedPhoto)
    return res.status(404).json({ messsage: "Photo not found" });

  res.json(updatedPhoto);
});
