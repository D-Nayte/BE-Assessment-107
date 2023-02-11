//Require axios to make API calls
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const accessKey = `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`;
const autorization = {
  headers: { Authorization: accessKey },
};

export const getPhotos = async (params) => {
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
