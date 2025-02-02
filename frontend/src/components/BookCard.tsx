import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  title: string;
  image: string;
  href: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, image, href }) => {
  return (
    <Card className="relative group border rounded-xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 w-[140px] sm:w-[160px]">
      <div className="relative rounded-xl overflow-hidden">
        {/* Hover effect on image */}
        <div className="absolute inset-0 bg-red-700 bg-opacity-80 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center rounded-xl">
          <a href={href} className="text-white font-semibold text-sm">Read Book</a>
        </div>
        
        <img
          className="w-full h-[220px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          src={image}
          alt={title}
        />
      </div>

      <CardContent className="p-2 text-center">
        <h3 className="text-sm font-medium leading-5 truncate">{title}</h3>

        <Button variant="ghost" className="mt-2 w-full text-sm text-red-600 group-hover:text-red-700">
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
