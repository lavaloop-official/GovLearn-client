import { useEffect, useState } from "react";
import * as groupmember from "../../interfaces" ;
import { Avatar, Button } from "antd";
import Groupuser from "./Groupuser";

function Groupmember({currentGroup}: {currentGroup: groupmember.Group}) {

    const [groupmember, setGroupmember] = useState<groupmember.Groupmember[]>([{id:1, name:"Testuser", admin:true}, {id:2, name:"Testuser2", admin:false}]);

    useEffect(() => {
        //fetch groupmember
    }, [groupmember])

    return (
        <div style={{background:"lightgrey", flex:"1", margin:"10px", borderRadius:"10px", display:"flex", flexDirection:"column"}}>
                    <div style={{margin:"0px 10px 0px 10px"}}>
                        <h1>{currentGroup.name}</h1>
                    </div>
                    <div style={{margin:"0px 10px 0px 10px"}}>
                        <p>{currentGroup.description}</p>
                    </div>
                    <div style={{margin:"0px 10px 0px 10px", display:"flex", flexDirection:"column"}}>
                        <h3>Gruppenmitglieder</h3>
                        <div style={{overflow:"scroll", borderRadius:"10px"}} className="scrollbar">
                        <div style={{background:"grey", borderRadius:"10px", height:"100px", display:"flex", flexDirection:"row", alignItems:"center", gap:"30px", paddingLeft:"10px", paddingRight:"10px", width:"fit-content"}} className="scrollbar">
                            {
                                groupmember ?
                                    groupmember.map((groupmember: groupmember.Groupmember) => 
                                    <Groupuser admin={false} groupmember={groupmember}/>)
                                : <div/>
                            }
                        </div>
                    </div>
                    </div>
                    <div style={{margin:"0px 10px 0px 10px", display:"flex", flexDirection:"column"}}>
                        <h3>Zugewiesene Kurse</h3>
                        <div style={{background:"grey", height:"100px", borderRadius:"10px"}}>

                        </div>
                    </div>
                    <div style={{margin:"0px 10px 10px 10px", display:"flex", flexDirection:"column"}}>
                        <h3>Abgeschlossene Kurse</h3>
                        <div style={{background:"grey", height:"100px", borderRadius:"10px"}}>

                        </div>
                    </div>
                </div>
    )
}

export default Groupmember;