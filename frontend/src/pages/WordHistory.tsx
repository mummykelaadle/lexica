import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Word {
  word: string;
  definition: string;
  dateLearned: Date;
}

const WordHistory: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    // to-do: Fetch words data from API
    setWords([
      { word: 'Ephemeral', definition: 'Lasting for a very short time.', dateLearned: new Date() },
      { word: 'Ineffable', definition: 'Too great to be expressed in words.', dateLearned: new Date(Date.now() - 86400000) },
    ]);
  }, []);

  const categorizeWords = (words: Word[]) => {
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);

    return {
      today: words.filter(word => word.dateLearned.toDateString() === today.toDateString()),
      yesterday: words.filter(word => word.dateLearned.toDateString() === yesterday.toDateString()),
      thisMonth: words.filter(word => word.dateLearned.getMonth() === today.getMonth() && word.dateLearned.getFullYear() === today.getFullYear()),
      allTime: words,
    };
  };

  const categorizedWords = categorizeWords(words);

  const renderWordCards = (words: Word[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {words.map((word, index) => (
        <Card key={index} className="rounded-xl shadow-lg border border-gray-300 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-brown-700">{word.word}</h3>
            <p className="text-gray-600 text-sm mt-2">{word.definition}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-matte-cream to-white p-6">
      <Card className="max-w-3xl w-full shadow-lg rounded-xl bg-white p-8 border border-gray-300">
        <CardContent>
          <h1 className="text-5xl italic text-brown-800 mb-8 text-center">Word History</h1>
          <Separator className="mb-6 border-gray-400" />

          {['today', 'yesterday', 'thisMonth', 'allTime'].map((period, index) => (
            <div
              key={period}
              className={`p-6 rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <h2 className="text-2xl font-semibold italic text-brown-700 mb-4 capitalize">{period}</h2>
              <Separator className="mb-6 border-gray-400" />
              {categorizedWords[period as keyof typeof categorizedWords]?.length > 0 ? (
                renderWordCards(categorizedWords[period as keyof typeof categorizedWords])
              ) : (
                <p className="text-gray-500 italic">No words learned in this period.</p>
              )}
            </div>

          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WordHistory;
