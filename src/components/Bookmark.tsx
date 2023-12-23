import "./Bookmark.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/reduxStore.ts";
import {changeBookmark} from "../state/bookmarkslice.ts";
import React from "react";
import {Button} from "antd";
import {BookmarkFill, BookmarkPlus} from "react-bootstrap-icons";

function Bookmark({id, style}: { id: number, style?: React.CSSProperties }) {

    const marked = useSelector((state: RootState) => state.bookmark.bookmarks.includes(id))
    const dispatch = useDispatch()
    const onclick = () => {
        dispatch(changeBookmark(id))
    }

    return (
        <Button className="bookmark-outer" type="text" onClick={onclick} shape="circle" style={style} icon={
            marked ? <BookmarkFill className="bookmark-inner filled"/> :
                <BookmarkPlus className="bookmark-inner outlined"/>
        }>
        </Button>
    );
}

export default Bookmark;