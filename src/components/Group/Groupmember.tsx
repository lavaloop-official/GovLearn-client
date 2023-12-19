import { useEffect, useState } from "react";
import * as groupmember from "../../interfaces" ;
import { Avatar, Button } from "antd";
import Groupuser from "./Groupuser";
import Groupcourse from "./Groupcourse";
import { Course } from "../../interfaces";
import "./GroupmemberCourses.css"

function Groupmember({currentGroup}: {currentGroup: groupmember.Group}) {

    const [groupmember, setGroupmember] = useState<groupmember.Groupmember[]>([{id:1, name:"Testuser", admin:true}, {id:2, name:"Testuser2", admin:false}]);

    const [courses, setCourses] = useState<Course[]>(
        [
            {id:1,name:"Test",description:"Test",image:"",createdAt:"",provider:"", instructor:"",certificate:"",skilllevel:"",durationInHours:"", format:"", startDate:"", costFree:true, domainSpecific:true,link:"",ratingAmount:1, ratingAverage:2},
            {id:2,name:"Test2",description:"Test2",image:"",createdAt:"",provider:"", instructor:"",certificate:"",skilllevel:"",durationInHours:"", format:"", startDate:"", costFree:true, domainSpecific:true,link:"",ratingAmount:1, ratingAverage:2}
        ]
    );

    const [toBeDoneCourses, setToBeDoneCourses] = useState<Course[]>(
        [
            {id:1,name:"Test",description:"Test",image:"",createdAt:"",provider:"", instructor:"",certificate:"",skilllevel:"",durationInHours:"", format:"", startDate:"", costFree:true, domainSpecific:true,link:"",ratingAmount:1, ratingAverage:2}
        ]
    );

    const [finishedCourses, setFinishedCourses] = useState<Course[]>(
        [
            
            {id:2,name:"Test2",description:"Test2",image:"",createdAt:"",provider:"", instructor:"",certificate:"",skilllevel:"",durationInHours:"", format:"", startDate:"", costFree:true, domainSpecific:true,link:"",ratingAmount:1, ratingAverage:2}
        ]
    );

    useEffect(() => {
        //fetch groupmember
    }, [groupmember])

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
                        <div style={{background:"grey", height:"fit-content", borderRadius:"10px", display:"flex", flexDirection:"row", overflow:"scroll", maxWidth:"fit-content"}} className="scrollbar">
                            {
                                courses?
                                    courses.map((course: Course) => <Groupcourse course={course} admin={false}/>)
                                    : <div/>
                            }
                        </div>
                    </div>
                    <div style={{margin:"0px 10px 10px 10px", display:"flex", flexDirection:"column"}}>
                        <h3>Zu bearbeitende Kurse</h3>
                        <div style={{background:"grey", height:"fit-content", borderRadius:"10px", display:"flex", flexDirection:"row", overflow:"scroll", maxWidth:"fit-content"}} className="scrollbar">
                            {
                                toBeDoneCourses?
                                    toBeDoneCourses.map((course: Course) => <Groupcourse course={course} admin={false}/>)
                                    : <div/>
                            }
                        </div>
                    </div>
                    <div style={{margin:"0px 10px 10px 10px", display:"flex", flexDirection:"column"}}>
                        <h3>Abgeschlossene Kurse</h3>
                        <div style={{background:"grey", height:"fit-content", borderRadius:"10px", display:"flex", flexDirection:"row", overflow:"scroll", maxWidth:"fit-content"}} className="scrollbar">
                            {
                                finishedCourses?
                                    finishedCourses.map((course: Course) => <Groupcourse course={course} admin={false}/>)
                                    : <div/>
                            }
                        </div>
                    </div>
                </div>
    )
}

export default Groupmember;