import {Button} from "antd";
import {useState} from "react";
import LoginModal from "../components/Login/LoginModal.tsx";

function Landing() {

    //TODO: move state to somewhere else
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true)
        console.log('Success:', values);
        setTimeout(() => {
            setLoading(false)
            setOpen(false)
        }, 3000)


    };

    const onClose = () => {
        setOpen(false)
    }


    return (
        <div>
            <h1>Landing</h1>
            <Button type="primary" onClick={() => {
                setOpen(true)
            }}>Einloggen</Button>
            <Button type="primary" onClick={() => {
                setOpen(true)
            }}>Registrieren</Button>
            <LoginModal open={open} finished={onFinish} close={onClose} loading={loading}/>
        </div>
    )
}

export default Landing