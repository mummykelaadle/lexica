
import DropZone from "../components/DropZone";
import BookList from "../components/BookList";
import LevelBar from "./LevelBar";
export default function Dashboard() {
  return (
    <div className="max-w-[90%] mx-auto pt-10">
      <LevelBar />
      <DropZone />
      <BookList />
    </div>

  )
}
