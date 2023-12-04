import {useEffect, useState} from "react";
import {Course} from "../interfaces.ts";
import {fetchWrapper} from "../api/helper.ts";
import SearchComponent from "../components/SearchComponent.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../state/reduxStore.ts";

function Bookmarks() {

    const [bookmarks, setBookmarks] = useState<Course[]>([])

    const bookmarkedIDs = useSelector((state: RootState) => state.bookmark.bookmarks)

    useEffect(() => {
        fetchWrapper.get("api/v1/bookmarks").then((res) => {
            setBookmarks(res.payload)
        })
    }, []);



    return (
        <div style={{
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px"
        }}>
            <div style={{maxWidth: "1200px", margin: "auto", width: "100%", padding: "10px 10px"}}>
                <h1>Bookmarks</h1>
                {bookmarks.filter((e) => bookmarkedIDs.includes(e.id as number)).map((course) => <div key={course.id}><SearchComponent obj={course}/></div>)}
            </div>
        </div>
    );

}

export default Bookmarks;