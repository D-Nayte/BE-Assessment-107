import { Router } from "express";
import {
  getAllPhotos,
  getPhotosByUsername,
  getSinglePhoto,
} from "../controllers/photoController.js";
import convertUserPhotos from "../utils/convertUserPhotos.js";

const router = Router();

router.get("/", getAllPhotos);

router.get("/user/:username", getPhotosByUsername);

router.get("/:id", getSinglePhoto);

export { router as photoRoutes };
