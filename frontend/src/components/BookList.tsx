import { useGetUserBooks } from "@/lib/useGetUserBooks";
import { Link } from "react-router-dom";
import { BooksLoading } from "@/animations/BooksLoading";
import IBook from "@/interfaces/IBook";

const BookList = () => {
  const { loading, error, books } = useGetUserBooks();
  console.log(books);

  return (
    <div className='min-w-full m-auto'>
      <div className="relative min-h-screen flex flex-col items-center bg-cover bg-fixed flex-wrap overflow-y-scroll" style={{
        backgroundImage: "url('/images/mybackground.jpeg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>

        {/* Blog Cards Section */}
        <div className="w-full bg-white bg-opacity-40 backdrop-blur-lg border rounded-md">
          <div className="flex flex-wrap justify-center gap-6 bg-gray-50 p-5 rounded-md dark:bg-gray-700">
            {!loading && !error && books.map((book: IBook, index: number) => (
              //to send actual last count to component once backend fn available
              <Link to={`/feed/${0}/${book.bookId}`} key={index} className="relative flex-shrink-0 w-[250px] h-[400px] bg-white shadow-lg rounded-lg overflow-hidden group">
                {/* Book image with hover effect */}
                <div className="w-full h-full">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-t-lg group-hover:opacity-50 transition-opacity duration-300"
                  />
                </div>

                {/* Title and Link with hover effect */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-lg font-semibold">
                    {book.title}
                  </div>
                </div>

                {/* Progress Bar at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-300 h-2 rounded-b-lg">
                  <div
                    className="bg-blue-600 h-full rounded-b-lg"
                    style={{ width: `${book.progress}%` }} // TODO: set actual progress once backend fn present
                  ></div>
                </div>
              </Link>
            ))}
            {!error && loading && <BooksLoading />}
            {error && <p>error loading books...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
