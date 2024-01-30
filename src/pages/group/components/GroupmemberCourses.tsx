import {Button, Flex} from "antd";
import "./GroupmemberCourses.css"
import {Course, Group, Groupmember} from "../../../constants/interfaces.ts";
import {createRef, useEffect, useState} from "react";
import Groupcourse from "./Groupcourse.tsx";
import AddCourse from "./AddCourse.tsx";
import {fetchWrapper} from "../../../api/helper.ts";
import {DownOutlined, UpOutlined} from "@ant-design/icons";

function GroupmemberCourses({groupmember, admin, currentGroup}: {
    groupmember: Groupmember,
    admin: boolean,
    currentGroup: Group
}) {
    const [expanded, setExpanded] = useState(false);
    const addCourseModal = createRef();

    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetchAllContent();
    }, [])

    const fetchAllContent = () => {
        fetchWrapper.get(`api/v1/groups/content/${currentGroup.groupId}/${groupmember.memberId}`).then(res => {
            setCourses(res.payload.courses);
        })
    }

    const addCourseToGroupmember = (courseIds: number[]) => {
        console.log(courseIds)
        if (courses.length != 0) {
            const existingCourseIds: number[] = courses.map(item => item.id) as number[];
            courseIds = courseIds.filter(element => !existingCourseIds.includes(element))
        }

        const addedCourses = fetchWrapper.post(`api/v1/groups/content`, {
            memberId: groupmember.memberId,
            courseIds: courseIds,
        })
        Promise.all([addedCourses]).then(() => {
            fetchAllContent();
        });


    }

    const removeCourseFromUser = (course: Course) => {
        setCourses(courses.filter(e => e.id !== course.id));
        fetchWrapper.delete(`api/v1/groups/content/${currentGroup.groupId}/${course.id}/${groupmember.memberId}`)
    }

    return (
        <div style={{margin: "0px 10px 10px 10px", display: "flex", flexDirection: "column"}}>
            <Flex justify="space-between" align="center">
                <h3>{groupmember.name} - {courses.length == 1 ? "Ein zugeordneter Kurs" : `${courses.length} zugeordnete Kurse`}</h3>
                <div>
                    <Button onClick={() => addCourseModal?.current?.openDialog()} style={{
                        height: "fit-content",
                        width: "fit-content",
                        marginRight: "10px"
                    }}>Kurse hinzufügen</Button>
                    <Button onClick={() => {
                        setExpanded(!expanded);
                    }} icon={expanded ? <UpOutlined/> : <DownOutlined/>}/>
                </div>
            </Flex>
            {expanded ?
                <>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                        gap: "10px",
                    }}>
                        {
                            courses ?
                                courses.map((course: Course) => <Groupcourse course={course} admin={admin}
                                                                             removeCourseFromUser={removeCourseFromUser}/>)
                                : <div/>
                        }
                    </div>
                </>
                : <></>}
            <AddCourse groupmember={groupmember} currentGroup={currentGroup} ref={addCourseModal}
                       addCourseToGroupmember={addCourseToGroupmember}/>
        </div>
    )
}

export default GroupmemberCourses;