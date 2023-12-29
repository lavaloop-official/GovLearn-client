import { Button, Divider } from "antd";
import Recommendation from "../Recommendation";
import "./GroupmemberCourses.css"
import {Course, Group, Groupmember } from "../../interfaces";
import { Plus, DashSquare } from "react-bootstrap-icons";
import { createRef, useEffect, useState } from "react";
import Groupcourse from "./Groupcourse";
import AddCourse from "./AddCourse";
import { fetchWrapper } from "../../api/helper";

function GroupmemberCourses({ groupmember, admin, currentGroup}: { groupmember: Groupmember, admin: Boolean, currentGroup: Group }) {

    const addCourseModal = createRef();

    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        let courseIds:number[]=[];
        const fetchedCourseIds = fetchWrapper.get(`api/v1/groups/content/${currentGroup.groupId}/${groupmember.memberId}`).then(res => {
            courseIds = res.payload.courseIds;
        })
        Promise.all([fetchedCourseIds]).then(() => {
            let fetchedCourses:Course[]=[];
            courseIds.forEach(courseId => {
                fetchWrapper.get(`api/v1/courses/${courseId}`).then(res => {
                    fetchedCourses = [res.payload, ...fetchedCourses];
                    setCourses(fetchedCourses);
                })
            })
        })
    }, [])

    const addCourseToGroupmember = (courseIds: number[]) => {
        courseIds.forEach(element => {
            fetchWrapper.post(`api/v1/groups/content`, {memberId: groupmember.memberId, courseId: element}).then(res => console.log(res.message))
        })
    }

    const removeCourseFromUser = (course: Course) => {
        setCourses(courses.filter(e => e.id !== course.id));
        //update database
    }

    return (
        <div style={{ margin: "0px 10px 10px 10px", display: "flex", flexDirection: "column"}}>
            <h3>{groupmember.name}</h3>
            <div style={{ background: "grey", height: "fit-content", borderRadius: "10px", maxWidth: "fit-content" }}>
                <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll", overflowY: "hidden", height: "fit-content", alignItems: "center" }} className="scrollbar">
                    {
                        courses ?
                            courses.map((course: Course) => <Groupcourse course={course} admin={admin} removeCourseFromUser={removeCourseFromUser} />)
                            : <div />
                    }
                    <Button onClick={() => addCourseModal?.current?.openDialog()} style={{ height: "fit-content", width: "fit-content", marginRight: "15px", marginLeft: "15px" }} icon={<Plus style={{ color: "white", height: "100%", width: "75px" }} />} type="text" />
                </div>
            </div>
            <AddCourse groupmember={groupmember} ref={addCourseModal} addCourseToGroupmember={addCourseToGroupmember}/>
        </div>
    )
}

export default GroupmemberCourses;