import express from "express";
import dotenv from "dotenv";
import { photoRoutes } from "./routes/photoRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.listen(port);

app.use("/api/photos", photoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Unsplashe API!" });
});
