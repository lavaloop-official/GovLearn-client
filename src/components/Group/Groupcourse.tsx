import {Button} from "antd";
import "./GroupmemberCourses.css"
import {Course} from "../../interfaces";
import {DashSquare} from "react-bootstrap-icons";
import Recommendation from "../Recommendation";

function Groupcourse({course, admin, removeCourseFromUser}: {
    course: Course,
    admin: boolean,
    removeCourseFromUser?: (course: Course) => void
}) {

    const onRemoveCourseFromUser = () => {
        removeCourseFromUser!(course)
    }

    return (
        <div style={{position: "relative"}}>
            <Recommendation obj={course} style={{background: "#D9D9D9"}}/>
            {
                admin ?
                    <Button style={{position: "absolute", top: "95px", right: "10px", color: "red"}} type="text"
                            icon={<DashSquare style={{width: "25px", height: "25px"}}/>}
                            onClick={onRemoveCourseFromUser}></Button>
                    : <div/>
            }
        </div>
    )

}

export default Groupcourse;