import {Modal} from "antd";
import {MouseEventHandler, useState} from "react";

import './LoginModal.css'
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import Forgot from "./Forgot.tsx";

function LoginModal({open, finished, close, loading}: { open: boolean, close: MouseEventHandler<HTMLElement>, finished: any, loading: boolean}) {

    //TODO: move state to somewhere else
    const [type, setType] = useState<"login" | "register" | "forgot">("login")

    const getComponentForType = () => {
        switch (type) {
            case "login":
                return <Login finished={finished} loading={loading} changeType={changeType}/>
            case "register":
                return <Register finished={finished} loading={loading} changeType={changeType}/>
            case "forgot":
                return <Forgot finished={finished} loading={loading} changeType={changeType}/>
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
        setType(type)
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