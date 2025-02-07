
import DropZone from "../components/DropZone";
import BookList from "../components/BookList";
import LevelBar from "./LevelBar";
export default function Dashboard() {
  return (
    <div>
      <LevelBar />
      <DropZone />
      <BookList />
    </div>

  )
}
