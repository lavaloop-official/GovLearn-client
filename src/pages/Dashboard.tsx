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
    useEffect(() => {
        fetchWrapper.get("api/v1/providers/courses").then((res) => {
            setProvidedCourses(res.payload)
        })
    }, [mode])

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
                    {providedCourses.map((course) => <div key={course.id}><SearchComponent obj={course} editable={true} /*TODO: delete durch parent mitgeben*//></div>)}
                </div>
                : mode === "add" ?
                    <AddCourse ClickHandler={toViewMode} />
                    : mode === "edit" ?
                        <div>
                            <h1>test</h1>
                        </div>
                        : <></>}
        </div>
    );
}

export default Dashboard;