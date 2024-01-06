import { Button, Flex, Modal } from "antd";
import { CheckLg, QuestionLg, XLg } from "react-bootstrap-icons";
import {GroupInvitationWsTo } from "../../interfaces";
import "./GroupmemberCourses.css";
import { useState } from "react";

function GroupInvitation({group, acceptInvitation, denyInvitation}:{group:GroupInvitationWsTo, acceptInvitation: (group: GroupInvitationWsTo) => void, denyInvitation: (group: GroupInvitationWsTo) => void}) {
    const [expanded, setExpanded] = useState(false);

    const onAcceptInvitation=()=>{
        acceptInvitation(group);
    }

    const onDenyInvitation=()=>{
        denyInvitation(group);
    }

    return (
        <Flex vertical style={{background:"grey", borderRadius:"10px", padding:"4px"}}>
        <div onClick={() => {setExpanded(!expanded)}} style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", cursor:"pointer"}}>
            <p style={{color:"white", fontSize:"18px", margin:"10px", overflow:"auto", whiteSpace:"nowrap"}} className="scrollbar">{group.groupName}</p>
            <div style={{marginRight:"5px", display:"flex", gap:"5px", justifyContent:"right"}}>
                <Button onClick={onDenyInvitation} icon={<XLg color="red"/>}></Button>
                <Button onClick={onAcceptInvitation} icon={<CheckLg color="green"/>}></Button>
            </div>
        </div>
                    {
                        expanded ? <div style={{background:"lightgray", padding:"5px", borderRadius: "10px"}}>{group.groupDescription}</div> : <div/>
                    }
        </Flex>
    )
}

export default GroupInvitation;