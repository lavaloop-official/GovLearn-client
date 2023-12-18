import { Button, Divider } from "antd";
import Recommendation from "../Recommendation";
import "./GroupmemberCourses.css"
import { Course, Groupmember } from "../../interfaces";
import { Plus , DashSquare} from "react-bootstrap-icons";
import { createRef, useEffect, useState } from "react";
import Groupcourse from "./Groupcourse";
import AddCourse from "./AddCourse";

function GroupmemberCourses({groupmember} : { groupmember: Groupmember}) {

    const addCourseModal = createRef();

    const [courses, setCourses] = useState<Course[]>(
        [
            {id:1,name:"Test",description:"Test",image:"",createdAt:"",provider:"", instructor:"",certificate:"",skilllevel:"",durationInHours:"", format:"", startDate:"", costFree:true, domainSpecific:true,link:"",ratingAmount:1, ratingAverage:2},
            {id:2,name:"Test2",description:"Test2",image:"",createdAt:"",provider:"", instructor:"",certificate:"",skilllevel:"",durationInHours:"", format:"", startDate:"", costFree:true, domainSpecific:true,link:"",ratingAmount:1, ratingAverage:2}
        ]
    );

    useEffect(() => {
        //fetch courses for user
    }, [courses])

    const addCourseToGroupmember=()=>{
        //add course to user
    }

    const removeCourseFromUser = (course: Course) => {
        setCourses(courses.filter(e => e.id !== course.id));
        //update database
    }

    return (
        <div style={{margin:"0px 10px 10px 10px", display:"flex", flexDirection:"column"}}>
            <h3>{groupmember.name}</h3>
            <div style={{background:"grey", height:"fit-content", borderRadius:"10px", maxWidth:"fit-content"}}>
                <div style={{display:"flex", flexDirection:"row", overflow:"scroll", height:"100%", alignItems:"center"}} className="scrollbar">
                    {
                        courses?
                            courses.map((course: Course) => <Groupcourse course={course} removeCourseFromUser={removeCourseFromUser}/>)
                            : <div/>
                    }
                    <Button onClick={() => addCourseModal?.current?.openDialog()} style={{height:"fit-content", width:"fit-content", marginRight:"15px", marginLeft:"15px"}} icon={<Plus style={{color:"white", height:"100%", width:"75px"}}/>} type="text"/>
                </div>
            </div>
            <AddCourse name={groupmember.name} ref={addCourseModal}/>
        </div>
    )
}

export default GroupmemberCourses;