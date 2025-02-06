import WordFeed from "../components/WordFeed";
import { Card, CardContent } from "@/components/ui/card";
import { useBookTitle } from "@/lib/useGetBookTitle";
import { useParams } from "react-router-dom";

const WordFeedPage: React.FC = () => {
  const {lastCount,bookId} = useParams();
  const { loading, error, title } = useBookTitle(bookId || "");

  return (
    <div className="w-full flex items-center flex-col">
        {!loading && !error && <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center italic">{title}</h3>}
      <Card className="w-3/5 shadow-lg flex justify-center items-center h-full">
        <CardContent className="p-5">
          <WordFeed bookId={bookId || ""} lastCount={Number(lastCount) || 1}/>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordFeedPage;
