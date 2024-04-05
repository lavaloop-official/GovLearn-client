import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {
    EMAIL_WRONG_FORMAT,
    ENTER_EMAIL,
    ENTER_NAME,
    ENTER_PASSWORD,
    PASSWORD_SHORT,
    REENTER_PASSWORD
} from "../../../../constants/de.ts";


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
                    name="name"
                    rules={[
                        {required: true, message: ENTER_NAME},
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Name"/>
                </Form.Item>
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
                    rules={[{required: true, message: ENTER_PASSWORD}, {min: 8, message: PASSWORD_SHORT}]}
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
                        message: REENTER_PASSWORD
                    }, ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Die Passwörter stimmen nicht überein!'));
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