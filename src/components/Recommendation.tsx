import {Skeleton, Typography} from "antd";
import './Recommendation.css'
import {Course} from "../interfaces.ts";
import Bookmark from "./Bookmark.tsx";
import {useNavigate} from "react-router-dom";
import {CSSProperties} from "react";

function Recommendation({obj, style}: { obj?: Course, style?: CSSProperties }) {

    const navigate = useNavigate();

    const handleClick = (event: any) => {
        if (event.target.className && event.target.className.includes("bookmark_outer"))
            return;
        if (obj && obj.id)
            navigate(`/detail/${obj.id}`, {state: {obj: obj}});
    }

    return (
        <a title={obj?.name ?? ""}>
            <div id="recom" onClick={handleClick} style={{...style, display: "flex"}}>
                <div id="recompic">
                    {
                        obj ?
                            <img style={{
                                objectFit: "cover",
                                borderRadius: "10px",
                                width: "220px",
                                height: "100%",
                                userSelect: "none",
                                pointerEvents: "none"
                            }} src={obj.image}/>
                            : <Skeleton.Image className="" style={{
                                objectFit: "cover",
                                borderRadius: "10px",
                                width: "220px",
                                height: "100%",
                                userSelect: "none",
                                pointerEvents: "none"
                            }} active/>
                    }
                    {obj && obj.id ?
                        <Bookmark id={obj.id} style={{position: "absolute", top: "10px", right: "10px"}}/>
                        : <></>}
                </div>
                {
                    obj ?
                        <div>
                            <Typography.Title className="coursename" level={5} ellipsis={{rows: 2}}
                                              style={{margin: "5px", fontWeight: "bold"}}>
                                {obj.name}
                            </Typography.Title>
                        </div>
                        : <Skeleton.Input active size="small" style={{margin: "5px"}}/>
                }
            </div>
        </a>);
}

export default Recommendation;