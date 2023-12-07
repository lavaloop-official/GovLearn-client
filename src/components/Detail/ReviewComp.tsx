import {Button, Card, Flex, Form, Input, Rate} from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../../api/helper.ts";
import TextArea from "antd/es/input/TextArea";

/**
 * Component to display and edit a review
 * @param id ID of the course to display the review for
 */
function ReviewComp({id}: { id?: number }) {

    const [review, setReview] = useState<{ title: string, description: string, rating: number, id: number }>()
    const [editing, setEditing] = useState<boolean>(false)

    useEffect(() => {
        if (!id)
            return
        fetchWrapper.get(`api/v1/feedback/course/${id}`).then((res) => {
            if (res.payload.length != 0) {
                const feedback = res.payload[0]
                setReview({
                    title: feedback.title,
                    description: feedback.description,
                    rating: feedback.rating,
                    id: feedback.feedbackID
                })
            }
        })
    }, [id]);

    const onFinish = async (values: { rating: number, title: string, description: string }) => {
        if (!review)
            await fetchWrapper.post(`api/v1/feedback`, {...values, courseID: id})
        else
            await fetchWrapper.put(`api/v1/feedback`, {...values, feedbackID: review.id})
        await fetchWrapper.get(`api/v1/feedback/course/${id}`).then((res) => {
            if (res.payload.length != 0) {
                const feedback = res.payload[0]
                setReview({
                    title: feedback.title,
                    description: feedback.description,
                    rating: feedback.rating,
                    id: feedback.feedbackID
                })
            }
        })
        setEditing(false)
    };

    const deleteReview = () => {
        fetchWrapper.delete(`api/v1/feedback/${review?.id}`)
        setReview(undefined)
    }

    const content = () => {
        if (editing) {
            return (
                <>
                    <p style={{fontWeight: "bold"}}>Bewertung abgeben</p>
                    <Form layout="vertical" onFinish={onFinish} initialValues={{
                        rating: review?.rating,
                        title: review?.title || "",
                        description: review?.description || "",
                    }}>
                        <Form.Item name="rating" rules={[{required: true, message: "Bitte wählen Sie 1-5 Sterne aus"}]}>
                            <Rate/>
                        </Form.Item>
                        <Form.Item name="title">
                            <Input placeholder="Titel (optional)"/>
                        </Form.Item>
                        <Form.Item name="description">
                            <TextArea rows={4} placeholder="Ausführliche Bewertung (optional)"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" icon={<EditOutlined/>} htmlType={"submit"}>Bewertung
                                abgeben</Button>
                        </Form.Item>
                    </Form>
                </>
            )
        } else {
            if (review) {
                return (
                    <>
                        <h3>Ihre Bewertung:</h3>
                        <Rate disabled value={review.rating}/>
                        <p style={{fontWeight: "bold"}}>{review.title}</p>
                        <p>{review.description}</p>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            position: "absolute",
                            top: "40px",
                            right: "10px"
                        }}>
                            <Button icon={<EditOutlined/>} onClick={() => setEditing(true)}/>
                            <Button danger icon={<DeleteOutlined/>} onClick={() => deleteReview()}/>
                        </div>
                    </>

                )
            } else {
                return (
                    <Flex vertical gap="middle" justify="space-around" align="center">
                        <p style={{fontWeight: "bold"}}>Füge eine Bewertung hinzu!</p>
                        <Button type="primary" icon={<EditOutlined/>} onClick={() => setEditing(true)}>
                            Bewertung abgeben
                        </Button>
                    </Flex>
                )
            }

        }
    }


    return (
        <>
            <Card className="antcard author" style={{margin: "5px", width: "70%"}}>
                {content()}
            </Card>
        </>
    );
}

export default ReviewComp;