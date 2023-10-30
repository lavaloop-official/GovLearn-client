import {Modal} from "antd";

import './LoginModal.css'
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import Forgot from "./Forgot.tsx";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_LOADING, CHANGE_OPEN, CHANGE_TYPE} from "./actiontypes.ts";

function LoginModal() {

    const type = useSelector((state: any) => state.type as "login" | "register" | "forgot")
    const open = useSelector((state: any) => state.open as boolean)
    const loading = useSelector((state: any) => state.loading as boolean)
    const dispatch = useDispatch()

    const onFinish = (values: any) => {
        dispatch({type: CHANGE_LOADING, payload: "login"})
        console.log('Success:', values);
        setTimeout(() => {
            dispatch({type: CHANGE_LOADING, payload: "login"})
            dispatch({type: CHANGE_OPEN, payload: false})
        }, 3000)
    };

    const getComponentForType = () => {
        switch (type) {
            case "login":
                return <Login finished={onFinish} loading={loading} changeType={changeType}/>
            case "register":
                return <Register finished={onFinish} loading={loading} changeType={changeType}/>
            case "forgot":
                return <Forgot finished={onFinish} loading={loading} changeType={changeType}/>
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

    const changeType = (type: "login" | "register" | "forgot") => {
        dispatch({type: CHANGE_TYPE, payload: type})
    }

    const close = () => {
        dispatch({type: CHANGE_OPEN, payload: false})
    }

    return (
        <>
            <Modal
                open={open}
                title={getTitelForType()}
                onCancel={close}
                footer={[]}
            >
                <div style={{display: "flex"}}>
                    {getComponentForType()}
                </div>
            </Modal>
        </>
    );
}

export default LoginModal;