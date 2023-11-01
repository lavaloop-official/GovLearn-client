import {Alert, Modal} from "antd";

import './LoginModal.css'
import Login from "./Loginbody/Login.tsx";
import Register from "./Loginbody/Register.tsx";
import Forgot from "./Loginbody/Forgot.tsx";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_LOADING, CHANGE_OPEN, CHANGE_TYPE, LoginState, LoginType} from "./Modalstate/actiontypes.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import handleLogin from "../../api/login.ts";

function LoginModal() {

    const type = useSelector((state: LoginState) => state.type as LoginType)
    const open = useSelector((state: LoginState) => state.open as boolean)
    const loading = useSelector((state: LoginState) => state.loading as boolean)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [alert, setAlert] = useState(<> </>)

    const onFinish = async (values: { values: object, type: LoginType }) => {
        dispatch({type: CHANGE_LOADING, payload: true})
        console.log('Success:', values);

        const loginresult = await handleLogin(values)

        if (loginresult.worked) {
            close()
            navigate(loginresult.naviageTo)
        } else {
            dispatch({type: CHANGE_LOADING, payload: false})
            showAlert(loginresult.message)
        }
    };

    const onLogin = async (values: { email: string, password: string, remember: boolean }) => {
        onFinish({values: values, type: "login"})
    }

    const onRegister = async (values: {
        email: string,
        password: string,
        password_repeat: string,
        remember: boolean
    }) => {
        onFinish({values: values, type: "register"})
    }

    const onForgot = async (values: { email: string, type: LoginType }) => {
        console.log('Success:', values);
        //TODO: implement forgot password
    }

    const showAlert = (errormessage: string) => {
        dispatch({type: CHANGE_LOADING, payload: false})
        setAlert(<Alert type="error" message={errormessage}
                        style={{maxWidth: "350px", alignSelf: "center", width: "100%"}}/>)
    }

    const getComponentForType = () => {
        switch (type) {
            case "login":
                return <Login finished={onLogin} loading={loading} changeType={changeType}/>
            case "register":
                return <Register finished={onRegister} loading={loading} changeType={changeType}/>
            case "forgot":
                return <Forgot finished={onForgot} loading={loading} changeType={changeType}/>
        }
    }

    const getTitelForType = () => {
        switch (type) {
            case "login":
                return "Anmelden"
            case "register":
                return "Registrieren"
            case "forgot":
                return "Passwort vergessen"
        }
    }

    const changeType = (type: LoginType) => {
        dispatch({type: CHANGE_TYPE, payload: type})
    }

    const close = () => {
        if (loading)
            return
        dispatch({type: CHANGE_LOADING, payload: false})
        dispatch({type: CHANGE_OPEN, payload: false})
        setAlert(<> </>)
    }

    return (
        <>
            <Modal
                open={open}
                title={getTitelForType()}
                onCancel={close}
                footer={[]}
            >
                <div style={{display: "flex", flexDirection: "column"}}>
                    {alert}
                    {getComponentForType()}
                </div>
            </Modal>
        </>
    );
}

export default LoginModal;