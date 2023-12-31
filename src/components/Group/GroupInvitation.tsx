import { Button, Modal } from "antd";
import { QuestionLg, XLg } from "react-bootstrap-icons";
import {GroupInvitationWsTo } from "../../interfaces";
import "./GroupmemberCourses.css";
import { useState } from "react";

function GroupInvitation({group, acceptInvitation, denyInvitation}:{group:GroupInvitationWsTo, acceptInvitation: (group: GroupInvitationWsTo) => void, denyInvitation: (group: GroupInvitationWsTo) => void}) {

    const onAcceptInvitation=()=>{
        acceptInvitation(group);
    }

    const onDenyInvitation=()=>{
        denyInvitation(group);
    }

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            onAcceptInvitation();
            setLoading(false);
            setOpen(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div style={{background:"grey", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderRadius:"10px"}}>
            <p style={{color:"white", fontSize:"18px", margin:"10px", overflow:"auto", whiteSpace:"nowrap"}} className="scrollbar">{group.groupName}</p>
            <div style={{marginRight:"5px", display:"flex", gap:"5px", justifyContent:"right"}}>
                <Button onClick={onDenyInvitation} icon={<XLg/>}></Button>
                <Button onClick={showModal} icon={<QuestionLg/>}></Button>
            </div>
            <Modal
                open={open}
                title={"Gruppe beitreten - " + group.groupName}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" loading={loading} onClick={handleCancel}>
                        Abbrechen
                    </Button>,
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Gruppe beitreten
                    </Button>,
                ]}
            >
                <p>{group.groupDescription}</p>
            </Modal>
        </div>
    )
}

export default GroupInvitation;