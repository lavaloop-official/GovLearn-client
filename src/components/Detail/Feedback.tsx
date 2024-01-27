import {Button, Card, Flex, Modal, Radio, RadioChangeEvent, Rate, Space} from "antd"
import {Review} from "../../interfaces.ts";
import {Flag} from "react-bootstrap-icons";
import {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {fetchWrapper} from "../../api/helper.ts";

function Feedback({review}: { review: Review }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        fetchWrapper.post(`api/v1/reports/feedback/${review.feedbackID}`, {
            report_message: reportMessage,
            report_reason: (value - 1)
        }).then(res => {
            console.log(res.messages[0].message);
            if (res.messages[0].message == "success") {
                return success();
            }
        });
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [value, setValue] = useState(1);
    const [reportMessage, setReportMessage] = useState<String>("");

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    const onChangeReportMessage: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setReportMessage(event.target.value);
    }

    const success = () => {
        Modal.success({
            centered: true,
            title: "Meldung erfolgreich!",
            content: 'Ihre Meldung ist erfolgreich bei uns eingegangen und wird schnellstmöglich von uns bearbeitet. Vielen Dank, dass Sie dabei mithelfen unsere Plattform nutzerfreundlich zu halten!',
        });
    };

    const content = (
        <>
            <Card className="antcard feedback" style={{paddingBottom: "0px", paddingTop: "0px"}}>
                <div style={{height: "120px"}}>
                    <Flex style={{width: "100%"}} justify="flex-start">
                        <Flex vertical gap="small" style={{minWidth: "140px"}}>
                            <p style={{fontWeight: "bold"}}> {review.username}</p>
                            <Rate disabled value={review.rating}/>
                        </Flex>
                        <hr/>
                        <Flex vertical align="flex-start" style={{marginLeft: "5px", marginRight: "auto"}}>
                            <p style={{fontWeight: "bold", marginBottom: "0px"}}>{review.title}</p>
                            <p>{review.description}</p>
                        </Flex>
                        <Button danger type="dashed" onClick={showModal} icon={<Flag/>}/>
                    </Flex>
                </div>
            </Card>
            <Modal title="Bewertung melden" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered
                   footer={[
                       <Button key="back" onClick={handleCancel}>
                           Abbrechen
                       </Button>,
                       <Button key="submit" type="primary" onClick={handleOk}>
                           Meldung abschicken
                       </Button>,
                   ]}>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value={1}>Die Bewertung ist Unangemessen.</Radio>
                        <Radio value={2}>Die Bewertung hat keinen Bezug zum Angebot.</Radio>
                        <Radio value={3}>Die Bewertung ist aus einem anderen Grund unangemessen.</Radio>
                    </Space>
                </Radio.Group>
                <br/>
                <br/>
                <TextArea rows={4} placeholder="Warum verstößt diese Bewertung gegen unsere Richtlinien?"
                          onChange={onChangeReportMessage}/>
            </Modal>
        </>

    );

    return (content);
}

export default Feedback;