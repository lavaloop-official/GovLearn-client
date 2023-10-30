import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

function Login({finished, loading, changeType}: { finished: any, loading: boolean, changeType: any }) {
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
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Bitte geben Sie Ihre E-mail ein!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="E-mail"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Bitte geben sie Ihr Passwort ein!'}]}
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