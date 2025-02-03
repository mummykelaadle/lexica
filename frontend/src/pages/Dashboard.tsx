
import DropZone from "../components/DropZone";
import Header from "../components/Header";
import BookList from "../components/BookList";
export default function Dashboard(){
    return (
        <div>
            <Header />
            <DropZone />
            <BookList />
        </div>
       
    )
}