import { verifyToken } from "../utils/token.js";
import asyncHandler from "express-async-handler";

export const validateToken = asyncHandler((req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.includes("Bearer")
  )
    res.status(403).json({
      message: "Please add a bearer token to your authorization request header",
    });

  const userToken = req.headers.authorization.split(" ")[1];
  const verifyedToken = verifyToken(userToken);

  const currentTime = Math.floor(Date.now() / 1000);
  if (verifyedToken.exp < currentTime)
    return res.status(403).json({
      message: "Token expired. Please login in again to receive a new token",
    });

  req.token = verifyedToken;
  next();
});
