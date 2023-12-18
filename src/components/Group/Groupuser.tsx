import { Avatar, Badge, Button, Divider } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Group, Groupmember } from "../../interfaces";
import { useEffect, useState } from "react";
import { PersonDashFill } from "react-bootstrap-icons";

function Groupuser({groupmember, removeUserFromGroup}:{groupmember:Groupmember, removeUserFromGroup: (groupmember: Groupmember) => void}) {

    const onRemoveUserFromGroup=()=>{
        removeUserFromGroup(groupmember)
    }

    return (
        <div>
            <Avatar size={75}>{groupmember.name}</Avatar>
            <Button style={{bottom:"20px", right:"20px", color:"white"}} type="text" shape="circle" icon={<PersonDashFill style={{width:"25px", height:"25px"}}/>} onClick={onRemoveUserFromGroup}></Button>
        </div>
    )

}

export default Groupuser;