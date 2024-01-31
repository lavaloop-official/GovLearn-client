import AddCourse from "./components/AddCourse.tsx";
import {Route, Routes} from "react-router-dom";
import NotFound from "../misc/NotFound.tsx";
import DashOverview from "./components/DashOverview.tsx";

function Dashboard() {
    // TODO: update state on delete of ListComponent
    // TODO: implement edit of ListComponent

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