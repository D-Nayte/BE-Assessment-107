//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import { decodePassword, encodePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/token.js";

export const createUSer = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Missing user input" });

  const userProfile = {
    username,
    password: await encodePassword(password),
    email,
  };

  try {
    const user = await UserModel.create(userProfile);
    res.status(201).json({ username, email });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ message: "Email already exists." });
    next(error);
  }
});

export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "No user found" });

  const validPassword = await decodePassword(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid password" });

  const token = generateToken(user._id.toString());
  if (!token)
    res.status(500).json({ message: "Server error, try again later." });

  res.status(200).json({ token });
});

export const getUserData = asyncHandler(async (req, res, next) => {
  const { token } = req;
  const user = await UserModel.findById(token.id);

  const userData = {
    name: user.username,
    email: user.email,
  };
  res.json(userData);
});
