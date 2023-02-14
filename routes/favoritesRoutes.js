import { Router } from "express";
import {
  changeDescription,
  deletePhotoById,
  getPhotocollection,
  storeNewPhoto,
} from "../controllers/favoritesController.js";
import { validateToken } from "../middleware/authMiddleware.js";
import { errorHandler } from "../middleware/errorMiddleware.js";
const router = Router();

router.use("/", validateToken);

router.post("/", storeNewPhoto);

router.get("/", getPhotocollection);

router.delete("/", deletePhotoById);

router.patch("/", changeDescription);

// router.use(errorHandler);

export { router as favRouter };
