import * as d3 from "d3";
import Slice from "./Slice.tsx";
import {useState} from "react";
import {animated, useSpring} from "@react-spring/web";

function CircleSelect({sliceCount = 6, arcCount = 3, selectCallback, selected}: {
    sliceCount?: number,
    arcCount?: number,
    selectCallback: (name: string) => void,
    selected: number[]
}) {

    const offset = 2 * Math.PI / sliceCount;
    const dataInner = new Array(sliceCount).fill(1)
    const pie = d3.pie().startAngle(-offset).endAngle(2 * Math.PI - offset)(dataInner);

    const label = ["Organisation", "Digitalisierung", "Informationstechnik", "Smart City", "Nicht-digital", "Personal"]

    const [focused, setFocused] = useState<number[]>(new Array(sliceCount).fill(0));
    const [middle, setMiddle] = useState<{ x: number, y: number }>({x: 300, y: 300});

    const anim = useSpring({transform: `translate(${middle.x},${middle.y})`})

    const handleClick = (index: string) => {
        if (!index.includes("-")) {
            const i = parseInt(index);
            setoffset(i);
            const newSelected = new Array(sliceCount).fill(-1);
            newSelected[i] = 1;
            setFocused(newSelected);
        } else {
            selectCallback(index);
            resetCircle()
        }
    }

    const resetCircle = () => {
        setFocused(new Array(sliceCount).fill(0));
        setMiddle({x: 300, y: 300})
    }

    const svghandleClick = (e) => {
        if (e.target.tagName == "svg") {
            resetCircle()
        }
    }

    const setoffset = (index: number) => {
        const offset = 2 * Math.PI / sliceCount;
        const angle = (index + 1) * offset;
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const newMiddle = {x: 300 + x * 200, y: 300 + y * 200}
        setMiddle(newMiddle);
    }

    return (
        <svg height={600} width={600} style={{margin: "0 auto"}} className="pieSelect" onClick={svghandleClick}>
            <animated.g {...anim}>
                {pie.map((slice, index) => {
                    return (
                        <Slice
                            key={index}
                            radius={70}
                            slice={slice}
                            sliceColor={'#a9a9a9'}
                            arcCount={arcCount}
                            label={label[index]}
                            click={handleClick}
                            focused={focused[index]}
                            isSelected={selected[index]}
                        />

                    );
                })}
            </animated.g>
        </svg>
    )
}

export default CircleSelect;
