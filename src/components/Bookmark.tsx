import {StarFilled, StarOutlined} from "@ant-design/icons";
import "./Bookmark.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/reduxStore.ts";
import {changeBookmark} from "../state/bookmarkslice.ts";
import React from "react";
import {Button} from "antd";

function Bookmark({id, style}: { id: number, style?: React.CSSProperties }) {

    const marked = useSelector((state: RootState) => state.bookmark.bookmarks.includes(id))
    const dispatch = useDispatch()
    const onclick = () => {
        dispatch(changeBookmark(id))
    }

    return (
        <Button id="bookmark_outer" type="text" onClick={onclick} shape="circle" style={style} icon={
            marked ? <StarFilled id="bookmark_inner"/> : <StarOutlined id="bookmark_inner"/>
        }>
        </Button>
    );
}

export default Bookmark;