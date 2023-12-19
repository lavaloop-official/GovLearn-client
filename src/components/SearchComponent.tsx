import {Flex, Modal, Rate, Skeleton} from "antd";
import {Course} from "../interfaces.ts";
import Bookmark from "./Bookmark.tsx";

function SearchComponent({obj, editable = false, onDelete = () => {}}: { obj?: Course, editable?: boolean, onDelete?: (id: number | undefined) => void}) {
    
    // TODO: implement handleEdit
    function handleEdit() {
        throw new Error("Function not implemented.");
    }

    // TODO: Integrate Rating
    return (
        <div style={{
            background: "#D9D9D9",
            borderRadius: "20px",
            marginTop: "1rem",
            display: "flex"
        }}>
            <div style={{
                display: "flex",
                position: "relative",
                width: "10rem",
                height: "10rem",
                boxShadow: "2px",
                color: "black",
                margin: "10px",
                flex: "0 0 10rem"
            }}>
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
                    <a className="courselink" href={obj?.id ? `/detail/${obj.id}` : undefined}>
                        <div>
                            {
                                obj ?
                                    <h2 style={{maxWidth: "750px"}}>{obj.name}</h2>
                                    : <Skeleton.Input active/>
                            }
                        </div>
                    </a>
                    <Flex>
                    {
                        obj ?
                            <Rate allowHalf disabled defaultValue={obj.ratingAverage}/>
                            : <Skeleton.Input active/>
                    }
                                    {
                        editable ?
                            <div style={{margin: "0px 10px 0px"}}>
                                <a style={{margin: "4px"}} onClick={handleEdit}><img src="src\assets\editBlue.png" style={{width: "26px"}}/></a>
                                <a style={{margin: "4px"}} onClick={() => onDelete(obj?.id)}><img src="src\assets\delete.png" style={{width: "26px"}}/></a>
                            </div>
                            : <></>
                    }
                    </Flex>
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
    );
}

export default SearchComponent;