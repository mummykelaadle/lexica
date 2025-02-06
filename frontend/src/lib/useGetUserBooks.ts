import axios from "axios";
import { useEffect, useState } from "react";

interface Book {
  bookId: string;
  title: string;
}

function useGetUserBooks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get("http://localhost:5000/api/v1/user/books", { withCredentials: true })
      .then((res) => {
        setBooks(res.data.books || []);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        console.error("Error fetching user books:", e);
      });

  }, []);

  return { loading, error, books };
}

export { useGetUserBooks };
