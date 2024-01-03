import AddCourse from "../components/Dashboard/AddCourse";
import {Route, Routes} from "react-router-dom";
import NotFound from "./NotFound.tsx";
import DashOverview from "../components/Dashboard/DashOverview.tsx";

function Dashboard() {
    // TODO: update state on delete of SearchComponent
    // TODO: implement edit of SearchComponent

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