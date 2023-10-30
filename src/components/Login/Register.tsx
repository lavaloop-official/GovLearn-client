import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

function Register({finished, loading, changeType}: { finished: any, loading: boolean, changeType: any }) {
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
                    rules={[{required: true, message: 'Bitte geben Sie Ihre E-mail ein!'}, {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="E-mail"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Bitte geben sie Ihr Passwort ein!'}]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Passwort"
                    />
                </Form.Item>
                <Form.Item
                    name="password_repeat"
                    rules={[{
                        required: true,
                        message: 'Bitte geben sie Ihr Passwort erneut ein!'
                    }, ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    })]}
                    hasFeedback
                    validateTrigger={"onBlur"}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Passwort wiederholen"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Nach Registrierung angemeldet bleiben</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Registrieren
                    </Button>
                    oder <a onClick={() => {
                    changeType("login")
                }}>haben Sie schon einen Account?</a>
                </Form.Item>
            </Form>
        </>
    );
}

export default Register;