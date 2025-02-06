import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getHistory } from "../lib/getHistory";

interface WordId {
  _v: number;
  _id: string;
  difficulty: number;
  meanings?: string[];
  word: string;
  synonyms?: string[];
  antonyms?: string[];
  usage?: string;
}

interface WordEntry {
  _id: string;
  addedAt: string;
  wordId: WordId;
}

const WordHistory: React.FC = () => {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    async function fetchWordHistory() {
      try {
        const history = await getHistory();
        setWords(history.wordEntries || []);
       
      } catch (error) { 
        console.error("Error fetching word history:", error);
      }
    }

    fetchWordHistory();
  }, []);

  const categorizeWords = (words: WordEntry[]) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    return {
      today: words.filter(
        (word) => new Date(word.addedAt).toDateString() === today
      ),
      yesterday: words.filter(
        (word) => new Date(word.addedAt).toDateString() === yesterday
      ),
      thisMonth: words.filter((word) => {
        const date = new Date(word.addedAt);
        const now = new Date();
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }),
      allTime: words,
    };
  };

  const categorizedWords = categorizeWords(words);

  const handleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderWordCards = (words: WordEntry[]) => (
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {words.map((entry) => (
      <div
      key={entry._id}
      className="relative w-full h-40 perspective-1000 cursor-pointer"
      onClick={() => handleFlip(entry._id)}
    >
      <div
        className={`w-full h-full transition-transform duration-500 transform-style-3d ${
          flippedCards[entry._id] ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <Card className="absolute inset-0 flex items-center justify-center rounded-xl shadow-lg border border-gray-300 bg-white dark:bg-gray-700 transform backface-hidden">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-brown-700 dark:text-gray-200">
              {entry.wordId.word}
            </h3>
          </CardContent>
        </Card>
    
        {/* Back Side (Now Properly Hidden Initially) */}
        <Card className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-gray-300 bg-gray-100 dark:bg-gray-800 transform rotate-y-180 backface-hidden">
          <CardContent className="p-4 text-center">
          <p className="text-gray-600 text-sm dark:text-gray-400">
            <strong>Meaning:</strong> {entry.wordId.meanings && entry.wordId.meanings.length > 0 ? entry.wordId.meanings[0] : "N/A"}
          </p>
          <p className="text-gray-600 text-sm dark:text-gray-400 mt-1">
            <strong>Synonyms:</strong> {entry.wordId.synonyms && entry.wordId.synonyms.length > 0 ? entry.wordId.synonyms.join(", ") : "N/A"}
          </p>
          <p className="text-gray-600 text-sm dark:text-gray-400 mt-1">
            <strong>Antonyms:</strong> {entry.wordId.antonyms && entry.wordId.antonyms.length > 0 ? entry.wordId.antonyms.join(", ") : "N/A"}
          </p>

          </CardContent>
        </Card>
      </div>
    </div>
    
      ))}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-matte-cream to-white dark:text-gray-600 dark:to-gray-900 p-6">
      <Card className="max-w-3xl w-full shadow-lg rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-600">
        <CardContent>
          <h1 className="text-5xl italic text-brown-800 mb-8 text-center dark:text-gray-100">
            Word History
          </h1>
          <Separator className="mb-6 border-gray-400 dark:border-gray-600" />

          {["today", "yesterday", "thisMonth", "allTime"].map((period, index) => (
            <div
              key={period}
              className={`p-6 rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                index % 2 === 0
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-white dark:bg-gray-600"
              }`}
            >
              <h2 className="text-2xl font-semibold italic text-brown-700 mb-4 capitalize dark:text-gray-200">
                {period}
              </h2>
              <Separator className="mb-6 border-gray-400 dark:border-gray-600" />
              {categorizedWords[period as keyof typeof categorizedWords]?.length > 0 ? (
                renderWordCards(categorizedWords[period as keyof typeof categorizedWords])
              ) : (
                <p className="text-gray-500 italic dark:text-gray-400">
                  No words learned in this period.
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WordHistory;
