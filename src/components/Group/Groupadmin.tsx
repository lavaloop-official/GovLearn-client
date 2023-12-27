import { Badge, Button, Divider, Input, Modal } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Group, GroupCreationWsTo, GroupEditWsTo, Groupmember } from "../../interfaces";
import { createRef, useEffect, useState } from "react";
import { Pen, PenFill, Plus, Trash } from "react-bootstrap-icons";
import Groupuser from "./Groupuser";
import InviteGroupmember from "./InviteGroupmember";
import { fetchWrapper } from "../../api/helper";
import TextArea from "antd/es/input/TextArea";

function Groupadmin({ currentGroup, removeCurrentGroup, handleFetchingOfAllGroups }: { currentGroup: Group, removeCurrentGroup: (group: Group) => void, handleFetchingOfAllGroups: () => void }) {

    const [editGroupTitle, setEditGroupTitle] = useState<string>();
    const [editGroupDescription, setEditGroupDescription] = useState<string>();
    const [isEditGroupModalOpen, setIsModalOpen] = useState(false);

    const updateEditGroupTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditGroupTitle(e.target.value);
    }

    const updateEditGroupDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditGroupDescription(e.target.value);
    }

    const handleEditGroupModalOK = () => {
        const editGroup: GroupEditWsTo = { groupId: currentGroup.groupId, groupName: editGroupTitle, groupDescription: editGroupDescription };
        const groupchanged = fetchWrapper.put(`api/v1/groups`, editGroup).then((res) => {
            console.log(res.message)
        });
        Promise.all([groupchanged]).then(() => {
            handleFetchingOfAllGroups();
            currentGroup.groupName = editGroupTitle;
            currentGroup.groupDescription = editGroupDescription;
        });
        setIsModalOpen(false);
    };

    const handleEditGroupModalCancel = () => {
        setIsModalOpen(false);
    };

    const showEditGroupModal = () => {
        setIsModalOpen(true);
    };

    const inviteGroupmemberModal = createRef();

    const [groupmember, setGroupmember] = useState<Groupmember[]>([]);

    const removeUserFromGroup = (groupmem: Groupmember) => {
        const removedUserFromGroup = fetchWrapper.delete(`api/v1/groups/${groupmem.memberId}`).then(res => {
            console.log(res.message);
        })
        Promise.all([removedUserFromGroup]).then(() => fetchAllGroupMembers());
    }

    const fetchAllGroupMembers = () => {
        fetchWrapper.get(`api/v1/groups/${currentGroup.groupId}/members`).then(res => {
            setGroupmember(res.payload);
        });
    }

    useEffect(() => {
        fetchAllGroupMembers();
    }, [currentGroup])

    const [openDeleteCourseModal, setIsDeleteModalOpen] = useState(false);

    const showDeleteGroupModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteGroupModalOK = () => {
        removeCurrentGroup(currentGroup);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteGroupModalCancel = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div style={{ background: "lightgrey", flex: "1", margin: "10px", borderRadius: "10px", display: "flex", flexDirection: "column", minWidth: "280px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ margin: "0px 10px 0px 10px" }}>
                    <h1>{currentGroup.groupName}</h1>
                </div>
                <div style={{ margin: "0px 10px 0px 10px" }}>
                    <Button style={{ margin: "0px 10px 0px 10px" }} type="text" shape="circle" size="large" icon={<Pen color="white" size={28} onClick={showEditGroupModal}></Pen>}></Button>
                    <Button type="text" shape="circle" size="large" icon={<Trash color="white" size={28} onClick={showDeleteGroupModal}></Trash>}></Button>
                </div>
                <Modal title="Möchten Sie wirklich diese Gruppe löschen?" open={openDeleteCourseModal} onOk={handleDeleteGroupModalOK} onCancel={handleDeleteGroupModalCancel}>
                    <p>Die Gruppe wird unwiderruflich gelöscht.</p>
                </Modal>
                <Modal title="Gruppe bearbeiten" open={isEditGroupModalOpen} onOk={handleEditGroupModalOK} onCancel={handleEditGroupModalCancel}>
                    <h3>Gruppenname</h3>
                    <Input placeholder="Geben Sie einen Gruppennamen ein..." onChange={updateEditGroupTitle} />
                    <h3>Gruppenbeschreibung</h3>
                    <TextArea rows={4} onChange={updateEditGroupDescription} />
                </Modal>
            </div>
            <div style={{ margin: "0px 10px 0px 10px" }}>
                <p>{currentGroup.groupDescription}</p>
            </div>
            <InviteGroupmember groupId={currentGroup.groupId} ref={inviteGroupmemberModal}></InviteGroupmember>
            <div style={{ margin: "0px 10px 0px 10px", display: "flex", flexDirection: "column" }}>
                <h3>Gruppenmitglieder</h3>
                <div style={{ overflow: "scroll", borderRadius: "10px" }} className="scrollbar">
                    <div style={{ background: "grey", borderRadius: "10px", height: "100px", display: "flex", flexDirection: "row", alignItems: "center", gap: "0px", paddingLeft: "10px", paddingRight: "10px", width: "fit-content" }} className="scrollbar">
                        {
                            groupmember ?
                                groupmember.map((groupmember: Groupmember) =>
                                    <Groupuser admin={true} groupmember={groupmember} removeUserFromGroup={removeUserFromGroup} />)
                                : <div />
                        }
                        <Button onClick={() => inviteGroupmemberModal?.current?.openDialog()} style={{ height: "fit-content", width: "fit-content" }} icon={<Plus style={{ color: "white", height: "100%", width: "50px", marginRight: "15px", marginLeft: "15px" }} />} type="text" />
                    </div>
                </div>
            </div>
            <div style={{ margin: "0px 10px 0px 10px", display: "flex", flexDirection: "column" }}>
                <h3>Gruppenverwaltung</h3>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Button>Mitglieder hinzufügen</Button>
                    <Button>Mitglieder entfernen</Button>
                </div>
                <Divider />
            </div>
            {
                groupmember ?
                    groupmember.map((groupmember: Groupmember) =>
                        <GroupmemberCourses groupmember={groupmember} admin={true} />)
                    : <div />
            }
        </div>
    )
}

export default Groupadmin;