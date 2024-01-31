import {useEffect, useState} from "react";
import {Course} from "../../constants/interfaces.ts";
import {fetchWrapper} from "../../api/helper.ts";
import ListComponent from "../../components/listelement/ListComponent.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../state/reduxStore.ts";
import {Empty} from "antd";
import {NO_BOOKMARKS} from "../../constants/de.ts";
import './Bookmarks.css';

function Bookmarks() {

    const [bookmarks, setBookmarks] = useState<Course[]>([])

    const bookmarkedIDs = useSelector((state: RootState) => state.bookmark.bookmarks)

    useEffect(() => {
        fetchWrapper.get("api/v1/bookmarks").then((res) => {
            setBookmarks(res.payload)
        })
    }, []);

    const getActiveBookmarks = () => {
        return bookmarks.filter((e) => bookmarkedIDs.includes(e.id as number)).map((course) => <div key={course.id}>
            <ListComponent obj={course}/></div>)
    }

    return (
        <div className="bookmark_body">
            <h1>Bookmarks</h1>
            {getActiveBookmarks().length == 0 ? <Empty description={NO_BOOKMARKS}/> :
                getActiveBookmarks()}
        </div>
    );

}

export default Bookmarks;