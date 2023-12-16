import { Avatar, Button, Divider } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { UserOutlined } from "@ant-design/icons";

function Groupadmin() {

    return (
        <div style={{background:"lightgrey", flex:"1", margin:"10px", borderRadius:"10px", display:"flex", flexDirection:"column", minWidth:"280px"}}>
            <div style={{margin:"0px 10px 0px 10px"}}>
                <h1>Gruppentitel - Admin</h1>
            </div>
            <div style={{margin:"0px 10px 0px 10px"}}>
                <p>Gruppenbeschreibung</p>
            </div>
            <div style={{margin:"0px 10px 0px 10px", display:"flex", flexDirection:"column"}}>
                <h3>Gruppenmitglieder</h3>
                <div style={{overflow:"scroll", borderRadius:"10px"}} className="scrollbar">
                    <div style={{background:"grey", borderRadius:"10px", height:"100px", display:"flex", flexDirection:"row", alignItems:"center", gap:"10px", paddingLeft:"10px", paddingRight:"10px", width:"fit-content"}} className="scrollbar">
                        <Avatar icon={<UserOutlined />} size={75}/>
                        <Avatar icon={<UserOutlined />} size={75}/>
                        <Avatar icon={<UserOutlined />} size={75}/>
                        <Avatar icon={<UserOutlined />} size={75}/>
                        <Avatar icon={<UserOutlined />} size={75}/>
                        <Avatar icon={<UserOutlined />} size={75}/>
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