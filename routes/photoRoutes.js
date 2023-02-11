import { Router } from "express";
import { getPhotos } from "../controllers/photoController.js";
import convertUserPhotos from "../utils/convertUserPhotos.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allPhotos = await getPhotos(null);
    const rawPhotoUrls = allPhotos.map((photo) => photo.urls.raw);
    res.json(rawPhotoUrls);
  } catch (error) {
    console.error("failed to fetch photos", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const { results } = await getPhotos({ username });
    const photoList = convertUserPhotos(results, username);
    res.json(photoList);
  } catch (error) {
    console.error("Failed to fetch photos by username", error);
    res.status(500).json({ status: error.status, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await getPhotos({ id });
    res.json(photo);
  } catch (error) {
    console.error("Failed to fetch photos by id", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export { router as photoRoutes };
