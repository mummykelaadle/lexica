import { useState, useEffect } from "react";
import DropZone from "../components/DropZone";
import BookList from "../components/BookList";
import LevelBar from "./LevelBar";
import Spinner from "../animations/Spinner";

export default function Dashboard() {
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
      <LevelBar />
      <DropZone />
      <BookList />
    </div>
  );
}