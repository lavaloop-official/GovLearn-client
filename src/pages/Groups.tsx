import {Button} from "antd";
import Groupmember from "../components/Groupmember.tsx";
import Groupadmin from "../components/Groupadmin.tsx";

function Groups() {

    return (
        <div style={{display:"flex", justifyContent:"center", marginLeft:"25px", marginRight:"25px"}}>
            <div style={{background:"#D9D9D9", width:"fit-content", margin:"25px", borderRadius:"20px", display:"flex", minWidth:"650px", maxWidth:"100%"}}>
                <div style={{background:"lightgrey", width:"250px", margin:"10px", borderRadius:"10px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <div style={{margin:"5px",background:"grey", borderRadius:"5px", height:"fit-content"}}>
                            <h2 style={{textAlign:"center"}}>Meine Gruppen</h2>
                        </div>
                        <Button type="primary" style={{margin:"5px"}}>Gruppe hinzufügen</Button>
                    </div>
                    <div style={{margin:"5px",background:"grey", borderRadius:"5px", height:"fit-content"}}>
                        <h3 style={{textAlign:"center"}}>Einladungen</h3>
                    </div>
                </div>
                <Groupadmin/>
            </div>
        </div>
    )
}

export default Groups;