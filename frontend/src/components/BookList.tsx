"use client";

import BookCard from './BookCard'; // Adjust the path as necessary

const BookList = () => {
  const books = [
    {
      title: "Instant Help at Your Fingertips",
      image: "https://m.media-amazon.com/images/I/611OWa8x+WL._SL1050_.jpg",
      href: "/blog/slug",
      progress: 70, // Progress percentage (simulate this value)
    },
    {
      title: "Instant Help at Your Fingertips",
      image: "https://books.google.com/books/publisher/content/images/frontcover/TfcyEQAAQBAJ?fife=w512-h512",
      href: "/blog/slug",
      progress: 40,
    },
    {
      title: "Unlocking the Power of Social Media",
      image: "https://m.media-amazon.com/images/I/611OWa8x+WL._SL1050_.jpg",
      href: "/blog/slug",
      progress: 85,
    },
    {
      title: "Instant Help at Your Fingertips",
      image: "https://books.google.com/books/publisher/content/images/frontcover/TfcyEQAAQBAJ?fife=w512-h512",
      href: "/blog/slug",
      progress: 60,
    },
    {
      title: "Instant Help at Your Fingertips",
      image: "https://m.media-amazon.com/images/I/611OWa8x+WL._SL1050_.jpg",
      href: "/blog/slug",
      progress: 50,
    },
    {
      title: "Unlocking the Power of Social Media",
      image: "https://m.media-amazon.com/images/I/611OWa8x+WL._SL1050_.jpg",
      href: "/blog/slug",
      progress: 30,
    },
  ];

  return (
    <div className='min-w-full m-auto'>
      <div className="relative min-h-screen flex flex-col items-center bg-cover bg-fixed flex-wrap dark:bg-gray-800" style={{
        backgroundImage: "url('/images/mybackground.jpeg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
    
        {/* Blog Cards Section */}
        <div className="w-full bg-white bg-opacity-40 backdrop-blur-lg p-5 dark:bg-gray-700">
          <div className="flex flex-wrap justify-center gap-6">
            {books.map((book, index) => (
              <div key={index} className="relative flex-shrink-0 w-[250px] h-[400px] bg-white shadow-lg rounded-lg overflow-hidden group">
                {/* Book image with hover effect */}
                <div className="w-full h-full">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-t-lg group-hover:opacity-50 transition-opacity duration-300"
                  />
                </div>

                {/* Title and Link with hover effect */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={book.href} className="text-lg font-semibold">
                    {book.title}
                  </a>
                </div>

                {/* Progress Bar at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-300 h-2 rounded-b-lg">
                  <div
                    className="bg-blue-600 h-full rounded-b-lg"
                    style={{ width: `${book.progress}%` }} // Set progress dynamically
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
