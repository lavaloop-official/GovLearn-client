import {StarFilled, StarOutlined} from "@ant-design/icons";
import "./Bookmark.css";

function Bookmark({bookmark, click}: { bookmark?: boolean, click?: () => void }) {

    return (
        <div id="bookmark_outer" onClick={click}>
            {
                bookmark ? <StarFilled id="bookmark_inner"/> :
                    <StarOutlined id="bookmark_inner"/>
            }
        </div>
    );
}

export default Bookmark;