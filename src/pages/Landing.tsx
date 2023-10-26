import {Button, Checkbox, Form, Input, Modal} from "antd";
import {useState} from "react";

function Landing() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("Einloggen");
    const [href, setHref] = useState("/register");

    const showModal = (name: string) => {
        setIsModalOpen(true);
        setModalTitle(name);
        if (name === "Einloggen") {
            setHref("/discover");
        } else {
            setHref("/register");
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    return (
        <div>
            <h1>Landing</h1>
            <Button type="primary" onClick={() => {showModal("Einloggen")}}>Einloggen</Button>
            <Button type="primary" onClick={() => {showModal("Registrieren")}}>Registrieren</Button>
            <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" href={href}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Landing