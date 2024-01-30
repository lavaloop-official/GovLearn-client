import {Button} from "antd";
import {Group} from "../../../constants/interfaces.ts";
import "./GroupmemberCourses.css";

function MyGroups({group, setCurrentGroup, selected = false}: {
    group: Group,
    setCurrentGroup: (group: Group) => void,
    selected: boolean
}) {

    const setToCurrentGroup = () => {
        setCurrentGroup(group)
    }

    return (
        selected ?
            <Button style={{
                color: "white",
                textAlign: "left",
                background: "cornflowerblue",
                borderRadius: "5px",
                margin: "5px",
                overflow: "auto"
            }} type="primary" className="scrollbar" onClick={setToCurrentGroup}>
                <b>{group.groupName}</b>
            </Button>
            :
            <Button style={{
                color: "#3F3F3F",
                textAlign: "left",
                background: "white",
                borderRadius: "5px",
                margin: "5px",
                overflow: "auto"
            }} type="primary" className="scrollbar" onClick={setToCurrentGroup}>
                <b>{group.groupName}</b>
            </Button>
    )
}

export default MyGroups;