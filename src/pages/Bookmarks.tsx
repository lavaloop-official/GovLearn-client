import {useEffect, useState} from "react";
import {Course} from "../interfaces.ts";
import {fetchWrapper} from "../api/helper.ts";

function Bookmarks() {

    const [bookmarks, setBookmarks] = useState<Course[]>([])

    useEffect(() => {
        fetchWrapper.get("api/v1/bookmarks").then((res) => {
            setBookmarks(res.payload)
        })
    }, []);

    return (
        <div>
            <h1>Bookmarks</h1>
            <ul>
                {bookmarks.map((course) => <li key={course.id}>{course.name}</li>)}
            </ul>
        </div>
    );
}

export default Bookmarks;