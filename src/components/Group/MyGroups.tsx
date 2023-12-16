import { Button } from "antd";

function MyGroups({name} : { name?: string}) {

    return (
        <Button style={{height:"fit-content", textAlign:"center", background:"grey", borderRadius:"5px", margin:"5px"}} type="primary">
            <h3>{name}</h3>
        </Button>
    )
}

export default MyGroups;