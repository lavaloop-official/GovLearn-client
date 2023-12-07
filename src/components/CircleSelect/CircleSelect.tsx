import * as d3 from "d3";
import Slice from "./Slice.tsx";

function CircleSelect() {
    const twoPIdivTen = 2 * Math.PI / 10;
    const dataInner = new Array(5).fill(1)
    const pie = d3.pie().startAngle(-twoPIdivTen).endAngle(2*Math.PI - twoPIdivTen)(dataInner);

    return pie.map((slice, index) => {
        console.log(slice);
        return (
            <Slice
                key={index}
                radius={100}
                slice={slice}
                sliceColor={'#4f4f4f'}
            />

        );
    });
}
export default CircleSelect;
