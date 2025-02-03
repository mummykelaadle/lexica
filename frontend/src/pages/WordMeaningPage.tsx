//todo default langauge

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { languages } from "../lib/language";

interface WordData {
  definitions: string[];
  usages: string[];
  synonyms: string[];
  antonyms: string[];
  pos: string;
}

function WordMeaningPage() {
  const { word } = useParams();
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [targetLang, setTargetLang] = useState("hi");

  useEffect(() => {
    const getTranslation = async (word: string) => {
      try {
        if (!word || word.trim() === "") return;

        const url = `https://api.datpmt.com/api/v2/dictionary/translate?string=${word}&from_lang=en&to_lang=${targetLang}`;
        const res = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!res.ok) throw new Error(`Translation failed with status ${res.status}`);

        const data = await res.json();
        setTranslatedText(data || "No translation found");
      } catch (err) {
        console.error("Error during translation:", err);
      }
    };

    if (word) getTranslation(word);
  }, [word, targetLang]);

  const defaultData: WordData = {
    definitions: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
    ],
    usages: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non!",
    ],
    synonyms: ["aasd", "asdasd", "asdas", "asdas"],
    antonyms: ["aasd", "asdasd", "asdas", "asdas"],
    pos: "noun",
  };

  const data = wordData || defaultData;

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 text-left font-serif bg-neutral-100 text-gray-900">
  <h1 className="text-6xl font-extrabold capitalize mb-4 tracking-wide text-gray-800">{word}</h1>
  <Badge className="text-lg px-4 py-1 mb-6">{data.pos}</Badge>

  {/* Translation Section */}
  <div className="bg-white shadow-md rounded-lg p-4 mb-6">
    <h2 className="text-xl font-semibold mb-2">Translate To:</h2>

    {/* Language Selection Dropdown */}
    <select
      className="border p-2 rounded w-full mb-3"
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
      <div className="border rounded-lg p-3 bg-gray-50 shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-1">Translation:</h3>
        <p className="text-lg text-gray-900">{translatedText}</p>
      </div>
    )}
  </div>

  {/* Word Details Sections */}
  <Section title="Definitions" items={data.definitions} />
  <Section title="Usages" items={data.usages} />
  <RowSection title="Synonyms" items={data.synonyms} />
  <RowSection title="Antonyms" items={data.antonyms} />
</div>

  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-4 mb-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl italic mb-2">{title}</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <p key={index} className="text-lg leading-relaxed">
            {item}
          </p>
        ))}
      </div>
    </Card>
  );
}

function RowSection({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-4 mb-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl italic mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} className="text-sm px-3 py-1">
            {item}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

export default WordMeaningPage;
