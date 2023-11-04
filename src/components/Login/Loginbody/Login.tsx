import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {EMAIL_WRONG_FORMAT, ENTER_EMAIL, ENTER_PASSWORD} from "../../../constants/de.ts";
import {LoginType} from "../../../state/modalslice.ts";

function Login({finished, loading, changeType}: {
    finished: (values: { email: string, password: string, remember: boolean }) => void,
    loading: boolean,
    changeType: (a: LoginType) => void
}) {
    return (
        <>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={finished}
                size="large"
                validateTrigger="onSubmit">
                <Form.Item
                    name="email"
                    rules={[
                        {required: true, message: ENTER_EMAIL},
                        {type: 'email', message: EMAIL_WRONG_FORMAT}
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="E-mail"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: ENTER_PASSWORD}]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Passwort"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Angemeldet bleiben</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" onClick={() => {
                        changeType("forgot")
                    }}>
                        Passwort vergessen?
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Anmelden
                    </Button>
                    oder <a onClick={() => {
                    changeType("register")
                }}>registrieren Sie sich jetzt!</a>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login