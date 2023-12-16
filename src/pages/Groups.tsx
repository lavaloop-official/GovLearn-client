import {Button, Modal} from "antd";
import Groupmember from "../components/Group/Groupmember.tsx";
import Groupadmin from "../components/Group/Groupadmin.tsx";
import { useState } from "react";
import MyGroups from "../components/Group/MyGroups.tsx";
import NewGroupModal from "../components/Group/NewGroupModal.tsx";

function Groups() {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
  
    const showModal = () => {
      setOpen(true);
    };
  
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };
  
    const handleCancel = () => {
      setOpen(false);
    };

    return (
        <div style={{display:"flex", justifyContent:"center", marginLeft:"25px", marginRight:"25px"}}>
            <div style={{background:"#D9D9D9", width:"fit-content", margin:"25px", borderRadius:"20px", display:"flex", minWidth:"650px", maxWidth:"100%"}}>
                <div style={{background:"lightgrey", width:"250px", margin:"10px", borderRadius:"10px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <div style={{height:"fit-content"}}>
                            <h2 style={{textAlign:"center"}}>Meine Gruppen</h2>
                        </div>
                        <MyGroups name="Testgruppe"/>
                        <Button type="primary" style={{margin:"5px"}} onClick={showModal}>Gruppe hinzufügen</Button>
                        <Modal
                        open={open}
                        title="Title"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                            Gruppe beitreten
                        </Button>,
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={handleOk}
                        >
                            Neue Gruppe erstellen
                        </Button>,
                        ]}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    <NewGroupModal/>
                    </div>
                    <div style={{margin:"5px",background:"grey", borderRadius:"5px", height:"fit-content"}}>
                        <h3 style={{textAlign:"center"}}>Einladungen</h3>
                    </div>
                </div>
                <Groupadmin/>
            </div>
        </div>
    )
}

export default Groups;