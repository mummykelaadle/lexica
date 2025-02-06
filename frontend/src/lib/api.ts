import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

export const checkIfFavorite = async (wordId: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/user/favorites/${wordId}/is-favorite`, {
      withCredentials: true,
    });
    return res.data.isFavorite;
  } catch (err) {
    console.error("Error checking favorite status:", err);
    return false;
  }
};

export const toggleFavorite = async (wordId: string, isFavorited: boolean) => {
  try {
    if (!isFavorited) {
      await axios.delete(`${API_BASE_URL}/user/favorites/${wordId}`, { withCredentials: true });
    } else {
      
      await axios.post(`${API_BASE_URL}/user/favorites/add-word`, { wordId }, { withCredentials: true });
    }
    return true; // ✅ Indicate success
  } catch (err) {
    console.error("❌ Error updating favorite:", err);
    return false; // ❌ Indicate failure
  }
};
