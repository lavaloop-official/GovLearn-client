import { Avatar, Badge, Button, Divider } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Group, Groupmember } from "../../interfaces";
import { useEffect, useState } from "react";
import { PersonDashFill } from "react-bootstrap-icons";

function Groupuser({groupmember, admin, removeUserFromGroup}:{groupmember:Groupmember, admin:boolean, removeUserFromGroup?: (groupmember: Groupmember) => void}) {

    const onRemoveUserFromGroup=()=>{
        removeUserFromGroup!(groupmember)
    }

    return (
        <div>
            {
                groupmember.admin?
                    <Badge.Ribbon text="Admin" color="green" placement="start">
                        <Avatar size={75} style={{background:"white", color:"black"}}>{groupmember.name}</Avatar>
                        {
                            admin?
                                <Button style={{bottom:"20px", right:"20px", color:"#D9D9D9"}} type="text" shape="circle" icon={<PersonDashFill style={{width:"25px", height:"25px"}}/>} onClick={onRemoveUserFromGroup}></Button>
                                :<div/>
                        }
                    </Badge.Ribbon>
                    : <Badge.Ribbon text="Nutzer" color="blue" placement="start">
                        <Avatar size={75} style={{background:"white", color:"black"}}>{groupmember.name}</Avatar>
                        {
                            admin?
                                <Button style={{bottom:"20px", right:"20px", color:"#D9D9D9"}} type="text" shape="circle" icon={<PersonDashFill style={{width:"25px", height:"25px"}}/>} onClick={onRemoveUserFromGroup}></Button>
                                :<div/>
                        }
                    </Badge.Ribbon>
            }
        </div>
    )

}

export default Groupuser;