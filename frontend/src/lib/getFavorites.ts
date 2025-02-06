import axios from "axios";

interface FavoriteInterface {
    _v: number;
    _id: string;
    createdAt: string;
    userId: string;
    wordEntries: WordEntry[];
}

interface WordId {
    _v: number;
    _id: string;
    difficulty: number;
    meaning: string;
    word: string;
}

interface WordEntry {
    _id: string;
    addedAt: string;
    wordId: WordId;
}

const getFavorites = async (): Promise<FavoriteInterface> => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/user/favorites`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching favorite words:", error);
        throw error;
    }
};

export { getFavorites };
