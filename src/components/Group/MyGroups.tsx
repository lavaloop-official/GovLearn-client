import { Button } from "antd";
import { Group } from "../../interfaces";

function MyGroups({group, setCurrentGroup} : { group: Group, setCurrentGroup: (group: Group) => void}) {

    const setToCurrentGroup=()=>{
        setCurrentGroup(group)
    }

    return (
        <Button style={{height:"fit-content", textAlign:"center", background:"grey", borderRadius:"5px", margin:"5px"}} type="primary" onClick={setToCurrentGroup}>
            <h3>{group.name}</h3>
        </Button>
    )
}

export default MyGroups;