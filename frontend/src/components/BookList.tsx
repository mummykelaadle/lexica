"use client";

import BookCard from './BookCard'; // Adjust the path as necessary


const BookList = () => {
  const books = [
    {
      title: "Instant Help at Your Fingertips",
      
      image: "https://m.media-amazon.com/images/I/611OWa8x+WL._SL1050_.jpg",
       href: "/blog/slug",
    },
    {
      title: "Instant Help at Your Fingertips",
      image: "https://books.google.com/books/publisher/content/images/frontcover/TfcyEQAAQBAJ?fife=w512-h512",
        href: "/blog/slug",
    },
    {
      title: "Unlocking the Power of Social Media",
      image: "https://m.media-amazon.com/images/I/611OWa8x+WL._SL1050_.jpg",
        href: "/blog/slug",
    },
    {
      title: "Instant Help at Your Fingertips",
      
      image: "https://books.google.com/books/publisher/content/images/frontcover/TfcyEQAAQBAJ?fife=w512-h512",
      href: "/blog/slug",
    },
    {
      title: "Instant Help at Your Fingertips",
      image: "https://m.media-amazon.com/images/I/611OWa8x+WL._SL1050_.jpg",
        href: "/blog/slug",
    },
    {
      title: "Unlocking the Power of Social Media",
      image: "https://m.media-amazon.com/images/I/611OWa8x+WL._SL1050_.jpg",
        href: "/blog/slug",
    },
  ];

  return (
    <div className='min-w-full m-auto'>
      <div className="relative min-h-screen flex flex-col items-center bg-cover bg-fixed flex-wrap"  style={{
      backgroundImage: "url('/images/mybackground.jpeg')",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
    
      {/* Blog Cards Section */}
      <div className="w-full bg-white bg-opacity-40 backdrop-blur-lg p-5">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
  {books.map((book, index) => (
    <BookCard key={index} title={book.title} image={book.image} href={book.href} />
  ))}
</div>
 </div>

    </div>
    </div>
    
  );
};

export default BookList;
