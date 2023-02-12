import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "30d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
