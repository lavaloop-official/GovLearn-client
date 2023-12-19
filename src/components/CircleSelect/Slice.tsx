import {useState} from "react";
import * as d3 from "d3";
import {animated, useSpring} from "@react-spring/web";

function Slice({radius, slice, sliceColor, arcCount, label, click, selected}: {
    radius: number,
    slice: d3.PieArcDatum<number>,
    sliceColor: string,
    arcCount: number,
    label: string,
    click: (index: number) => void,
    selected: number
}) {

    const [modifier, setModifier] = useState<number[]>(new Array(arcCount).fill(0));

    const textspring = useSpring({scale: selected == 0 ? 1: 0, opacity: selected == 0 ? 1 : 0})
    const slicespring = useSpring({scale: selected == 0 ? 1 : selected == 1 ? 2 : 0.3, opacity: selected == 0 ? 1 : 1})

    const handleClick = () => {
        click(slice.index);
    }

    const onMouseOver = (level: number) => {
        const newModifier = new Array(arcCount).fill(0);
        newModifier[level] = 0.08;
        setModifier(newModifier);
    };

    const onMouseOut = () => {
        setModifier(new Array(arcCount).fill(0));
    };

    const arrangedPaths = () => {
        const paths = [];
        const selected = modifier.findIndex((e) => e != 0);

        const names = ["Umsetzer", "Entscheidungsträger", "Stratege", "Informationstechnik"]

        const x = Math.cos((slice.startAngle + slice.endAngle) / 2 + Math.PI * 1.5);
        const y = Math.sin((slice.startAngle + slice.endAngle) / 2 + Math.PI * 1.5);

        for (let i = 0; i < arcCount; i++) {
            const width = 0.61;
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
                    fill={sliceColor}
                    onMouseOver={() => onMouseOver(i)}
                    onMouseOut={() => onMouseOut()}
                    style={{...slicespring}}
                />
                <text x={x * radius * (middle * 2 + 0.4)}
                      y={y * radius * (middle * 2 + 0.4)}
                      style={{fontSize: "13", fontWeight: "bold"}}
                      textAnchor={"middle"}>
                    {names[i]}
                </text>
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
                    fill={sliceColor}
                    d={arc(slice) as string}
                    onClick={handleClick}
                    style={{...slicespring}}
                >
                </animated.path>
                <animated.text x={x} y={y + 6} textAnchor={"middle"} style={{fontSize: "15", fontWeight: "bold", ...textspring}}
                      onClick={handleClick}>{label}</animated.text>
            </>
        );
    }


    return (
        <g>
            {selected == 1 ? arrangedPaths() : fullslice()}
        </g>
    );
}

export default Slice;