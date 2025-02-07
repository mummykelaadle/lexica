import axios from "axios";
import { useEffect, useState } from "react";
import IBook from "@/interfaces/IBook";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

function useGetUserBooks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`${baseUrl}/api/v1/user/books`, { withCredentials: true })
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
