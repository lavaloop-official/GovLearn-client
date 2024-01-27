import {Button, Divider, Input, Modal} from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import {Group, GroupEditWsTo, Groupmember} from "../../interfaces";
import {createRef, useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import Groupuser from "./Groupuser";
import InviteGroupmember from "./InviteGroupmember";
import {fetchWrapper} from "../../api/helper";
import TextArea from "antd/es/input/TextArea";
import {RoleEnum} from "../../Enum";

function Groupadmin({currentGroup, removeCurrentGroup, handleFetchingOfAllGroups}: {
    currentGroup: Group,
    removeCurrentGroup: (group: Group) => void,
    handleFetchingOfAllGroups: () => void
}) {

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
        const editGroup: GroupEditWsTo = {
            groupId: currentGroup.groupId,
            groupName: editGroupTitle,
            groupDescription: editGroupDescription
        };
        const groupchanged = fetchWrapper.put(`api/v1/groups`, editGroup).then((res) => {
            console.log(res.messages[0].message)
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
        if (groupmem.role != RoleEnum.Invited) {
            const removedUserFromGroup = fetchWrapper.delete(`api/v1/groups/members/${groupmem.memberId}`).then(res => {
                console.log(res.messages[0].message);
            })
            Promise.all([removedUserFromGroup]).then(() => fetchAllGroupMembers());
        } else {
            const removedUserFromGroup = fetchWrapper.delete(`api/v1/groups/invitations/groupID/${currentGroup.groupId}/usermail/${groupmem.email}`).then(res => {
                console.log(res.messages[0].message);
            })
            Promise.all([removedUserFromGroup]).then(() => fetchAllGroupMembers());
        }
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
        <div style={{
            background: "#F4F4F4",
            flex: "1",
            margin: "10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            minWidth: "280px",
            color: "#3F3F3F"
        }}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{margin: "0px 10px 0px 10px"}}>
                    <h1>{currentGroup.groupName}</h1>
                </div>
                <div style={{
                    margin: "0px 10px 0px 10px",
                    flex: 1,
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "start",
                    height: "100%",
                    marginTop: "20px"
                }}>
                    <Button style={{margin: "0px 10px 0px 10px"}} type="text" shape="circle" size="large"
                            icon={<EditOutlined color="grey" size={28}
                                                onClick={showEditGroupModal}></EditOutlined>}></Button>
                    <Button type="text" shape="circle" size="large" icon={<DeleteOutlined color="grey" size={28}
                                                                                          onClick={showDeleteGroupModal}></DeleteOutlined>}></Button>
                </div>
                <Modal title="Möchten Sie wirklich diese Gruppe löschen?" open={openDeleteCourseModal}
                       onOk={handleDeleteGroupModalOK} onCancel={handleDeleteGroupModalCancel} okText="Bestätigen"
                       cancelText="Abbrechen">
                    <p>Die Gruppe wird unwiderruflich gelöscht.</p>
                </Modal>
                <Modal title="Gruppe bearbeiten" open={isEditGroupModalOpen} onOk={handleEditGroupModalOK}
                       onCancel={handleEditGroupModalCancel}>
                    <h3>Gruppenname</h3>
                    <Input placeholder="Geben Sie einen Gruppennamen ein..." onChange={updateEditGroupTitle}/>
                    <h3>Gruppenbeschreibung</h3>
                    <TextArea rows={4} onChange={updateEditGroupDescription}/>
                </Modal>
            </div>
            <div style={{margin: "0px 10px 0px 10px"}}>
                <p>{currentGroup.groupDescription}</p>
            </div>
            <InviteGroupmember groupId={currentGroup.groupId} ref={inviteGroupmemberModal}
                               fetchGroupmembers={fetchAllGroupMembers}></InviteGroupmember>
            <div style={{margin: "0px 10px 20px 10px", display: "flex", flexDirection: "column"}}>
                <h3>Gruppenmitglieder</h3>
                <div style={{overflow: "scroll", borderRadius: "10px"}} className="scrollbar">
                    <div style={{
                        background: "#D9D9D9",
                        borderRadius: "10px",
                        height: "100px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "30px",
                        paddingLeft: "15px",
                        paddingRight: "10px",
                        width: "fit-content",
                        overflowX: "scroll",
                        overflowY: "hidden"
                    }} className="scrollbar">
                        {
                            groupmember ?
                                groupmember.map((groupmember: Groupmember) =>
                                    <Groupuser admin={true} groupmember={groupmember}
                                               removeUserFromGroup={removeUserFromGroup}/>)
                                : <></>
                        }
                        <Button size={"large"} onClick={() => inviteGroupmemberModal?.current?.openDialog()}
                                icon={<PlusOutlined/>}
                                type="text"/>
                    </div>
                </div>
            </div>
            {
                groupmember ?
                    groupmember.map((groupmember: Groupmember) =>
                        groupmember.role == RoleEnum.Member ?
                            <>
                                <Divider style={{margin: "0px"}}/>
                                <GroupmemberCourses groupmember={groupmember} admin={true} currentGroup={currentGroup}/>
                            </>
                            : <div/>)
                    : <div/>
            }
        </div>
    )
}

export default Groupadmin;