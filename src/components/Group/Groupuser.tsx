import { Avatar, Badge, Button, Divider } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Group, Groupmember } from "../../interfaces";
import { useEffect, useState } from "react";
import { PersonDashFill } from "react-bootstrap-icons";
import { Role } from "../../Enum";

function Groupuser({ groupmember, admin, removeUserFromGroup }: { groupmember: Groupmember, admin: boolean, removeUserFromGroup?: (groupmember: Groupmember) => void }) {

    const onRemoveUserFromGroup = () => {
        removeUserFromGroup!(groupmember)
    }

    return (
        <div style={{height:"70px"}}>
            {
                groupmember.role == Role.Admin ?
                    <Badge.Ribbon text="Admin" color="green" placement="start">
                        <Avatar size={75} style={{ background: "white", color: "black", display:"flex"}}>{groupmember.name}</Avatar>
                        {
                            admin ?
                                <Button style={{ bottom: "85px", left: "55px", color: "#D9D9D9" }} type="text" shape="circle" icon={<PersonDashFill style={{ width: "25px", height: "25px" }} />} onClick={onRemoveUserFromGroup}></Button>
                                : <div />
                        }
                    </Badge.Ribbon>
                    : groupmember.role == Role.Invited ?
                            <Badge.Ribbon text="Eingeladen" color="yellow" placement="start">
                                <Avatar size={75} style={{ background: "white", color: "black", display:"flex"}}>{groupmember.name}</Avatar>
                                {
                                    admin ?
                                        <Button style={{ bottom: "85px", left: "55px", color: "#D9D9D9", zIndex:"1" }} type="text" shape="circle" icon={<PersonDashFill style={{ width: "25px", height: "25px" }} />} onClick={onRemoveUserFromGroup}></Button>
                                        : <div />
                                }
                            </Badge.Ribbon>
                            : <Badge.Ribbon text="Nutzer" color="blue" placement="start">
                                <Avatar size={75} style={{ background: "white", color: "black", display:"flex"}}>{groupmember.name}</Avatar>
                                {
                                    admin ?
                                        <Button style={{ bottom: "85px", left: "55px", color: "#D9D9D9" }} type="text" shape="circle" icon={<PersonDashFill style={{ width: "25px", height: "25px" }} />} onClick={onRemoveUserFromGroup}></Button>
                                        : <div />
                                }
                            </Badge.Ribbon>
            }
        </div>
    )

}

export default Groupuser;