import { verifyToken } from "../utils/token.js";

export const validateToken = (req, res, next) => {
  console.log("req", req.headers.authorization);

  if (
    !req.headers.authorization ||
    !req.headers.authorization.includes("Bearer")
  )
    res
      .status(403)
      .json({
        message:
          "Please add a bearer token to your authorization request header",
      });

  try {
    const userToken = req.headers.authorization.split(" ")[1];
    const verifyedToken = verifyToken(userToken);

    const currentTime = Math.floor(Date.now() / 1000);
    if (verifyedToken.exp < currentTime)
      return res.status(403).json({
        message: "Token expired. Please login in again to receive a new token",
      });

    req.token = verifyedToken;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Wrong or missing token" });
  }
};
