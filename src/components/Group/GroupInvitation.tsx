import { Button } from "antd";
import { CheckLg, XLg } from "react-bootstrap-icons";
import {GroupInvitationWsTo } from "../../interfaces";
import "./GroupmemberCourses.css";

function GroupInvitation({group, acceptInvitation, denyInvitation}:{group:GroupInvitationWsTo, acceptInvitation: (group: GroupInvitationWsTo) => void, denyInvitation: (group: GroupInvitationWsTo) => void}) {

    const onAcceptInvitation=()=>{
        acceptInvitation(group);
    }

    const onDenyInvitation=()=>{
        denyInvitation(group);
    }

    return (
        <div style={{background:"grey", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderRadius:"10px"}}>
            <p style={{color:"white", fontSize:"18px", margin:"10px", overflow:"auto", whiteSpace:"nowrap"}} className="scrollbar">{group.groupName}</p>
            <div style={{marginRight:"5px", display:"flex", gap:"5px", justifyContent:"right"}}>
                <Button onClick={onDenyInvitation} icon={<XLg></XLg>}></Button>
                <Button onClick={onAcceptInvitation} icon={<CheckLg></CheckLg>}></Button>
            </div>
        </div>
    )
}

export default GroupInvitation;