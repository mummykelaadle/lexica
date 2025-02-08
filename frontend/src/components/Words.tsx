import { useState, useEffect } from "react";
import Spinner from "../animations/Spinner";
import GetWords from "./GetWords";

export default function Words() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading (replace with actual API call if needed)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <GetWords />
    </div>
  );
}