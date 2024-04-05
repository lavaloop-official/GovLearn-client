import './Deselect.css';
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {useState} from "react";

function Deselect({title, id, deselect}: { title: string, id: number, deselect: (id: number) => void }) {

    const [selected, setSelected] = useState<boolean>(true);

    const handleClick = () => {
        setSelected(selected => !selected);
        deselect(id);
    }

    return (
        <div className={`deselect ${selected ? "selected" : "not-selected"}`} onClick={handleClick} title={title}>
            <div className="deselect-inner">
                <span>{title}</span>
            </div>
            <div>{selected ? <StarFilled style={{color: "#59a1e5"}}/> : <StarOutlined/>}</div>
        </div>
    );
}

export default Deselect;