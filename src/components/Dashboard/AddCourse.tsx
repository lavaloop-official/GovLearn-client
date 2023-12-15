import React, { useState } from "react";
import { Button, Flex, Form, Input, Steps, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

interface ToggleProps {
    ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function AddCourse(Props: ToggleProps) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <div style={{ maxWidth: "1200px", minHeight: "860px", margin: "auto", width: "100%", padding: "10px 10px" }}>
            <Steps
                size="small"
                current={0}
                items={[
                    {
                        title: 'Kursdetails festlegen',
                    },
                    {
                        title: 'Tags hinzufügen',
                    },
                    {
                        title: 'Abschluss',
                    },
                ]}
                style={{ margin: "5px" }}
            />
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    background: "#d9d9d9",
                    borderRadius: "20px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    maxWidth: "1200px",
                }}
            >
                <Flex vertical justify="center">
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        /*onFinish={onFinish}
                        onFinishFailed={onFinishFailed}*/
                        autoComplete="off">
                        <h4>Allgemeines</h4>
                        <hr />
                        <Form.Item name="picture" label="Bild">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item name="name" label="Name">
                            <Input width={"100px"} />
                        </Form.Item>
                        <Form.Item name="description" label="Beschreibung">
                            <TextArea />
                        </Form.Item>
                        <h4>Details</h4>
                        <hr />
                        <Form.Item name="duration" label="Dauer">
                            <Input width={"100px"} />
                        </Form.Item>
                        <Form.Item name="price" label="Preis">
                            <Input width={"100px"} />
                        </Form.Item>
                        <Form.Item name="location" label="Ort">
                            <Input width={"100px"} />
                        </Form.Item>    
                        <h4>Links</h4>
                        <hr />
                        <Form.Item name="website" label="Website">
                            <Input width={"100px"} />
                        </Form.Item>
                    </Form>
                </Flex>
                <Flex justify="space-between" style={{margin: "15px"}}><Button onClick={Props.ClickHandler}>Abbrechen</Button><Button>Weiter</Button></Flex>
                
            </div>
        </div>
    )
}

export default AddCourse;

