import express from "express";
import dotenv from "dotenv";
import { photoRoutes } from "./routes/photoRoutes.js";
import connectDB from "./database/index.js";
import { userRouter } from "./routes/userRoutes.js";
import { favRouter } from "./routes/favoritesRoutes.js";

dotenv.config();
connectDB(process.env.MONGO_URI);
const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.listen(port);

app.use("/api/photos", photoRoutes);
app.use("/user", userRouter);
app.use("/favoritephotos", favRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Unsplashe API!" });
});
