import axios from "axios";
import { AxiosResponse } from "axios";
const addWordToHistory = async (wordId: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/history/add-word",
      { wordId },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data ?? error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};

export {addWordToHistory};