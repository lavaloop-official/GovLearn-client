import { Button } from "antd";
import { Group } from "../../interfaces";
import "./GroupmemberCourses.css";

function MyGroups({group, setCurrentGroup} : { group: Group, setCurrentGroup: (group: Group) => void}) {

    const setToCurrentGroup=()=>{
        setCurrentGroup(group)
    }

    return (
        <Button style={{height:"fit-content", textAlign:"center", background:"grey", borderRadius:"5px", margin:"5px", overflow:"auto"}} type="primary" className="scrollbar" onClick={setToCurrentGroup}>
            <h3>{group.groupName}</h3>
        </Button>
    )
}

export default MyGroups;