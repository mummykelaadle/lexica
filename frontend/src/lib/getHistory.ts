import axios from "axios";

interface HistoryInterface{
    _v:number;
    _id:string;
    createdAt:string;
    userId:string;
    wordEntries:WordEntry[];
}

interface WordId extends Object{
    _v:number;
    _id:string;
    difficulty:number;
    meaning:string;
    word:string;
  }
  
interface WordEntry {
_id:string;
addedAt: string;
wordId: WordId;
}

const getHistory = async ():Promise<HistoryInterface> => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/user/history`,{
            withCredentials: true,
          });
        return response.data;
    } catch (error) {
        console.error("Error fetching word history:", error);
        throw error;
    }
};

export {getHistory}
