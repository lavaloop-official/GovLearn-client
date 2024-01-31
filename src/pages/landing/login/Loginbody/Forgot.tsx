import {Button, Form, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {EMAIL_WRONG_FORMAT, ENTER_EMAIL, FORGOT_EXPLAIN_TEXT} from "../../../../constants/de.ts";

function Forgot({finished, loading, changeType}: { finished: any, loading: boolean, changeType: any }) {
    return (
        <>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={finished}
                size="large"
                validateTrigger="onSubmit"
            >
                {FORGOT_EXPLAIN_TEXT}
                <Form.Item
                    name="email"
                    rules={[
                        {required: true, message: ENTER_EMAIL},
                        {type: 'email', message: EMAIL_WRONG_FORMAT}
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