import { useEffect, useState } from "react";
import { fetchWrapper } from "../api/helper";
import { Course } from "../interfaces";
import SearchComponent from "../components/SearchComponent";
import { Button, Flex, Modal } from "antd";
import { ExclamationCircleFilled, FileAddOutlined } from "@ant-design/icons";
import AddCourse from "../components/Dashboard/AddCourse";

function Dashboard() {
    // TODO: update state on delete of SearchComponent
    // TODO: implement edit of SearchComponent
    const [mode, setMode] = useState<"view" | "edit" | "add">("view")
    const [providedCourses, setProvidedCourses] = useState<Course[]>([])
    const { confirm } = Modal;

    useEffect(() => {
        fetchWrapper.get("api/v1/creators/courses").then((res) => {
            setProvidedCourses(res.payload)
        })
    }, [mode])

    const toViewMode = () => {
        setMode("view");
    }

    function handleDelete(id: number | undefined) {
        confirm({
            title: 'Bist du dir sicher diesen Kurs zu löschen?',
            icon: <ExclamationCircleFilled />,
            content: 'Dieser Kurs wird unwiderruflich gelöscht.',
            okText: 'Ja',
            okType: 'danger',
            cancelText: 'Nein',
            onOk() {
                fetchWrapper.delete('api/v1/courses/' + id).then((res) => {
                    if (res) {
                        setProvidedCourses(providedCourses.filter((course) => course.id !== id))
                    }
                });
            }
        });
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
                <div style={{
                    maxWidth: "1200px",
                    minHeight: "860px",
                    margin: "auto",
                    width: "100%",
                    padding: "10px 10px"
                }}>
                    <Flex justify="space-between" align="center">
                        <h1>Meine Kurse</h1>
                        <Button type="primary" icon={<FileAddOutlined />} onClick={() => {
                            setMode("add")
                        }}>
                            Angebot hinzufügen
                        </Button>
                    </Flex>
                    {providedCourses.length > 0 ? providedCourses.map((course) => <div key={course.id}><SearchComponent
                        obj={course} editable onDelete={handleDelete} /*TODO: delete durch parent mitgeben*/ />
                    </div>)
                        : <h2 style={{ textAlign: "center" }}>Du hast noch keine Kurse hinzugefügt.</h2>
                    }
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