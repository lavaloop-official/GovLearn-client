import {Card, Flex, Rate} from "antd"
import {Review} from "../../interfaces.ts";

function Feedback({review}: { review: Review }) {
    const content = (
        <>
            <Card className="antcard feedback" style={{paddingBottom: "0px", paddingTop: "0px"}}>
                <div style={{height: "120px"}}>
                    <Flex style={{width: "75%"}}>
                        <Flex vertical gap="small" style={{minWidth: "140px"}}>
                            <p style={{fontWeight: "bold"}}> {review.userID} (ID nur als placeholder)</p>
                            <Rate disabled value={review.rating}/>
                        </Flex>
                        <hr/>
                        <Flex vertical align="flex-start">
                            <p style={{fontWeight: "bold", marginBottom: "0px"}}>{review.title}</p>
                            <p>{review.description}</p>
                        </Flex>
                    </Flex>
                </div>
            </Card>
        </>

    );

    return (content);
}

export default Feedback;