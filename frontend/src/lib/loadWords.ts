import axios from "axios";
import { Canceler } from "axios";
import { useEffect, useState } from "react";

interface WordInterface{
    _id:number;
    word:string;
    meanings:string[];
    synonyms:string[];
    antonyms:string[];
    exampleSentences:string[];
    difficulty:number
  }

function loadWords(bookId: string, count: number, limit: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [words, setWords] = useState<WordInterface[]>([]);
  const [hasMore, setHasMore] = useState(false);
  console.log("-------------->" + count + "     " + limit);

  useEffect(()=>{
    setLoading(true);
    setError(false);

    let cancel:Canceler
    axios({
        method:"GET",
        url:`http://localhost:5000/api/v1/book/pages?bookId=${bookId}&page=${count}&limit=${limit}`,
        withCredentials: true,
        cancelToken:new axios.CancelToken(c=>cancel=c)
    }).then(res=>{
      const newWords=res.data.pages.flatMap((page: any) => page.words);
      setWords(words=>{
            return [...words,...newWords]
        })
        setHasMore(res.data.pages.length>0)
        setLoading(false)
        console.log(res.data)
    }).catch((e)=>{
        if(axios.isCancel(e))return;
        setError(true);
        console.log(e);
    })

    return ()=>cancel();
},[bookId,count,limit])
return {loading,error,words,hasMore};
}

export { loadWords };
