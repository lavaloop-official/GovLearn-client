import {Rate, Skeleton, Typography} from "antd";
import {Course} from "../interfaces.ts";
import Bookmark from "./Bookmark.tsx";
import {useNavigate} from "react-router-dom";
import './SearchComponent.css';

function SearchComponent({obj, feedbackrate}: { obj?: Course, feedbackrate?: number }) {

    const navigate = useNavigate();

    const handleClick = (event: any) => {
        if (event.target.className && event.target.className.includes("bookmark_outer"))
            return;
        if (obj && obj.id)
            navigate(`/detail/${obj.id}`, {state: {obj: obj}});
    }

    // TODO: Integrate Rating
    return (
        <a>
            <div className="searchouter" onClick={handleClick}>
                <div className="searchinner">
                    {obj?.id ? <Bookmark id={obj.id} style={{position: "absolute", top: "5px", right: "5px"}}/> : <></>}
                    {
                        obj ?
                            <img src={obj.image} style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                overflow: "hidden",
                                borderRadius: "10px",
                                backgroundColor: "grey"
                            }}/>
                            : <Skeleton.Image style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                borderRadius: "10px",
                            }} active/>
                    }
                </div>
                <div style={{width: "100%", marginLeft: "0.3rem", marginRight: "1.3rem", height: "100%"}}>
                    <div
                        style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                        <a className="courselink">
                            <div>
                                {
                                    obj ?
                                        <h2 style={{maxWidth: "750px"}}>{obj.name}</h2>
                                        : <Skeleton.Input active/>
                                }
                            </div>
                        </a>
                        {
                            obj ?
                                <Rate allowHalf disabled defaultValue={feedbackrate}/>
                                : <Skeleton.Input active/>
                        }
                    </div>
                    <div>
                        {
                            obj ?
                                <Typography.Paragraph ellipsis={{rows: 4}} style={{maxWidth: "750px"}}>
                                    {obj.description} </Typography.Paragraph>
                                : <Skeleton.Input active/>
                        }
                    </div>
                </div>
            </div>
        </a>
    );
}

export default SearchComponent;