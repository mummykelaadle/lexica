import axios from "axios";
import { useEffect, useState } from "react";

function useTotalPageCount(bookId: string) {
  const [loadingTotalPageCount, setLoading] = useState(true);
  const [errorTotalPageCount, setError] = useState(false);
  const [totalPageCount, setPageCount] = useState<number | null>(null);

  useEffect(() => {
    if (!bookId) return; // Prevent API call if bookId is empty

    setLoading(true);
    setError(false);

    axios
      .get(`http://localhost:5000/api/v1/book/pageCount?bookId=${bookId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPageCount(res.data.count || 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        console.error("Error fetching total page count:", e);
      });

  }, [bookId]);

  return { loadingTotalPageCount, errorTotalPageCount, totalPageCount };
}

export { useTotalPageCount };
