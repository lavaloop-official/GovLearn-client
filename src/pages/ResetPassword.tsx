import {useEffect, useState} from "react";
import {Alert, Button, Form, Input, Result} from "antd";
import {ENTER_PASSWORD, PASSWORD_SHORT, REENTER_PASSWORD} from "../constants/de.ts";
import {LockOutlined} from "@ant-design/icons";
import {fetchWrapper} from "../api/helper.ts";

function ResetPassword() {
    const [token, setToken] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const token = window.location.pathname.split("/").pop()
        if (token)
            setToken(atob(token))
    }, [])

    const onFinish = (values: { password: string, password_repeat: string }) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        fetchWrapper.put("api/v1/users/reset", {token: token, password: values.password}, false).then((res) => {

            if (res?.messages?.[0]?.message == "success") {
                setLoading(false)
                setSuccess(true)
            }
            setError("Etwas ist schief gelaufen. Bitte versuchen Sie es später erneut.")
            setLoading(false)
        })
    }

    return (
        <>
            {success ? <Result
                    status="success"
                    title="Ihr Passwort wurde erfolgreich zurückgesetzt."
                    subTitle="Sie können sich nun mit Ihrem neuen Passwort anmelden."
                    extra={[
                        <Button type="primary" key="console" href={"/"}>
                            Zurück zur Startseite
                        </Button>
                    ]}
                /> :
                <div style={{margin: "auto", display: "flex", justifyContent: "center", marginTop: "20px"}}>
                    <div style={{
                        background: "#d9d9d9",
                        display: "inline-block",
                        borderRadius: "10px",
                        padding: "15px"
                    }}>
                        <div style={{margin: "auto", textAlign: "center", display: "inline-block", minWidth: "400px"}}>
                            <h1>Passwort zurücksetzen</h1>
                            <p>Bitte geben Sie ein neues Passwort ein.</p>
                        </div>

                        <Form
                            name="normal_login"
                            className="login-form"
                            size="large"
                            validateTrigger="onSubmit"
                            onFinish={onFinish}>
                            {error != "" ? <Alert type="error" message={error}
                                                  style={{maxWidth: "350px", marginBottom: "24px"}}/> : <></>}
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
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                        loading={loading}>
                                    Neues Passwort speichern
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>}
        </>
    );
}

export default ResetPassword;