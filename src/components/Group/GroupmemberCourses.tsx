import { Button, Divider } from "antd";
import Recommendation from "../Recommendation";
import "./GroupmemberCourses.css"

function Groupadmin({name} : { name?: string}) {

    return (
        <div style={{margin:"0px 10px 10px 10px", display:"flex", flexDirection:"column"}}>
            <h3>{name}</h3>
            <div style={{background:"grey", height:"fit-content", borderRadius:"10px", maxWidth:"fit-content"}}>
                <div style={{display:"flex", flexDirection:"row", overflow:"scroll"}} className="scrollbar">
                    <Recommendation/>
                    <Recommendation/>
                    <Recommendation/>
                    <Recommendation/>
                    <Recommendation/>
                    <Recommendation/>
                    <Recommendation/>
                    <Recommendation/>
                    <Recommendation/>
                </div>
            </div>
        </div>
    )
}

export default Groupadmin;