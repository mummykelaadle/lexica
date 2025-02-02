import axios from "axios";

const fetchWordHistory = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/user/history/`,{
            withCredentials: true,
          });
        return response.data;
    } catch (error) {
        console.error("Error fetching word history:", error);
        throw error;
    }
};

export {fetchWordHistory}
