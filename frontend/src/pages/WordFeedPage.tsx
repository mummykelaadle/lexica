import WordFeed from "../components/WordFeed";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const WordFeedPage: React.FC = () => {
  const {lastCount,bookId} = useParams();
  return (
    <div className="w-full flex items-center flex-col">
      <Card className="w-4/5 shadow-lg flex justify-center items-center h-full">
        <CardContent className="p-5">
          <WordFeed bookId={bookId || ""} lastCount={Number(lastCount) || 1}/>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordFeedPage;
