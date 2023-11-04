import {Alert, Modal} from "antd";
import './LoginModal.css'
import Login from "./Loginbody/Login.tsx";
import Register from "./Loginbody/Register.tsx";
import Forgot from "./Loginbody/Forgot.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import handleLogin from "../../api/login.ts";
import {closeModal, changeAlert, changeLoading, changeType, LoginType} from "../../state/modalslice.ts";
import {RootState} from "../../state/reduxStore.ts";

function LoginModal() {
    const {type, open, loading, alert} = useSelector((state: RootState) => state.loginModal)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    /**
     * Called when the user clicks the submit button
     * @param values
     */
    const onFinish = async (values: {
        values: { email: string, password: string, remember: boolean },
        type: LoginType
    }) => {

        dispatch(changeLoading(true))
        try {
            const nav = await handleLogin(values)
            close()
            navigate(nav)
        } catch (e: unknown) {
            dispatch(changeLoading(false))
            if (e instanceof Error)
                dispatch(changeAlert(e.message))
        }
    };

    /**
     * Called when the user clicks the submit button on the login form
     * @param values
     */
    const onLogin = async (values: { email: string, password: string, remember: boolean }) => {
        onFinish({values: values, type: "login"})
    }

    /**
     * Called when the user clicks the submit button on the register form
     * @param values
     */
    const onRegister = async (values: {
        email: string,
        password: string,
        password_repeat?: string,
        remember: boolean
    }) => {
        delete values.password_repeat
        onFinish({values: values, type: "register"})
    }

    /**
     * Called when the user clicks the submit button on the forgot password form
     * @param values
     */
    const onForgot = async (values: { email: string, type: LoginType }) => {
        console.log('Success:', values);
        //TODO: implement forgot password
    }

    /**
     * Changes the type of the login modal
     * @param type
     */
    const changeModalType = (type: LoginType) => {
        dispatch(changeType(type))
    }

    const close = () => {
        dispatch(closeModal())
    }

    /**
     * Returns the component for the login modal based on the type
     */
    const getComponentForType = () => {
        switch (type) {
            case "login":
                return <Login finished={onLogin} loading={loading} changeType={changeModalType}/>
            case "register":
                return <Register finished={onRegister} loading={loading} changeType={changeModalType}/>
            case "forgot":
                return <Forgot finished={onForgot} loading={loading} changeType={changeModalType}/>
        }
    }

    /**
     * Returns the title for the login modal based on the type
     */
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

    return (
        <>
            <Modal
                open={open}
                title={getTitelForType()}
                onCancel={close}
                footer={[]}
            >
                <div style={{display: "flex", flexDirection: "column"}}>
                    {alert == "" ? <></> : <Alert type="error" message={alert}
                                                  style={{maxWidth: "350px", alignSelf: "center", width: "100%"}}/>}
                    {getComponentForType()}
                </div>
            </Modal>
        </>
    );
}

export default LoginModal;