import WordFeed from "../components/WordFeed";
import { Card, CardContent } from "@/components/ui/card";
import { useBookTitle } from "@/lib/useGetBookTitle";

const WordFeedPage: React.FC = () => {
  const bookId = "67a4906bff994236db04c322";
  const { loading, error, title } = useBookTitle(bookId);

  return (
    <div className="h-full flex justify-center items-center">
      <Card className="w-3/5 shadow-lg">
        {!loading && !error && <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center italic">{title}</h3>}
        <CardContent className="p-5">
          <WordFeed lastCount={1} />
        </CardContent>
      </Card>
    </div>
  );
};

export default WordFeedPage;
