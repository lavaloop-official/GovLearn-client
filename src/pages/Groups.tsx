import {Button, Input, Modal} from "antd";
import Groupmember from "../components/Group/Groupmember.tsx";
import Groupadmin from "../components/Group/Groupadmin.tsx";
import { useEffect, useState } from "react";
import MyGroups from "../components/Group/MyGroups.tsx";
import { Group } from "../interfaces.ts";
import TextArea from "antd/es/input/TextArea";
import GroupInvitation from "../components/Group/GroupInvitation.tsx";

function Groups() {

    const [newGroupTitle, setNewGroupTitle] = useState<string>();
    const [newGroupDescription, setNewGroupDescription] = useState<string>();

    const [groups, setGroups] = useState<Group[]>([
        { id: 1, name: "Gruppe 1", description: "Beschreibung 1", admin: false },
        { id: 2, name: "Gruppe 2", description: "Beschreibung 2", admin: true },
    ]);

    const [currentGroup, setCurrentGroup] = useState<Group>(
        {
            id: undefined,
            name: "",
            description: "",
            admin: undefined,
        }
    );
    
    const [groupMembers, setGroupMembers] = useState([
        { name: "Mitglied 1", role: "Admin", Image: "https://www.w3schools.com/howto/img_avatar.png" },
        { name: "Mitglied 2", role: "Member", Image: "https://www.w3schools.com/howto/img_avatar.png" },
    ]); // TODO: Mitglieder in return einbinden

    const [groupInvitations, setGroupInvitations] = useState<Group[]>([
        { id: 1, name: "Gruppe 1 with a very large name", description: "Beschreibung 1", admin:false },
        { id: 2, name: "Gruppe 2 - Test", description: "Beschreibung 2" , admin:false},
    ]);

    const acceptInvitation = (group: Group) => {
        setGroupInvitations(groupInvitations.filter(e => e.id !== group.id));
        setGroups([...groups, group]);
        setCurrentGroup(group);
    }

    const denyInvitation = (group: Group) => {
        setGroupInvitations(groupInvitations.filter(e => e.id !== group.id));
    }

    useEffect(() => {
        setCurrentGroup(groups[0]);
    }, []);

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

    const [isCreateGroupModalOpen, setIsModalOpen] = useState(false);

    const showCreateGroupModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCreateGroupModalOK = () => {
        const newGroup: Group = {id:10, name:newGroupTitle, description:newGroupDescription, admin:true}
        setGroups([...groups, newGroup])
        setCurrentGroup(newGroup);
        console.log(groups)
        handleCancel();
        setIsModalOpen(false);
    };
  
    const handleCreateGroupModalCancel = () => {
      setIsModalOpen(false);
    };

    const updateCreateGroupTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewGroupTitle(e.target.value);
    }

    const updateCreateGroupDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewGroupDescription(e.target.value);
    }

    return (
        <div style={{display:"flex", justifyContent:"center", marginLeft:"25px", marginRight:"25px"}}>
            <div style={{background:"#D9D9D9", width:"fit-content", margin:"25px", borderRadius:"20px", display:"flex", minWidth:"650px", maxWidth:"80%", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                <div style={{background:"lightgrey", width:"250px", margin:"10px", borderRadius:"10px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <div style={{height:"fit-content"}}>
                            <h2 style={{textAlign:"center"}}>Meine Gruppen</h2>
                        </div>
                        {
                            groups ?
                                groups.map((group: Group) => <MyGroups group={group} setCurrentGroup={setCurrentGroup}/>)
                                : <div/>
                        }
                        <Button type="primary" style={{margin:"5px"}} onClick={showModal}>Gruppe hinzufügen</Button>
                        <Modal
                            open={open}
                            title="Gruppe beitreten oder neue Gruppe erstellen."
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                Gruppe beitreten
                            </Button>,
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={showCreateGroupModal}
                            >
                                Neue Gruppe erstellen
                            </Button>,
                            ]}
                        >
                        </Modal>
                        <Modal title="Gruppe erstellen" open={isCreateGroupModalOpen} onOk={handleCreateGroupModalOK} onCancel={handleCreateGroupModalCancel}>
                            <h3>Gruppenname</h3>
                            <Input placeholder="Geben Sie einen Gruppennamen ein..." onChange={updateCreateGroupTitle}/>
                            <h3>Gruppenbeschreibung</h3>
                            <TextArea rows={4} onChange={updateCreateGroupDescription}/>
                        </Modal>
                    </div>
                    <div>
                        <h3 style={{textAlign:"center"}}>Einladungen</h3>
                        <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>
                        {
                            groupInvitations ?
                                groupInvitations.map((group: Group) => <GroupInvitation group={group} acceptInvitation={acceptInvitation} denyInvitation={denyInvitation}/>)
                                : <div/>
                        }
                        </div>
                    </div>
                </div>
                {
                    currentGroup.admin ?
                        <Groupadmin currentGroup={currentGroup}/>
                        : <Groupmember currentGroup={currentGroup}/>
                }
                
            </div>
        </div>
    )
}

export default Groups;