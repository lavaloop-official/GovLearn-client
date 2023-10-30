import {Button} from "antd";
import LoginModal from "../components/Login/LoginModal.tsx";
import {useDispatch} from "react-redux";
import {CHANGE_LOADING, CHANGE_OPEN, CHANGE_TYPE} from "../components/Login/actiontypes.ts";

function Landing() {

    const dispatch = useDispatch()

    const openModal = (type: "login" | "register" | "forgot") => {
        dispatch({type: CHANGE_LOADING, payload: false})
        dispatch({type: CHANGE_TYPE, payload: type})
        dispatch({type: CHANGE_OPEN, payload: true})
    }


    return (
        <div>
            <h1>Landing</h1>
            <Button type="primary" onClick={() => {
                openModal("login")
            }}>Einloggen</Button>
            <Button type="primary" onClick={() => {
                openModal("register")
            }}>Registrieren</Button>
            <LoginModal/>
        </div>
    )
}

export default Landing