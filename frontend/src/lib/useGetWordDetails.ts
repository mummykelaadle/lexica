import axios from "axios";
import { useEffect, useState } from "react";

interface WordInterface {
  _id: number;
  word: string;
  meanings: string[];
  synonyms: string[];
  antonyms: string[];
  exampleSentences: string[];
  difficulty: number;
}

const defaultData: WordInterface = {
  _id:1,
  word:"word",
  meanings: [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
  ],
  exampleSentences: [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
  ],
  synonyms: ["aasd", "asdasd", "asdas", "asdas"],
  antonyms: ["aasd", "asdasd", "asdas", "asdas"],
  difficulty:0,
};

export const useGetWordDetails = (word: string) => {
    const [wordData,setWordData]=useState<WordInterface>(defaultData);
    const [loading,setLoading]=useState<Boolean>(false);
    const [error,setError]=useState<Boolean>(false);

    useEffect(()=>{
      async function caller()
      {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/v1/word`, {
            params: { word },
            withCredentials: true,
          });
          console.log(response.data);
          setWordData(response.data);
        } catch (error) {
          console.error("Failed to fetch word details:", error);
          setError(true);
        }
        finally
        {
          setLoading(false);
        }
      }
      caller();
    },[word]);

  return {wordData,loading,error};
};
