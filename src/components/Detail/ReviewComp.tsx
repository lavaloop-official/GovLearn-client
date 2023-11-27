import {Button, Card, Flex, Form, Input, Rate} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../../api/helper.ts";
import TextArea from "antd/es/input/TextArea";

function ReviewComp({id}: { id?: number }) {

    const [review, setReview] = useState<{ title: string, description: string, rating: number }>()
    const [editing, setEditing] = useState<boolean>(false)
    const [feedbackID, setFeedbackID] = useState<number>()

    useEffect(() => {
        if (!id)
            return
        fetchWrapper.get(`api/v1/feedback/course/${id}`).then((res) => {
            console.log(res);
            if (res.payload.length != 0) {
                const feedback = res.payload[0]
                setFeedbackID(feedback.feedbackID)
                setReview({title: feedback.title, description: feedback.description, rating: feedback.rating})
            }
        })
    }, [id]);

    const sendFeedback = async (values: object | undefined) => {
        console.log(feedbackID)
        if (!feedbackID)
            await fetchWrapper.post(`api/v1/feedback`, {...values, courseID: id})
        else
            await fetchWrapper.put(`api/v1/feedback`, {...values, feedbackID: feedbackID})
        fetchWrapper.get(`api/v1/feedback/course/${id}`).then((res) => {
            if (res.payload.length != 0) {
                setFeedbackID(res.payload[0].feedbackID)
            }
        })
    };

    const onFinish = (values: { rating: number, title: string, description: string }) => {
        console.log('Success:', values);
        setReview({
            rating: values.rating,
            title: values.title,
            description: values.description,
        })
        sendFeedback(values).then(() => setEditing(false))

    };

    const deleteReview = () => {
        setReview(undefined)
        fetchWrapper.delete(`api/v1/feedback/${feedbackID}`)
        setFeedbackID(undefined)
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
                        <p style={{fontWeight: "bold"}}>{review.title}</p>
                        <Button type="primary" icon={<EditOutlined/>} onClick={() => setEditing(true)}>
                            Ihre Bewertung ändern
                        </Button>
                        <Button type="primary" icon={<EditOutlined/>} onClick={() => deleteReview()}>
                            Ihre Bewertung löschen
                        </Button>
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