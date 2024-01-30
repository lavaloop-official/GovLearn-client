import React, {ReactNode, useState} from "react";
import "../../../components/Button.css";

interface MyButtonComponentProps {
    children: ReactNode;
    onClick: any;
}

function AnimatedButton({children, onClick}: MyButtonComponentProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            id="animatedButton"
            onClick={onClick}
            className={`animated-button ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{background: "cornflowerblue"}}
        >
            {children}
        </button>
    );
}

export default AnimatedButton;
