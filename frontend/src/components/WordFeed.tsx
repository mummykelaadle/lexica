import { useState, useCallback, useRef } from "react";
import { loadWords } from "@/lib/loadWords";
import WordCard from "./WordCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";

interface WordInterface{
  _id:number;
  word:string;
  meanings:string[];
  synonyms:string[];
  antonyms:string[];
  exampleSentences:string[];
  difficulty:number
}

export default function WordFeed(params:{lastCount:number,bookId:string}) {
  const {lastCount,bookId} = params;
  const [count, setCount] = useState(Number(lastCount) || 0);
  const [currentBookId,setCurrentBookId] = useState(bookId || "")
  //hardcoded for now, will come in as a param in future
  const limit = 1;

  const { loading, error, words, hasMore } = loadWords(
    currentBookId,
    count,
    limit
  );
  const observer = useRef<IntersectionObserver | null>(null);

  const lastWordElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    // Disconnect existing observer before creating a new one
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setCount((prevCount) => prevCount + 1);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
    console.log(node);
  }, [loading, hasMore]);
  

  return (
    <div className="h-[475px] overflow-y-auto flex flex-wrap justify-center items-center w-[90%] mx-auto text-center gap-[10px] relative p-4">
      {error&& <div>error occured while fetching data</div>}
      {!error && words.map((word, index) => {
        if (words.length == index + 1)
          return (
            <WordCard ref={lastWordElementRef} word={word}/>
          );
        else return <WordCard word={word}/>
      })}

      {!error && loading && (
        <div>
          <Skeleton className="w-full h-10 rounded-md my-2" />
          <Skeleton className="w-full h-10 rounded-md my-2" />
          <Skeleton className="w-full h-10 rounded-md my-2" />
          <Skeleton className="w-full h-10 rounded-md my-2" />
          <Skeleton className="w-full h-10 rounded-md my-2" />
          <Skeleton className="w-full h-10 rounded-md my-2" />
        </div>
      )}
    </div>
  );
}
