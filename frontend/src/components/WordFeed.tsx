import { useState, useCallback, useRef } from "react";
import { loadWords } from "@/lib/loadWords";
import WordCard from "./WordCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookTitle } from "@/lib/useGetBookTitle";
import { useTotalPageCount } from "@/lib/useTotalCount";

interface WordInterface {
  _id: number;
  word: string;
  meanings: string[];
  synonyms: string[];
  antonyms: string[];
  exampleSentences: string[];
  difficulty: number;
}

export default function WordFeed(params: {
  lastCount: number;
  bookId: string;
}) {
  const { lastCount, bookId } = params;
  const [count, setCount] = useState(Number(lastCount) || 0);
  const [currentBookId, setCurrentBookId] = useState(bookId || "");
  const { loadingTotalPageCount, errorTotalPageCount, totalPageCount } = useTotalPageCount(bookId || "");
  const { loading, error, title } = useBookTitle(bookId || "");

  //hardcoded for now, will come in as a param in future
  const limit = 1;

  const { loadingWords, errorWords, words, hasMore } = loadWords(
    currentBookId,
    count,
    limit
  );
  const observer = useRef<IntersectionObserver | null>(null);

  const lastWordElementRef = useCallback(
    (node: HTMLDivElement) => {
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
    },
    [loading, hasMore]
  );

  return (
    <>
      {!loading && !error && <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-300 text-center">{title}</p>}
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-gray-400"><span className="italic">Pages</span>:{totalPageCount && Math.min(count * limit, totalPageCount)}/{!loadingTotalPageCount && !errorTotalPageCount && totalPageCount}</p>
      <div className="h-[85vh] overflow-y-auto flex flex-wrap justify-center items-center w-[90%] mx-auto text-center gap-[10px] relative p-4">
        {errorWords && <div>error occured while fetching data</div>}
        {!errorWords &&
          words.map((word, index) => {
            if (words.length == index + 1)
              return <WordCard ref={lastWordElementRef} word={word} />;
            else return <WordCard word={word} />;
          })}

        {!errorWords && loadingWords && (
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
    </>
  );
}
