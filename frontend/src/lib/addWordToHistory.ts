import axios from "axios";

const addWordToHistory = async (wordId: string): Promise<void> => {
  try {
    const response = await axios.post<{ message: string; wordHistory?: any }>(
      "http://localhost:5000/api/v1/user/addToWordHistory",
      { wordId },
      {
        withCredentials: true,
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data ?? error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export {addWordToHistory};