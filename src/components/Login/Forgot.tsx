import {Button, Form, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";

function Forgot({finished, loading, changeType}: { finished: any, loading: boolean, changeType: any }) {
    return (
        <>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={finished}
                size="large"
                validateTrigger=""
            >
                Geben sie Ihre E-mail ein, um Ihr Passwort zurückzusetzen. Sie erhalten anschließend eine E-mail mit einem Link, um Ihr Passwort zurückzusetzen.
                <Form.Item
                    name="email"
                    rules={[
                        {required: true, message: 'Bitte geben Sie Ihre E-mail ein!'},
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="E-mail"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        E-mail senden
                    </Button>
                    oder <a onClick={() => {
                    changeType("login")
                }}>erinnern Sie sich wieder an Ihr Passwort?</a>
                </Form.Item>
            </Form>
        </>
    );
}

export default Forgot;