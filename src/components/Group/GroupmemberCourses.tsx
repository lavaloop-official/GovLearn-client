import { Button, Divider, Flex } from "antd";
import Recommendation from "../Recommendation";
import "./GroupmemberCourses.css"
import {Course, Group, Groupmember } from "../../interfaces";
import { Plus, DashSquare } from "react-bootstrap-icons";
import { createRef, useEffect, useState } from "react";
import Groupcourse from "./Groupcourse";
import AddCourse from "./AddCourse";
import { fetchWrapper } from "../../api/helper";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

function GroupmemberCourses({ groupmember, admin, currentGroup}: { groupmember: Groupmember, admin: Boolean, currentGroup: Group }) {
    const [expanded, setExpanded] = useState(true);
    const addCourseModal = createRef();

    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetchAllContent();
    }, [])

    const fetchAllContent = () => {
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
    }

    const addCourseToGroupmember = (courseIds: number[]) => {
        if(courses.length != 0)
        {
            const existingCourseIds:number[] = courses.map(item => item.id) as number[]; 
            courseIds = courseIds.filter(element => !existingCourseIds.includes(element))
        }
        courseIds.forEach(element => {
            const addedContent = fetchWrapper.post(`api/v1/groups/content`, {memberId: groupmember.memberId, courseId: element}).then(res => console.log(res.message));
            Promise.all([addedContent]).then(()=>{
                fetchAllContent();
            })
        })
    }

    const removeCourseFromUser = (course: Course) => {
        setCourses(courses.filter(e => e.id !== course.id));
        fetchWrapper.delete(`api/v1/groups/content/${currentGroup.groupId}/${course.id}/${groupmember.memberId}`)
    }

    return (
        <div style={{ margin: "0px 10px 10px 10px", display: "flex", flexDirection: "column"}}>
            <Flex justify="space-between" align="center">
                <h3>{groupmember.name}</h3>
                <Button onClick={() => {
                    setExpanded(!expanded);
                }} icon={expanded ? <UpOutlined /> : <DownOutlined />}/>
            </Flex>
            {expanded ? 
            <>
                <div style={{padding:"10px"}} className="scrollbar course-display">
                    {
                        courses ?
                            courses.map((course: Course) => <Groupcourse course={course} admin={admin} removeCourseFromUser={removeCourseFromUser} />)
                            : <div />
                    }
                    <Button onClick={() => addCourseModal?.current?.openDialog()} style={{ height: "fit-content", width: "fit-content", marginRight: "15px", marginLeft: "15px" }} icon={<Plus style={{ color: "white", height: "100%", width: "75px" }} />} type="text" />
                </div>
            <AddCourse groupmember={groupmember} currentGroup={currentGroup} ref={addCourseModal} addCourseToGroupmember={addCourseToGroupmember}/>
            </>
            : <div />}
        </div>
    )
}

export default GroupmemberCourses;