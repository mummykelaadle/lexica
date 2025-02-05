import axios from "axios";
import { useEffect, useState } from "react";

function useBookTitle(bookId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`http://localhost:5000/api/v1/book/title?bookId=${bookId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTitle(res.data.title || null);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        console.error("Error fetching book title:", e);
      });

  }, [bookId]);

  return { loading, error, title };
}

export { useBookTitle };