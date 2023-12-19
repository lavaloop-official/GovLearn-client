import * as d3 from "d3";
import Slice from "./Slice.tsx";
import {useState} from "react";
import {animated, useSpring} from "@react-spring/web";

function CircleSelect({sliceCount = 6, arcCount = 4}: { sliceCount?: number, arcCount?: number}) {

    const offset = 2 * Math.PI / sliceCount;
    const dataInner = new Array(sliceCount).fill(1)
    const pie = d3.pie().startAngle(-offset).endAngle(2 * Math.PI - offset)(dataInner);

    const label = ["Organisation", "Digitalisierung", "Informationstechnik", "Smart City", "Nicht-digital", "Personal"]

    const [selected, setSelected] = useState<number[]>(new Array(sliceCount).fill(0));
    const [middle, setMiddle] = useState<{x: number, y: number}>({x: 400, y: 400});

    const anim = useSpring({transform: `translate(${middle.x},${middle.y})`})

    const handleClick = (index: number) => {
        setoffset(index);
        const newSelected = new Array(sliceCount).fill(-1);
        newSelected[index] = 1;
        setSelected(newSelected);
        console.log(index);
    }

    const svghandleClick = (e) => {
        console.log(e);
        if(e.target.tagName == "svg") {
            setSelected(new Array(sliceCount).fill(0));
            setMiddle({x: 400, y: 400})
        }
    }

    const setoffset = (index) => {
        const offset = 2 * Math.PI / sliceCount;
        const angle = (index+1) * offset;
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const newMiddle = {x: 400 + x * 100, y: 400 + y * 100}
        setMiddle(newMiddle);
    }

    return (
        <svg height={800} width={800} style={{margin: "0 auto"}} className="pieSelect" onClick={svghandleClick}>
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
                            selected={selected[index]}
                        />

                    );
                })}
            </animated.g>
        </svg>
    )
}

export default CircleSelect;
