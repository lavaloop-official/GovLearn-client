import {useState} from "react";
import * as d3 from "d3";

function Slice(props: { radius: number; slice: d3.PieArcDatum<number | {valueOf(): number}>; sliceColor: string; }) {
    const arccount = 4;

    const {radius, slice, sliceColor} = props;

    const [modifier, setModifier] = useState<number[]>(new Array(arccount).fill(0));
    const onMouseOver = (level: number) => {
        const newModifier = new Array(arccount).fill(0);
        newModifier[level] = 0.08;
        setModifier(newModifier);
    };

    const onMouseOut = () => {
        setModifier(new Array(arccount).fill(0));
    };

    const onMouseDown = () => {
        console.log("clicked" + modifier.findIndex((e) => e != 0));
    }

    const arrangedPaths = () => {
        const arcs = [];
        const selected = modifier.findIndex((e) => e != 0);

        for (let i = 0; i < arccount; i++) {
            const inner = i * 0.5 + 0.71;
            const outer = inner + 0.48;
            arcs.push(d3
                .arc()
                .innerRadius(radius * (inner - modifier[i]))
                .outerRadius(radius * (outer + modifier[i]))
                .padAngle(0.01)
                .cornerRadius(2)
            );
        }

        const paths = arcs.map((arc, index) => {
            return (
                <path
                    key={index}
                    d={arc(slice) as string}
                    fill={sliceColor}
                    onMouseOver={() => onMouseOver(index)}
                    onMouseOut={() => onMouseOut()}
                    onMouseDown={onMouseDown}
                />
            );
        })

        const elem = paths.splice(selected, 1)[0];
        paths.push(elem);

        return paths;
    }

    return (
        <g>
            {arrangedPaths()}
        </g>
    );
}

export default Slice;