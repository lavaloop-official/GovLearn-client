import {Button, Modal, Rate, Skeleton, Typography} from "antd";
import {Course} from "../interfaces.ts";
import Bookmark from "./Bookmark.tsx";
import {useNavigate} from "react-router-dom";
import './SearchComponent.css';
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {fetchWrapper} from "../api/helper.ts";
import {DELETE_COURSE} from "../constants/de.ts";

function SearchComponent({obj, editable}: { obj?: Course, editable?: boolean }) {
    const {confirm} = Modal;

    const navigate = useNavigate();

    const handleClick = (event: any) => {
        if (event.target.className && (event.target.className.includes("bookmark-outer") || event.target.className.includes("edit-button")))
            return;
        if (obj && obj.id)
            navigate(`/detail/${obj.id}`, {state: {obj: obj}});
    }

    function handleEdit() {
        throw new Error("Function not implemented.");
    }

    function handleDelete() {
        confirm({
            title: DELETE_COURSE,
            icon: <ExclamationCircleFilled/>,
            content: 'Dieser Kurs wird unwiderruflich gelöscht.',
            okText: 'Ja',
            okType: 'danger',
            cancelText: 'Nein',
            onOk() {
                fetchWrapper.delete('api/v1/courses/' + obj?.id).then((res) => {
                    if (res.success) {
                        window.location.reload();
                    }
                });
            }
        });
    }

    // TODO: Integrate Rating
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
                                    onClick={handleDelete}/>
                        </div>
                        : <></>
                }
            </div>
        </a>
    );
}

export default SearchComponent;