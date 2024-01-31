import {Avatar, Badge, Button} from "antd";
import "./GroupmemberCourses.css"
import {Groupmember} from "../../../constants/interfaces.ts";
import {PersonDashFill} from "react-bootstrap-icons";
import {RoleEnum} from "../../../constants/Enum.ts";

function Groupuser({groupmember, admin, removeUserFromGroup}: {
    groupmember: Groupmember,
    admin: boolean,
    removeUserFromGroup?: (groupmember: Groupmember) => void
}) {

    const onRemoveUserFromGroup = () => {
        removeUserFromGroup!(groupmember)
    }

    return (
        <div style={{height: "70px"}}>
            {
                groupmember.role == RoleEnum.Admin ?
                    <Badge.Ribbon text="Admin" color="green" placement="start">
                        <Avatar size={75} style={{
                            background: "white",
                            color: "#3F3F3F",
                            display: "flex"
                        }}>{groupmember.name}</Avatar>
                        {
                            admin ?
                                <Button style={{bottom: "85px", left: "55px", color: "grey"}} type="text" shape="circle"
                                        icon={<PersonDashFill style={{width: "25px", height: "25px"}}/>}
                                        onClick={onRemoveUserFromGroup}></Button>
                                : <div/>
                        }
                    </Badge.Ribbon>
                    : groupmember.role == RoleEnum.Invited ?
                        <Badge.Ribbon text="Eingeladen" color="yellow" placement="start">
                            <Avatar size={75} style={{
                                background: "white",
                                color: "#3F3F3F",
                                display: "flex"
                            }}>{groupmember.name}</Avatar>
                            {
                                admin ?
                                    <Button style={{bottom: "85px", left: "55px", color: "grey", zIndex: "1"}} type="text"
                                            shape="circle" icon={<PersonDashFill style={{width: "25px", height: "25px"}}/>}
                                            onClick={onRemoveUserFromGroup}></Button>
                                    : <div/>
                            }
                        </Badge.Ribbon>
                        : <Badge.Ribbon text="Nutzer" color="blue" placement="start">
                            <Avatar size={75} style={{
                                background: "white",
                                color: "#3F3F3F",
                                display: "flex"
                            }}>{groupmember.name}</Avatar>
                            {
                                admin ?
                                    <Button style={{bottom: "85px", left: "55px", color: "grey"}} type="text" shape="circle"
                                            icon={<PersonDashFill style={{width: "25px", height: "25px"}}/>}
                                            onClick={onRemoveUserFromGroup}></Button>
                                    : <div/>
                            }
                        </Badge.Ribbon>
            }
        </div>
    )

}

export default Groupuser;