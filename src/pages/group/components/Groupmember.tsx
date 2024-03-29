import {createRef, useEffect, useState} from "react";
import * as groupmember from "../../../constants/interfaces.ts";
import {Course} from "../../../constants/interfaces.ts";
import {Button, Empty} from "antd";
import Groupuser from "./Groupuser.tsx";
import Groupcourse from "./Groupcourse.tsx";
import "./GroupmemberCourses.css"
import {fetchWrapper} from "../../../api/helper.ts";
import {PersonDashFill} from "react-bootstrap-icons";
import LeaveGroupModal from "./LeaveGroupModal.tsx";

function Groupmember({currentGroup, fetchAllGroups}: { currentGroup: groupmember.Group, fetchAllGroups: () => void }) {

    const leaveGroupModal = createRef();

    const [groupmember, setGroupmember] = useState<groupmember.Groupmember[]>([]);

    const [courses, setCourses] = useState<Course[]>([]);

    const [toBeDoneCourses, setToBeDoneCourses] = useState<Course[]>([]);

    const [finishedCourses, setFinishedCourses] = useState<Course[]>([]);

    const leaveGroup = () => {
        const leftGroup = fetchWrapper.delete(`api/v1/groups/members/removes/${currentGroup.groupId}`).then(res => {
            console.log(res.messages[0].message);
        });
        Promise.all([leftGroup]).then(() => {
            fetchAllGroups();
        });
    }

    useEffect(() => {
        fetchWrapper.get(`api/v1/groups/${currentGroup.groupId}/members`).then(res => {
            setGroupmember(res.payload);
        });
        let courses: Course[] = [];
        const finishedFetchingCourseIDs = fetchWrapper.get(`api/v1/groups/content/${currentGroup.groupId}`).then(res => {
            courses = res.payload.courses;
            setCourses(res.payload.courses);
        });
        Promise.all([finishedFetchingCourseIDs]).then(() => {
            fetchWrapper.get(`api/v1/completions`).then(res => {
                let fetchedCompletedCourses: Course[] = res.payload;
                let finishedCourses: Course[] = fetchedCompletedCourses.filter(course => courses.map(course => course.id).includes(course.id!));
                setFinishedCourses(finishedCourses);
                let coursesToBeDone: Course[] = courses.filter(course => !finishedCourses.map(course => course.id).includes(course.id!))
                setToBeDoneCourses(coursesToBeDone);
            });
        });
    }, [currentGroup]);

    return (
        <div style={{
            background: "#F4F4F4",
            flex: "1",
            margin: "10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            minWidth: "280px",
            color: "#3F3F3F"
        }}>
            <div style={{margin: "0px 12px 0px 10px"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h1>{currentGroup.groupName}</h1>
                    <Button onClick={() => leaveGroupModal?.current?.openDialog()} style={{marginTop: "10px"}}
                            type="text" shape="circle" size="large"
                            icon={<PersonDashFill color="grey" size={30}/>}></Button>
                </div>
            </div>
            <LeaveGroupModal currentgroup={currentGroup} ref={leaveGroupModal} leaveGroup={leaveGroup}/>
            <div style={{margin: "0px 10px 0px 10px"}}>
                <p>{currentGroup.groupDescription}</p>
            </div>
            <div style={{margin: "0px 10px 0px 10px", display: "flex", flexDirection: "column"}}>
                <h3>Gruppenmitglieder</h3>
                <div style={{overflow: "scroll", borderRadius: "10px"}} className="scrollbar">
                    <div style={{
                        background: "#D9D9D9",
                        borderRadius: "10px",
                        height: "100px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "30px",
                        paddingLeft: "15px",
                        paddingRight: "10px",
                        width: "fit-content"
                    }} className="scrollbar">
                        {
                            groupmember ?
                                groupmember.map((groupmember: groupmember.Groupmember) =>
                                    <Groupuser admin={false} groupmember={groupmember}/>)
                                : <div/>
                        }
                    </div>
                </div>
            </div>
            <div className="course-member-display">
                <h3>Zu bearbeitende Kurse</h3>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    gap: "10px",
                }}>
                    {
                        toBeDoneCourses.length > 0 ?
                            toBeDoneCourses.map((course: Course) => <Groupcourse course={course} admin={false}/>)
                            : <Empty description="Keine zu bearbeitenden Kurse"/>
                    }
                </div>
            </div>
            <div className="course-member-display">
                <h3>Abgeschlossene Kurse</h3>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    gap: "10px",
                }}>
                    {
                        finishedCourses.length > 0 ?
                            finishedCourses.map((course: Course) => <Groupcourse course={course} admin={false}/>)
                            : <Empty description="Keine abgeschlossenen Kurse"/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Groupmember;