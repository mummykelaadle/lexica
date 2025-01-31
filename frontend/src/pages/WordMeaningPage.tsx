import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


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

//   useEffect(() => {
//     async function getWordData() {
//       const data = await readWordData();
//       setWordData(data);
//     }
//     getWordData();
//   }, []);

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
          <p key={index} className="text-lg leading-relaxed">{item}</p>
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
          <Badge key={index} className="text-sm px-3 py-1">{item}</Badge>
        ))}
      </div>
    </Card>
  );
}

export default WordMeaningPage;