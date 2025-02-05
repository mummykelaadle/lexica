import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getHistory } from '../lib/getHistory';

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

const WordHistory: React.FC = () => {
  const [words, setWords] = useState<WordEntry[]>([]);

  useEffect(() => {
    async function fetchWordHistory() {
      try {
        const history = await getHistory();
        console.log(`Fetched history from backend`);
        console.log(`----------------------------`);
        console.log(history.wordEntries);
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
      today: words.filter(word => new Date(word.addedAt).toDateString() === today),
      yesterday: words.filter(word => new Date(word.addedAt).toDateString() === yesterday),
      thisMonth: words.filter(word => {
        const date = new Date(word.addedAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }),
      allTime: words,
    };
  };

  const categorizedWords = categorizeWords(words);

  const renderWordCards = (words: WordEntry[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {words.map((entry, index) => (
        <Card key={index} className="rounded-xl shadow-lg border border-gray-300 bg-white dark:bg-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-brown-700 dark:text-gray-200">{entry.wordId.word}</h3>
            <p className="text-gray-600 text-sm mt-2 dark:text-gray-400">{entry.wordId.meaning}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-matte-cream to-white dark:text-gray-600 dark:to-gray-900 p-6">
      <Card className="max-w-3xl w-full shadow-lg rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-600">
        <CardContent>
          <h1 className="text-5xl italic text-brown-800 mb-8 text-center dark:text-gray-100">Word History</h1>
          <Separator className="mb-6 border-gray-400 dark:border-gray-600" />

          {["today", "yesterday", "thisMonth", "allTime"].map((period, index) => (
            <div
              key={period}
              className={`p-6 rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-600'}`}
            >
              <h2 className="text-2xl font-semibold italic text-brown-700 mb-4 capitalize dark:text-gray-200">{period}</h2>
              <Separator className="mb-6 border-gray-400 dark:border-gray-600" />
              {categorizedWords[period as keyof typeof categorizedWords]?.length > 0 ? (
                renderWordCards(categorizedWords[period as keyof typeof categorizedWords])
              ) : (
                <p className="text-gray-500 italic dark:text-gray-400">No words learned in this period.</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WordHistory;
