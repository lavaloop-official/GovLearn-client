import {Button, Flex} from "antd";
import {CloseOutlined, CheckOutlined} from "@ant-design/icons";
import {GroupInvitationWsTo} from "../../interfaces";
import "./GroupmemberCourses.css";
import {useState} from "react";

function GroupInvitation({group, acceptInvitation, denyInvitation}: {
    group: GroupInvitationWsTo,
    acceptInvitation: (group: GroupInvitationWsTo) => void,
    denyInvitation: (group: GroupInvitationWsTo) => void
}) {
    const [expanded, setExpanded] = useState(false);

    const onAcceptInvitation = () => {
        acceptInvitation(group);
    }

    const onDenyInvitation = () => {
        denyInvitation(group);
    }

    return (
        <Flex vertical style={{background: "#D9D9D9", borderRadius: "10px", padding: "0px"}}>
            <div onClick={() => {
                setExpanded(!expanded)
            }} style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
            }}>
                <p style={{color: "#3F3F3F", fontSize: "18px", margin: "10px", overflow: "auto", whiteSpace: "nowrap"}}
                   className="scrollbar">{group.groupName}</p>
                <div style={{marginRight: "5px", display: "flex", gap: "5px", justifyContent: "right"}}>
                    <Button ghost danger onClick={onDenyInvitation} icon={<CloseOutlined/>}></Button>
                    <Button ghost type={"primary"} onClick={onAcceptInvitation} icon={<CheckOutlined/>}></Button>
                </div>
            </div>
            {
                expanded ? <div style={{
                    background: "#F4F4F4",
                    color: "#3F3F3F",
                    padding: "5px",
                    margin: "5px",
                    borderRadius: "5px"
                }}>{group.groupDescription}</div> : <div/>
            }
        </Flex>
    )
}

export default GroupInvitation;