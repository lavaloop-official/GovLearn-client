import { Button, Flex, InputNumber, Space, Tag } from "antd";
import { UserTag } from "../../interfaces";
import { useState } from "react";
import "./TagPicker.css";
import { fetchWrapper } from "../../api/helper";

type requestBody = {
    tagId: number | undefined,
    rating: number | undefined
}

function TagPicker({tag}: { tag: UserTag }){
    const [value, setValue] = useState<number | undefined>(tag.rating);
    const request: requestBody[] = [];

    const updateRating = () => {
        request.push({tagId: tag.id, rating: value ?? 0});
        fetchWrapper.post(`api/v1/tags/users`, request)
        .then((res) => {
            console.log(res.message);
        });
    }

    return(

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
            <InputNumber min={0} max={100} value={value} onChange={(value: number | null) => setValue(value ?? undefined)} style={{marginRight: "auto"}}/>
        </div>
        <Button
          type="primary"
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