import {Skeleton} from "antd";
import './Recommendation.css'
import Course from "../course.ts";

function Recommendation({obj}: {obj?: Course}) {

    return (<>
        <div id="recom" style={{
            maxWidth: "240px",
            maxHeight: "180px",
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
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

            </div>
            {
                obj ?
                    <a href={`/detail/${obj.id}`}><h3 style={{margin: "5px"}} >{obj.name}</h3></a>
                    : <Skeleton.Input active size="small" style={{margin: "5px"}}/>
            }
        </div>
    </>);
}

export default Recommendation;