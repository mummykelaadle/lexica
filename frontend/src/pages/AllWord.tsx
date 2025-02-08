import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Word {
  _id: string;
  word: string;
  meanings?: string[];
  synonyms?: string[];
  antonyms?: string[];
  usage?: string;
}

const API_BASE_URL = "http://localhost:5000/api/v1/book";

const fetchWords = async (bookId: string): Promise<Word[]> => {
  try {
    console.log("Fetching words for bookId:", bookId);
    const response = await axios.get(`${API_BASE_URL}/words/${bookId}`, {
      withCredentials: true,
    });

    if (response.status !== 200) throw new Error("Failed to fetch words");

    console.log("Fetched words data:", response.data);
    return response.data.words || [];
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
};

const WordList: React.FC = () => {
  const { bookId } = useParams();
  const [words, setWords] = useState<Word[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!bookId) return;
    const getWords = async () => {
      const data = await fetchWords(bookId);
      setWords(data);
    };
    getWords();
  }, [bookId]);

  const handleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-black">
      <Card className="w-full max-w-4xl shadow-lg rounded-xl bg-white dark:bg-gray-900 p-6 border border-gray-300 dark:border-gray-700">
        <CardContent>
          <h1 className="text-3xl md:text-5xl font-bold text-center text-brown-800 dark:text-gray-200">
            Words Collection
          </h1>
          <Separator className="mb-6 border-gray-400 dark:border-gray-600" />

          {words.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {words.map((word) => (
                <div
                  key={word._id}
                  className="relative w-full h-40 cursor-pointer"
                  onClick={() => handleFlip(word._id)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform preserve-3d ${
                      flippedCards[word._id] ? "rotate-y-180" : ""
                    }`}
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                  >
                    {/* Front Side */}
                    <Card
                      className="absolute inset-0 flex items-center justify-center rounded-xl shadow-lg border border-gray-300 bg-white dark:bg-gray-700"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold text-brown-700 dark:text-gray-200">
                          {word.word}
                        </h3>
                      </CardContent>
                    </Card>

                    {/* Back Side */}
                    <Card
                      className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-gray-300 bg-gray-100 dark:bg-gray-800 rotate-y-180"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <CardContent className="p-4 text-center">
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          <strong>Meaning:</strong> {word.meanings?.[0] || "N/A"}
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400 mt-1">
                          <strong>Synonyms:</strong> {word.synonyms?.join(", ") || "N/A"}
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400 mt-1">
                          <strong>Antonyms:</strong> {word.antonyms?.join(", ") || "N/A"}
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400 mt-1">
                          <strong>Usage:</strong> {word.usage || "No example available"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic dark:text-gray-400 text-center">
              No words available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WordList;
