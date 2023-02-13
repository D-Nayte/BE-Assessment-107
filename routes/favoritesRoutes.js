import { Router } from "express";
import {
  changeDescription,
  deletePhotoById,
  getPhotocollection,
  storeNewPhoto,
} from "../controllers/favoritesController.js";
import { validateToken } from "../middleware/authMiddleware.js";
const router = Router();

router.use("/", validateToken);

router.post("/", storeNewPhoto);

router.get("/", getPhotocollection);

router.delete("/", deletePhotoById);

router.patch("/", changeDescription);

export { router as favRouter };
