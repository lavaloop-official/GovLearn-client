import './Deselect.css';
import {StarOutlined, StarTwoTone} from "@ant-design/icons";
import {useState} from "react";

function Deselect({title}: { title: string }) {

    const [selected, setSelected] = useState<boolean>(true);

    const handleClick = () => {
        setSelected(selected => !selected);
    }

    return (
        <div className={`deselect ${selected ? "selected" : "not-selected"}`} onClick={handleClick} title={title}>
            <div className="deselect-inner">
                <span>{title}</span>
            </div>
            <div>{selected ? <StarTwoTone/> : <StarOutlined/>}</div>
        </div>
    );
}

export default Deselect;