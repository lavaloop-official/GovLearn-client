import react, { useEffect, useState } from "react";
import { fetchWrapper } from "../api/helper";
import { Course, Coursetag } from "../interfaces";
import SearchComponent from "../components/SearchComponent";
import { Button, Flex, Steps } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import AddCourse from "../components/Dashboard/AddCourse";

function Dashboard() {
    // TODO: update state on delete of SearchComponent
    // TODO: implement edit of SearchComponent
    const [mode, setMode] = useState<"view" | "edit" | "add">("view")
    const [providedCourses, setProvidedCourses] = useState<Course[]>([])
    //const [newCourseWithTags, setNewCourseWithTags] = useState<{ Course: Course, Coursetag: Coursetag[] }>()
    useEffect(() => {
        fetchWrapper.get("api/v1/providers/courses").then((res) => {
            setProvidedCourses(res.payload)
        })
    }, [mode])

    /*useEffect(() => {
        console.log(providedCourses)
        if (newCourseWithTags?.Course){
            const courseId = getIdOfNewCourse()
            console.log(getIdOfNewCourse())
            if (courseId !== -1){
                newCourseWithTags.Coursetag.forEach((tag) => {
                    fetchWrapper.post(`api/v1/tags/courses`,{courseId: courseId, tagId: tag.id}).then((res) => {
                        console.log(res)
                    })
                })
            } else {
                console.log("Weiterbildungsangebot nicht gefunden")
            }
        }
        // setze newCourseWithTags auf undefined, damit useEffect nicht erneut ausgeführt wird
        //Promise.resolve(setNewCourseWithTags(undefined)) 
    }, [providedCourses])

    const addTagsToNewCourse = (newCourse: Course, tags: Coursetag[]) => {
        toViewMode()
        setNewCourseWithTags({ Course: newCourse, Coursetag: tags })
    }

    const getIdOfNewCourse = () => {
        let found = false
        providedCourses.forEach((course) => {
            if (course.name === newCourseWithTags?.Course.name && course.description === newCourseWithTags?.Course.description) {
                console.log(course.name, course.description, newCourseWithTags?.Course.name, newCourseWithTags?.Course.description)
                console.log(course.id)
                found = true
                return course.id                
            }
        })
        if (!found){
            return -1
        }
    }*/
    const toViewMode = () => {
        setMode("view");
    }
    return (
        <div style={{
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px"
        }}>
            {mode === "view" ?
                <div style={{ maxWidth: "1200px", minHeight: "860px", margin: "auto", width: "100%", padding: "10px 10px" }}>
                    <Flex justify="space-between" align="center">
                        <h1>Meine Kurse</h1>
                        <Button type="primary" icon={<FileAddOutlined />} onClick={() => { setMode("add") }}>
                            Angebot hinzufügen
                        </Button>
                    </Flex>
                    {providedCourses.map((course) => <div key={course.id}><SearchComponent obj={course} editable={true} /></div>)}
                </div>
                : mode === "add" ?
                    //<Flex
                    <AddCourse ClickHandler={toViewMode} /*addTagsToNewCourse={addTagsToNewCourse}*/ />
                    : mode === "edit" ?
                        <div>
                            <h1>test</h1>
                        </div>
                        : <></>}
        </div>
    );
}

export default Dashboard;