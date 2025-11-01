import axios from "axios";

// Base URL of API
const BASE_URL = "https://api.artic.edu/api/v1/artworks";

// Function to fetch artworks data from API
export const fetchArtworks = async (page: number, limit: number = 8) => {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
};
