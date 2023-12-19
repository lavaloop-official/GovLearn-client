import { Avatar, Badge, Button, Divider } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Course, Group, Groupmember } from "../../interfaces";
import { useEffect, useState } from "react";
import { DashSquare} from "react-bootstrap-icons";
import Recommendation from "../Recommendation";

function Groupcourse({course, admin, removeCourseFromUser}:{course: Course, admin:Boolean ,removeCourseFromUser?: (course: Course) => void}) {

    const onRemoveCourseFromUser=()=>{
        removeCourseFromUser!(course)
    }

    return (
        <div style={{height:"fit-content", display:"flex", flexDirection:"row"}}>
            <Recommendation obj={course}/>
            {
                admin?
                    <Button style={{top:"95px", right:"43px", color:"white"}} type="text" icon={<DashSquare style={{width:"25px", height:"25px"}}/>} onClick={onRemoveCourseFromUser}></Button>
                    :<div/>
            } 
        </div>
    )

}

export default Groupcourse;