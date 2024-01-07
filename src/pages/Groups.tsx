import { Button, Empty, Input, Modal } from "antd";
import Groupmember from "../components/Group/Groupmember.tsx";
import Groupadmin from "../components/Group/Groupadmin.tsx";
import { useEffect, useState } from "react";
import MyGroups from "../components/Group/MyGroups.tsx";
import { Group, GroupCreationWsTo, GroupInvitationWsTo } from "../interfaces.ts";
import TextArea from "antd/es/input/TextArea";
import GroupInvitation from "../components/Group/GroupInvitation.tsx";
import { fetchWrapper } from "../api/helper.ts";
import { Role } from "../Enum.ts";
import { NO_GROUPS } from "../constants/de.ts";

function Groups() {

    const [newGroupTitle, setNewGroupTitle] = useState<string>();
    const [newGroupDescription, setNewGroupDescription] = useState<string>();

    const [groups, setGroups] = useState<Group[]>([]);

    const [currentGroup, setCurrentGroup] = useState<Group>();

    const [groupInvitations, setGroupInvitations] = useState<GroupInvitationWsTo[]>([]);

    const acceptInvitation = (group: GroupInvitationWsTo) => {
        let acceptGroup = { invitationId: group.invitationId, accept: true }
        setGroupInvitations(groupInvitations.filter(e => e.invitationId !== acceptGroup.invitationId))
        const acceptedInvitation = fetchWrapper.put(`api/v1/groups/invitations`, acceptGroup).then((res) => {
            console.log(res.message);
        })
        Promise.all([acceptedInvitation]).then(() => {
            handleFetchingOfAllGroups();
        })
    }

    const denyInvitation = (group: GroupInvitationWsTo) => {
        let denyGroup = { invitationId: group.invitationId, accept: false }
        setGroupInvitations(groupInvitations.filter(e => e.invitationId !== denyGroup.invitationId))
        fetchWrapper.put(`api/v1/groups/invitations`, denyGroup).then((res) => {
            console.log(res.message);
        })
    }

    useEffect(() => {
        fetchWrapper.get(`api/v1/groups`).then((res) => {
            setGroups(res.payload);
            setCurrentGroup(res.payload[0]);
        });
        fetchWrapper.get(`api/v1/groups/invitations`).then((res) => {
            setGroupInvitations(res.payload)
        });
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

    const removeCurrentGroup = (group: Group) => {
        const removedGroup = fetchWrapper.delete(`api/v1/groups/remove/group/${group.groupId}`).then(res => {
            console.log(res.message)
        });
        Promise.all([removedGroup]).then(() => {
            handleFetchingOfAllGroups();
        })
    }

    const handleFetchingOfAllGroups = () => {
        let groups:Group[]=[];
        const fetchedGroups = fetchWrapper.get(`api/v1/groups`).then((res) => {
            setGroups(res.payload);
            groups = res.payload;
        })
        Promise.all([fetchedGroups]).then(() => {
            if (groups.length == 0)
                setCurrentGroup(undefined);
            else
                setCurrentGroup(groups[0]);
        })
    }

    const handleCreateGroupModalOK = () => {
        const newGroup: GroupCreationWsTo = { groupName: newGroupTitle, groupDescription: newGroupDescription };
        const postedGroup = fetchWrapper.post(`api/v1/groups`, newGroup).then((res) => {
            console.log(res.message)
        })
        Promise.all([postedGroup]).then(() => {
            handleFetchingOfAllGroups();
        })
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
        <div style={{ display: "flex", justifyContent: "center", marginLeft: "25px", marginRight: "25px", color:"#3F3F3F"}}>
            <div style={{ background: "#F9F9F9", width: "1200px", margin: "25px", borderRadius: "20px", display: "flex", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <div style={{ background: "#F4F4F4", width: "250px", margin: "10px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ height: "fit-content" }}>
                            <h2 style={{ textAlign: "center" }}>Meine Gruppen</h2>
                        </div>
                        {
                            groups ?
                                groups.map((group: Group) => <MyGroups group={group} setCurrentGroup={setCurrentGroup} selected={currentGroup?.groupId == group.groupId} />)
                                : <div />
                        }
                        <Button type="primary" style={{ margin: "5px" }} onClick={showModal}>Gruppe hinzufügen</Button>
                        <Modal
                            open={open}
                            title="Gruppe beitreten oder neue Gruppe erstellen."
                            onOk={handleOk}
                            onCancel={handleCancel}
                            okText="Bestätigen" 
                            cancelText="Abbrechen"
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
                        <Modal title="Gruppe erstellen" open={isCreateGroupModalOpen} onOk={handleCreateGroupModalOK} onCancel={handleCreateGroupModalCancel} okText="Bestätigen" cancelText="Abbrechen">
                            <h3>Gruppenname</h3>
                            <Input placeholder="Geben Sie einen Gruppennamen ein..." onChange={updateCreateGroupTitle} />
                            <h3>Gruppenbeschreibung</h3>
                            <TextArea rows={4} onChange={updateCreateGroupDescription} />
                        </Modal>
                    </div>
                    <div>
                        <h3 style={{ textAlign: "center" }}>Einladungen</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            {
                                groupInvitations && groupInvitations.length>0 ?
                                groupInvitations.map((group: GroupInvitationWsTo) => <GroupInvitation group={group} acceptInvitation={acceptInvitation} denyInvitation={denyInvitation} />)
                                    : <p style={{alignSelf:"center"}}>Keine offenen Einladungen</p>
                            }
                        </div>
                    </div>
                </div>
                {
                    currentGroup != undefined ?
                        currentGroup!.role == Role.Admin ?
                            <Groupadmin currentGroup={currentGroup!} removeCurrentGroup={removeCurrentGroup} handleFetchingOfAllGroups={handleFetchingOfAllGroups} />
                            : <Groupmember currentGroup={currentGroup!} fetchAllGroups={handleFetchingOfAllGroups} />
                        : <Empty style={{ marginTop: "100px", marginBottom: "100px", marginLeft: "75px" }} description={NO_GROUPS} />
                }

            </div>
        </div>
    )
}

export default Groups;