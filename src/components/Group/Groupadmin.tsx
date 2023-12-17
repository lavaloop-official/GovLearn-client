import { Avatar, Badge, Button, Divider } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Group, Groupmember } from "../../interfaces";
import { useEffect, useState } from "react";
import { PersonDashFill } from "react-bootstrap-icons";

function Groupadmin({currentGroup}:{currentGroup:Group}) {

    const [groupmember, setGroupmember] = useState<Groupmember[]>([{id:1, name:"Testuser"}, {id:2, name:"Testuser2"}]);

    // useEffect(() => {
    //     //fetch groupmember
    // }, [groupmember])

    return (
        <div style={{background:"lightgrey", flex:"1", margin:"10px", borderRadius:"10px", display:"flex", flexDirection:"column", minWidth:"280px"}}>
            <div style={{margin:"0px 10px 0px 10px"}}>
                <h1>{currentGroup.name}</h1>
            </div>
            <div style={{margin:"0px 10px 0px 10px"}}>
                <p>{currentGroup.description}</p>
            </div>
            <div style={{margin:"0px 10px 0px 10px", display:"flex", flexDirection:"column"}}>
                <h3>Gruppenmitglieder</h3>
                <div style={{overflow:"scroll", borderRadius:"10px"}} className="scrollbar">
                    <div style={{background:"grey", borderRadius:"10px", height:"100px", display:"flex", flexDirection:"row", alignItems:"center", gap:"10px", paddingLeft:"10px", paddingRight:"10px", width:"fit-content"}} className="scrollbar">
                        {
                            groupmember ?
                                groupmember.map((groupmember: Groupmember) => 
                                    <div>
                                        <Avatar size={75}>{groupmember.name}</Avatar>
                                        <Button style={{bottom:"20px", right:"20px", width:"fit-content", height:"fit-content", color:"white"}} type="text" shape="circle" icon={<PersonDashFill style={{width:"25px", height:"25px"}}/>}></Button>
                                    </div>)
                                : <div/>
                        }
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
            <GroupmemberCourses name="Gruppenmitglied xyz - Kurse"></GroupmemberCourses>
        </div>
    )
}

export default Groupadmin;