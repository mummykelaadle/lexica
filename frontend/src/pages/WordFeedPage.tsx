import WordFeed from "../components/WordFeed";
import { Card, CardContent } from "@/components/ui/card";

const WordFeedPage: React.FC = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Card className="w-3/5 shadow-lg">
        <CardContent className="p-5">
          <WordFeed lastCount={1} />
        </CardContent>
      </Card>
    </div>
  );
};

export default WordFeedPage;
