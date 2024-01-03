import {useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper";
import {Course} from "../interfaces";
import {Modal} from "antd";
import {ExclamationCircleFilled} from "@ant-design/icons";
import AddCourse from "../components/Dashboard/AddCourse";
import {Route, Routes, useNavigate} from "react-router-dom";
import NotFound from "./NotFound.tsx";
import DashOverview from "../components/Dashboard/DashOverview.tsx";

function Dashboard() {
    // TODO: update state on delete of SearchComponent
    // TODO: implement edit of SearchComponent
    const navigate = useNavigate();

    const [providedCourses, setProvidedCourses] = useState<Course[]>([])
    const {confirm} = Modal;

    useEffect(() => {
        fetchWrapper.get("api/v1/creators/courses").then((res) => {
            setProvidedCourses(res.payload)
        })
    }, [navigate])

    function handleDelete(id: number | undefined) {
        confirm({
            title: 'Bist du dir sicher diesen Kurs zu löschen?',
            icon: <ExclamationCircleFilled/>,
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
            <Routes>
                <Route path="/" element={<DashOverview/>}/>
                <Route path="add/*" element={<AddCourse/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default Dashboard;