import * as d3 from "d3";
import Slice from "./Slice.tsx";
import {useState} from "react";

function CircleSelect({sliceCount = 5, arcCount = 4}: { sliceCount?: number, arcCount?: number}) {
    const twoPIdivTen = 2 * Math.PI / 10;
    const dataInner = new Array(sliceCount).fill(1)
    const pie = d3.pie().startAngle(-twoPIdivTen).endAngle(2*Math.PI - twoPIdivTen)(dataInner);

    const [selected, setSelected] = useState<number[][]>(new Array(sliceCount).fill(new Array(arcCount).fill(false)));

    return pie.map((slice, index) => {
        return (
            <Slice
                key={index}
                radius={100}
                slice={slice}
                sliceColor={'#4f4f4f'}
                arcCount={arcCount}
            />

        );
    });
}
export default CircleSelect;
