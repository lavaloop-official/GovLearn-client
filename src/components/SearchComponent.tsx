import {Button, Rate, Skeleton, Typography} from "antd";
import {Course} from "../interfaces.ts";
import Bookmark from "./Bookmark.tsx";
import {useNavigate} from "react-router-dom";
import './SearchComponent.css';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


/**
 * SearchComponent is a React component that displays a course in a search result format.
 * The component supports editing and deleting the course if the editable prop is true.
 *
 * @param Course obj - The course to be displayed.
 * @param onDelete callback for deleting the course
 */
function SearchComponent({obj, editable = false, onDelete = () => {}}: { obj?: Course, editable?: boolean, onDelete?: (id: number | undefined) => void}) {

    const navigate = useNavigate();

    // Handles the click event on the course, navigating to the course detail page.
    const handleClick = (event: any) => {
        // Prevents the click event from firing when the user clicks on the bookmark or edit buttons.
        if (event.target.className && (event.target.className.includes("bookmark-outer") || event.target.className.includes("edit-button")))
            return;
        if (obj && obj.id)
            navigate(`/detail/${obj.id}`, {state: {obj: obj}});
    }

    // TODO: implement handleEdit
    function handleEdit() {
        navigate(`/dashboard/add/details`, {state: {obj: obj}})
    }

    return (
        <a>
            <div className="search-outer" onClick={handleClick}>
                <div className="search-picture">
                    {obj?.id ? <Bookmark id={obj.id}/> : <></>}
                    {
                        obj ?
                            <img src={obj.image} alt="Image of searchresult"/>
                            : <Skeleton.Image style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                borderRadius: "10px",
                            }} active/>
                    }
                </div>
                <div className="search-content">
                    <div className="search-header">
                        {
                            obj ?
                                <h2 className="search-title">{obj.name}</h2>
                                : <Skeleton.Input active/>
                        }
                        {
                            obj ?
                                <Rate allowHalf disabled defaultValue={obj.ratingAverage}/>
                                : <Skeleton.Input active/>
                        }
                    </div>
                    {
                        obj ?
                            <Typography.Paragraph ellipsis={{rows: 4}} style={{maxWidth: "750px"}}>
                                {obj.description} </Typography.Paragraph>
                            : <Skeleton.Input active/>
                    }
                </div>
                {
                    editable ?
                        <div className="edit">
                            <Button className="edit-button"
                                    icon={<EditOutlined/>}
                                    size="large"
                                    type={"primary"}
                                    onClick={handleEdit}/>
                            <Button className="edit-button"
                                    danger
                                    icon={<DeleteOutlined/>}
                                    size="large"
                                    type={"primary"}
                                    onClick={() => onDelete(obj?.id)}/>
                        </div>
                        : <></>
                }
            </div>
        </a>
    );
}

export default SearchComponent;