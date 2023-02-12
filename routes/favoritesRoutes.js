import { Router } from "express";
import { storeNewPhoto } from "../controllers/favoritesController.js";
import { validateToken } from "../middleware/authMiddleware.js";
const router = Router();

router.use("/", validateToken);

router.post("/addphoto", storeNewPhoto);

export { router as favRouter };
