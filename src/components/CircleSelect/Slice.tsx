import {useState} from "react";
import * as d3 from "d3";
import {animated, useSpring} from "@react-spring/web";
import './Slice.css'

function Slice({radius, slice, sliceColor, arcCount, label, click, focused, isSelected}: {
    radius: number,
    slice: d3.PieArcDatum<number>,
    sliceColor: string,
    arcCount: number,
    label: string,
    click: (index: string) => void,
    focused: number,
    isSelected: number
}) {

    const [modifier, setModifier] = useState<number[]>(new Array(arcCount).fill(2.3));

    const textspring = useSpring({scale: focused == 0 ? 1 : 0, opacity: focused == 0 ? 1 : 0})
    const slicespring = useSpring({scale: focused == 0 ? 1 : focused == 1 ? 2.3 : 0, opacity: focused == 0 ? 1 : 1})
    const descriptionspring = useSpring({opacity: focused == 1 ? 1 : 0, delay: 500})

    const handleClick = () => {
        click(`${slice.index}`);
    }

    const handleArcClick = (index: number) => {
        //console.log(`slice: ${slice.index}, arc: ${index}`);
        click(`${slice.index}-${index}`);
    }

    const onMouseOver = (level: number) => {
        const newModifier = new Array(arcCount).fill(2.3);
        newModifier[level] = 2.4;
        setModifier(newModifier);
    };

    const onMouseOut = () => {
        //console.log("out");
        setModifier(new Array(arcCount).fill(2.3));
    };

    const arrangedPaths = () => {
        const paths = [];
        const selected = modifier.findIndex((e) => e != 2.3);

        const names = ["Umsetzer", "Entscheidungsträger", "Stratege"]

        const x = Math.cos((slice.startAngle + slice.endAngle) / 2 + Math.PI * 1.5);
        const y = Math.sin((slice.startAngle + slice.endAngle) / 2 + Math.PI * 1.5);

        for (let i = 0; i < arcCount; i++) {
            const width = 0.82;
            const inner = i * (width + 0.02);
            const outer = inner + width;

            const middle = (inner + outer) / 2;

            const arc = d3.arc()
                .innerRadius(radius * inner + 20)
                .outerRadius(radius * outer + 20)
                .padAngle(0.01)
                .cornerRadius(5)

            const elem = <>
                <animated.path
                    key={i}
                    d={arc(slice) as string}
                    fill={isSelected == i ? "#31f491" : sliceColor}
                    onMouseOver={() => onMouseOver(i)}
                    onMouseOut={() => onMouseOut()}
                    style={{...slicespring}}
                    onClick={() => handleArcClick(i)}
                />
                <animated.text x={x * radius * (middle * 2.5 + 0.4)}
                               y={y * radius * (middle * 2.5 + 0.4)}
                               style={{fontSize: "13", fontWeight: "bold", ...descriptionspring}}
                               textAnchor={"middle"}>
                    {names[i]}
                </animated.text>
            </>
            paths.push(elem);
        }

        const elem = paths.splice(selected, 1)[0];
        paths.push(elem);

        return paths;
    }

    const fullslice = () => {
        const outer = 2.8;

        const arc = d3.arc()
            .innerRadius(2)
            .outerRadius(radius * outer)
            .padAngle(0.01)
            .cornerRadius(5)

        const angle = ((slice.startAngle + slice.endAngle) / 2) * 180 / Math.PI;

        let x = radius * 2.1 * Math.cos((slice.startAngle + slice.endAngle) / 2 + Math.PI * 1.5);
        const y = radius * 2.1 * Math.sin((slice.startAngle + slice.endAngle) / 2 + Math.PI * 1.5);

        if (angle == 90)
            x = x - 35;

        return (
            <>
                <animated.path
                    key={1}
                    fill={isSelected != -1 ? "#31f491" : sliceColor}
                    d={arc(slice) as string}
                    onClick={handleClick}
                    style={{...slicespring}}
                >
                </animated.path>
                <animated.text x={x} y={y + 6} textAnchor={"middle"}
                               style={{fontSize: "15", fontWeight: "bold", ...textspring}}
                               onClick={handleClick}>{label}</animated.text>
            </>
        );
    }


    return (
        <g>
            {focused == 1 ? arrangedPaths() : fullslice()}
        </g>
    );
}

export default Slice;