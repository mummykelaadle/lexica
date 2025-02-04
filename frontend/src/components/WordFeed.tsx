import { useState, useEffect, useRef } from "react";
import { loadWords } from "@/lib/loadWords";
import WordCard from "./WordCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface WordInterface {
    _id: string;
    word: string;
    meaning: string;
    difficulty: number;
    __v: number;
}

export default function WordFeed({ lastCount }: { lastCount: number }) {
    const divRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const [downRanOnce, setDownRanOnce] = useState(false);
    const [hasMoreDown, setHasMoreDown] = useState(true);
    const [pages, setPages] = useState<WordInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(lastCount);
    const limit = 3;
    const bookId = "6798d8fcd21a1a2ab5cab6b2";

    const next = async () => {
        try {
            setIsLoading(true);
            setCount((prev) => prev + 1);
            const response = await loadWords(bookId, count, limit);
            const newData = response.data.pages.flatMap((page: any) => page.words);
            setPages((prev) => [...prev, ...newData]);
            setHasMoreDown(newData.length > 0);
            setDownRanOnce(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        next();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMoreDown && !isLoading) {
                    next();
                }
            },
            { root: divRef.current, threshold: 0.1 }
        );

        if (sentinelRef.current) observer.observe(sentinelRef.current);

        return () => {
            if (sentinelRef.current) observer.unobserve(sentinelRef.current);
        };
    }, [hasMoreDown, isLoading]);

    return (
        <div
            ref={divRef}
            className="h-[500px] overflow-y-auto flex flex-wrap justify-center items-center w-[90%] mx-auto text-center gap-[10px] relative p-4"
        >
            {pages.map((word) => (
                <WordCard word={word.word} difficulty={word.difficulty} _id={word._id} />
            ))}

            {isLoading && (
                <Skeleton className="w-full h-10 rounded-md my-2" />
            )}

            <div ref={sentinelRef} className="h-px w-full" />
        </div>
    );
}
