//Require axios to make API calls
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const accessKey = `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`;
const autorization = {
  headers: { Authorization: accessKey },
};

export const getAllPhotos = async () => {
  const url = `${baseUrl}/photos`;
  try {
    const response = await axios.get(url, autorization);

    if (response.status === 200) {
      return response.data;
    }
    const message = response.data.erros;
    throw new Error(`Api fetch failed. Error: ${message}`);
  } catch (error) {
    throw new Error(`Error while fetching photos. Error: ${error}`);
  }
};

export const getPhotoById = async (id) => {
  const url = `${baseUrl}/photos/${id}`;

  try {
    const response = await axios.get(url, autorization);

    if (response.status === 200) {
      return response.data;
    }
    const message = response.data.erros;
    throw new Error(`Api fetch failed. Error: ${message}`);
  } catch (error) {
    throw new Error(`Error while fetching photos. Error: ${error}`);
  }
};
