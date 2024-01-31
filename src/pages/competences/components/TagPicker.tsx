import {Button, InputNumber, Space} from "antd";
import {UserTag} from "../../../constants/interfaces.ts";
import {useState} from "react";
import "./TagPicker.css";
import {fetchWrapper} from "../../../api/helper.ts";

type requestBody = {
    tagId: number | undefined,
    rating: number | undefined
}

function TagPicker({tag}: { tag: UserTag }) {
    const [value, setValue] = useState<number | undefined>(tag.rating);
    const [loading, setLoading] = useState<boolean>(false);
    const request: requestBody[] = [];

    const updateRating = () => {
        setLoading(true);
        request.push({tagId: tag.id, rating: value ?? 0});
        fetchWrapper.post(`api/v1/tags/users`, request)
            .then((res) => {
                console.log(res.message);
            });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (

        <Space style={{
            background: "#F9F9F9",
            borderRadius: "20px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            padding: "10px",
            width: "100%",
            justifyContent: "space-between",
        }}>
            <div className="tag-input">
                <h3>{tag.name}</h3>
                <InputNumber min={0} max={100} value={value}
                             onChange={(value: number | null) => setValue(value ?? undefined)}
                             style={{marginRight: "auto"}}/>
            </div>
            <Button
                type="primary"
                loading={loading}
                onClick={() => {
                    updateRating()
                }}
            >
                Bestätigen
            </Button>
        </Space>
    )
}

export default TagPicker;