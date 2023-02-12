import { Router } from "express";
import {
  createUSer,
  getUserData,
  logIn,
} from "../controllers/userController.js";
import { validateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", createUSer);

router.post("/login", logIn);

router.post("/me", validateToken, getUserData);

export { router as userRouter };
