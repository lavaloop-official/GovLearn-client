import {Button} from "antd";
import LoginModal from "../components/Login/LoginModal.tsx";
import openModal from "../components/Login/util.ts";

function Landing() {



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