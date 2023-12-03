import {Rate, Skeleton} from "antd";
import {Course} from "../interfaces.ts";
import { useNavigate } from "react-router-dom";

function SearchComponent({obj, feedbackrate}: { obj?: Course, feedbackrate?: number }) {

    const navigate = useNavigate();
    
    const handleDetail = () => {
        navigate(`/detail/${obj?.id}`);
      };



    return (
        <a onClick={handleDetail} style={{textDecoration: "none", color: "inherit"}}>
            <div style={{
                width: "1000px",
                background: "#D9D9D9",
                borderRadius: "20px",
                marginTop: "1rem",
                display: "flex"
            }}>
                <div style={{
                    width: "10rem",
                    height: "10rem",
                    boxShadow: "2px",
                    color: "black",
                    margin: "10px",
                    flex: "0 0 10rem"
                }}>
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
                        <div>
                            {
                                obj ?
                                    <h2 style={{maxWidth: "750px"}}>{obj.name}</h2>
                                    : <Skeleton.Input active/>
                            }
                        </div>
                        {
                            obj ?
                                <Rate allowHalf disabled defaultValue={feedbackrate}/>
                                : <Skeleton.Input active/>
                        }
                    </div>
                    <div style={{marginTop: "-20px"}}>
                        {
                            obj ?
                                <p>{obj.description}</p>
                                : <Skeleton.Input active/>
                        }
                    </div>
                </div>
            </div>
        </a>
    );
}

export default SearchComponent;