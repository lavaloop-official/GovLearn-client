import { Badge, Card, Flex, Rate } from "antd"
import { useState } from "react";

const titlePlaceHolder: string = "Super!!!";

function Feedback({
    title = "",
    description = null,
    rating = undefined,
    userName = null
}: {
    title: string | null;  // Make the title property optional since it has a default value
    description: string | null;
    rating: number | undefined;
    userName: string | number | null;
}) {
    const content = (
        <div style={{ height: "120px" }}>
            <Flex style={{ width: "75%" }}>
                <Flex vertical gap="small">
                    <p style={{ fontWeight: "bold" }}>{userName}</p>
                    <Rate disabled value={rating} />
                </Flex>
                <hr />
                <Flex vertical align="flex-start">
                    <p style={{ fontWeight: "bold", marginBottom: "0px" }}>{title}</p>
                    <br />
                    <p>{description}</p>
                </Flex>
            </Flex>
        </div>
    );

    return (
        <Card>{content}</Card>
    );
}

export default Feedback;