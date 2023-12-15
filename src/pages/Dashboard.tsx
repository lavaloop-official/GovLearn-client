import react, { useEffect, useState } from "react";
import { fetchWrapper } from "../api/helper";
import { Course } from "../interfaces";
import SearchComponent from "../components/SearchComponent";

function Dashboard() {
    const [providedCourses, setProvidedCourses] = useState<Course[]>([])
    useEffect(() => {
        fetchWrapper.get("api/v1/providers/courses").then((res) => {
            setProvidedCourses(res.payload)
        })
    }, [])
    return (
<div style={{
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px"
        }}>
            <div style={{maxWidth: "1200px", minHeight: "860px", margin: "auto", width: "100%", padding: "10px 10px"}}>
                <h1>Meine Kurse</h1>
                {providedCourses.map((course) => <div key={course.id}><SearchComponent obj={course}/></div>)}
            </div>
        </div>
    );
}

export default Dashboard;