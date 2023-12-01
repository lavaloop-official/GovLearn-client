import {useSelector} from "react-redux";
import {RootState} from "../state/reduxStore.ts";

function Bookmarks() {

    const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks)

    return (
        <div>
            <h1>Bookmarks</h1>
            <ul>
                {bookmarks.map((id) => <li>{id}</li>)}
            </ul>
        </div>
    );
}

export default Bookmarks;