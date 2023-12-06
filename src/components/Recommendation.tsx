import {Skeleton, Typography} from "antd";
import './Recommendation.css'
import {Course} from "../interfaces.ts";
import Bookmark from "./Bookmark.tsx";

function Recommendation({obj}: { obj?: Course }) {

    return (<>
        <div id="recom" style={{
            maxWidth: "240px",
            maxHeight: "185px",
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            position: "relative"
        }}>
            <div id="recompic" style={{height: "120px"}}>
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
                        : <Skeleton.Image style={{
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
                    <a className="courselink" href={`/detail/${obj.id}`} title={obj.name}>
                        <Typography.Title level={5} ellipsis={{rows: 2}} style={{margin: "5px", fontWeight: "bold"}}>
                            {obj.name}
                        </Typography.Title>
                    </a>
                    : <Skeleton.Input active size="small" style={{margin: "5px"}}/>
            }
        </div>
    </>);
}

export default Recommendation;