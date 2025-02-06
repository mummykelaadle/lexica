import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { languages } from "../lib/language";
import { Volume2 } from "lucide-react";
import { useGetWordDetails } from "@/lib/useGetWordDetails";

function WordMeaningPage() {
  const { word } = useParams();
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [targetLang, setTargetLang] = useState("hi");
  const { wordData, loading, error } = useGetWordDetails(word || "");

  useEffect(() => {
    const getTranslation = async (word: string) => {
      try {
        if (!word || word.trim() === "") return;

        const url = `https://api.datpmt.com/api/v2/dictionary/translate?string=${word}&from_lang=en&to_lang=${targetLang}`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok)
          throw new Error(`Translation failed with status ${res.status}`);

        const data = await res.json();
        setTranslatedText(data || "No translation found");
      } catch (err) {
        console.error("Error during translation:", err);
      }
    };

    if (word) getTranslation(word);
  }, [word, targetLang]);

  const pronounceWord = () => {
    if (word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-IN";
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 text-left font-serif bg-neutral-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100">
      {error && <h1>There was an error fetching word data</h1>}
      {loading && <h1>Loading word data ... </h1>}
      {!error && !loading && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-6xl font-extrabold capitalize tracking-wide text-gray-800 dark:text-gray-200">
              {wordData.word}
            </h1>
            <button
              onClick={pronounceWord}
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <Volume2 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          <Badge className="text-lg px-4 py-1 mb-6">{"noun"}</Badge>

          {/* Translation Section */}
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Translate To:
            </h2>

            {/* Language Selection Dropdown */}
            <select
              className="border p-2 rounded w-full mb-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            {/* Translation Box */}
            {translatedText && (
              <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-600 shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Translation:
                </h3>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  {translatedText}
                </p>
              </div>
            )}
          </div>

          <Section title="Definitions" items={wordData.meanings} />
          <Section title="Usages" items={wordData.exampleSentences} />
          <RowSection title="Synonyms" items={wordData.synonyms} />
          <RowSection title="Antonyms" items={wordData.antonyms} />
        </>
      )}
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-4 mb-4 bg-white dark:bg-gray-700 shadow-md rounded-lg">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl italic mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <p
            key={index}
            className="text-lg leading-relaxed text-gray-900 dark:text-gray-200"
          >
            {item}
          </p>
        ))}
      </div>
    </Card>
  );
}

function RowSection({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-4 mb-4 bg-white dark:bg-gray-700 shadow-md rounded-lg">
      <h2 className="text-2xl italic mb-2 text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge
            key={index}
            className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
          >
            {item}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

export default WordMeaningPage;
