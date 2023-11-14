import { Badge, Card, Rate } from "antd"
import { useState } from "react";

const titlePlaceHolder: string = "Super!!!";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


function Feedback({
    title = titlePlaceHolder,  // Define the default value here
    ribbon
}: {
    title?: string;  // Make the title property optional since it has a default value
    ribbon: string;
}) {
    const [value, setValue] = useState(3);

    const content = (
        <div style={{ height: "120px" }}>
            
            <div style={{ display: "flex", flexDirection: "row"}}>
                <Rate tooltips={desc} onChange={setValue} value={value} />
                <p>{title}</p>
            </div>
        </div>
    );

    const component = <Card>{content}</Card>;

    return (
        <div
            style={{
                maxWidth: "220px",
                maxHeight: "120px",
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                display: "flex",
            }}
        >
            {component}
        </div>
    );
}

export default Feedback;