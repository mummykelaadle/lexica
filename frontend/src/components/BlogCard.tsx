import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  title: string;
 
  image: string;
  href: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title,  image,  href }) => {
  return (
    <Card className="relative group border rounded-2xl shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="relative mb-4 rounded-2xl overflow-hidden">
        {/* Hover effect on the image */}
        <div className="absolute inset-0 bg-red-700 bg-opacity-80 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center rounded-2xl">
          {/* Read Book link */}
          <a
            href={href} // Link to another blog page
            className="text-xl text-white cursor-pointer"
          >
            Read Book
          </a>
        </div>
        <img
          className="w-full h-48 object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
          src={image}
          alt="Blog Thumbnail"
        />
      </div>

      <CardContent>
       
        <h3 className="text-lg font-medium leading-6">
          <a href={href} className="group-hover:text-red-700 transition-colors duration-200">
            {title}
          </a>
        </h3>

        <Button variant="ghost" className="mt-3 w-full group-hover:text-red-700">
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
