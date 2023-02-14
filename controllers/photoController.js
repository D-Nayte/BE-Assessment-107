//Require axios to make API calls
import axios from "axios";
import dotenv from "dotenv";
import convertUserPhotos from "../utils/convertUserPhotos.js";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const accessKey = `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`;
const autorization = {
  headers: { Authorization: accessKey },
};

const fetchPhotos = async (params) => {
  let url = `${baseUrl}/photos`;

  if (params) {
    const { id, username } = params;
    if (id) url = `${baseUrl}/photos/${id}`;
    if (username) url = `${baseUrl}/search/photos?query=${username}`;
  }

  try {
    const response = await axios.get(url, autorization);
    return response.data;
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data?.errors[0],
    };
  }
};

export const getAllPhotos = async (req, res) => {
  try {
    const allPhotos = await fetchPhotos(null);

    const rawPhotoUrls = allPhotos.map((photo) => photo.urls.raw);
    res.json(rawPhotoUrls);
  } catch (error) {
    console.error("failed to fetch photos", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getPhotosByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const { results } = await fetchPhotos({ username });
    const photoList = convertUserPhotos(results, username);
    res.json(photoList);
  } catch (error) {
    console.error("Failed to fetch photos by username", error);
    res.status(error.status).json({ message: error.message });
  }
};

export const getSinglePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await fetchPhotos({ id });
    res.json(photo);
  } catch (error) {
    console.error("Failed to fetch photos by id", error);
    res.status(error.status).json({ message: error.message });
  }
};
