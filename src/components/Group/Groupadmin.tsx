import {Badge, Button, Divider, Modal } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Group, Groupmember } from "../../interfaces";
import { createRef, useEffect, useState } from "react";
import { Plus, Trash} from "react-bootstrap-icons";
import Groupuser from "./Groupuser";
import InviteGroupmember from "./InviteGroupmember";
import { fetchWrapper } from "../../api/helper";

function Groupadmin({currentGroup, removeCurrentGroup}:{currentGroup:Group, removeCurrentGroup: (group:Group) => void}) {

    const inviteGroupmemberModal = createRef();

    const [groupmember, setGroupmember] = useState<Groupmember[]>([{id:1, name:"Testuser", admin:true}, {id:2, name:"Testuser2", admin:false}]);

    const removeUserFromGroup = (groupmem: Groupmember) => {
        setGroupmember(groupmember.filter(e => e.id !== groupmem.id));
        //update database
    }

    useEffect(() => {
        //fetch groupmember
    }, [groupmember])

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
        <div style={{background:"lightgrey", flex:"1", margin:"10px", borderRadius:"10px", display:"flex", flexDirection:"column", minWidth:"280px"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{margin:"0px 10px 0px 10px"}}>
                    <h1>{currentGroup.groupName}</h1>
                </div>
                <Button style={{margin:"0px 10px 0px 10px"}} type="text" shape="circle" size="large" icon={<Trash color="white" size={28} onClick={showDeleteGroupModal}></Trash>}></Button>
                <Modal title="Möchten Sie wirklich diese Gruppe löschen?" open={openDeleteCourseModal} onOk={handleDeleteGroupModalOK} onCancel={handleDeleteGroupModalCancel}>
                    <p>Die Gruppe wird unwiderruflich gelöscht.</p>
                </Modal>
            </div>
            <div style={{margin:"0px 10px 0px 10px"}}>
                <p>{currentGroup.groupDescription}</p>
            </div>
            <InviteGroupmember ref={inviteGroupmemberModal}></InviteGroupmember>
            <div style={{margin:"0px 10px 0px 10px", display:"flex", flexDirection:"column"}}>
                <h3>Gruppenmitglieder</h3>
                <div style={{overflow:"scroll", borderRadius:"10px"}} className="scrollbar">
                    <div style={{background:"grey", borderRadius:"10px", height:"100px", display:"flex", flexDirection:"row", alignItems:"center", gap:"0px", paddingLeft:"10px", paddingRight:"10px", width:"fit-content"}} className="scrollbar">
                        {
                            groupmember ?
                                groupmember.map((groupmember: Groupmember) => 
                                    <Groupuser admin={true} groupmember={groupmember} removeUserFromGroup={removeUserFromGroup}/>)
                                : <div/>
                        }
                        <Button onClick={() => inviteGroupmemberModal?.current?.openDialog()} style={{height:"fit-content", width:"fit-content"}} icon={<Plus style={{color:"white", height:"100%", width:"50px", marginRight:"15px", marginLeft:"15px"}}/>} type="text"/>
                    </div>
                </div>
            </div>
            <div style={{margin:"0px 10px 0px 10px", display:"flex", flexDirection:"column"}}>
                <h3>Gruppenverwaltung</h3>
                <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
                    <Button>Mitglieder hinzufügen</Button>
                    <Button>Mitglieder entfernen</Button>
                </div>
                <Divider/>
            </div>
            {
                groupmember ?
                    groupmember.map((groupmember: Groupmember) => 
                        <GroupmemberCourses groupmember={groupmember} admin={true}/>)
                    : <div/>
            }
        </div>
    )
}

export default Groupadmin;