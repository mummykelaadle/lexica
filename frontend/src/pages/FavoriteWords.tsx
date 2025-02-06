import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getFavorites } from '../lib/getFavorites';

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

const FavoriteWords: React.FC = () => {
  const [favoriteWords, setFavoriteWords] = useState<WordEntry[]>([]);

  useEffect(() => {
    async function fetchFavoriteWords() {
      try {
        const favorites = await getFavorites();
        console.log(`Fetched favorites from backend`);
        console.log(`----------------------------`);
        console.log(favorites);
        setFavoriteWords(favorites.wordEntries || []);
      } catch (error) {
        console.error("Error fetching favorite words:", error);
      }
    }

    fetchFavoriteWords();
  }, []);

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
          <h1 className="text-5xl italic text-brown-800 mb-8 text-center dark:text-gray-100">Favorite Words</h1>
          <Separator className="mb-6 border-gray-400 dark:border-gray-600" />
          {favoriteWords.length > 0 ? renderWordCards(favoriteWords) : (
            <p className="text-gray-500 italic dark:text-gray-400 text-center">No favorite words added yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoriteWords;
