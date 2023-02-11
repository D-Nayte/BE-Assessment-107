import { Router } from "express";
import { getAllPhotos, getPhotoById } from "../controllers/photoController.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allPhotos = await getAllPhotos();
    const rawPhotoUrls = allPhotos.map((photo) => photo.urls.raw);
    res.json(rawPhotoUrls);
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const singlePhoto = await getPhotoById(id);
    res.json(singlePhoto);
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export { router as photoRoutes };
