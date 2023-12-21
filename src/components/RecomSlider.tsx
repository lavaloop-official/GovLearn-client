import {Button, Skeleton} from "antd";
import Recommendation from "./Recommendation.tsx";
import './RecomSlider.css'

import 'react-multi-carousel/lib/styles.css';
import {Course} from "../interfaces.ts";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import React, {useCallback, useLayoutEffect, useRef, useState} from "react";

function RecomSlider({title, data}: { title?: string, data?: Course[] }) {

    const [translate, setTranslate] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [transition, setTransition] = useState(false);

    const ref = useRef<any>(null);
    const contentWidth = 240;

    const [max, setMax] = useState(740);

    useLayoutEffect(() => {
        function updateSize() {
            //console.log(ref.current.offsetWidth)
            if (ref.current && ref.current.offsetWidth) {
                setMax((data ? (data.length) * contentWidth : 0) - (ref.current.offsetWidth - 20))
                //console.log((data ? (data.length) * contentWidth : 0) - (ref.current.offsetWidth - 20))
            }
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [data, ref]);


    const listener = useCallback((e: MouseEvent) => {
        setTranslate(translate => {
            const offset = translate + e.movementX;

            //console.log(offset)
            console.log(translate)

            if (offset < -max - 120)
                return -max - 120;

            return offset > 120 ? 120 : offset
        })
        if (e.movementX !== 0)
            setDragging(true);
    }, [max])

    const onmousedown = (e: React.MouseEvent<HTMLElement>) => {
        if(max > 0){
            //console.log("mousedown")
            window.addEventListener("mousemove", listener)
            e.preventDefault();
            setDragging(false)
        }
    }

    const onmouseup = (e: React.MouseEvent<HTMLElement>) => {
        //console.log("mouseup")
        window.removeEventListener("mousemove", listener)
        e.preventDefault();
        snap();
    }

    const onmouseleave = () => {
        //console.log("mouseleave")
        window.removeEventListener("mousemove", listener)
        setDragging(false)
        snap();
    }

    const onclick = (e: React.MouseEvent<HTMLElement>) => {
        //console.log("click")
        if (dragging)
            e.stopPropagation();
        setDragging(false);
    }

    const snap = () => {
        if(max > 0) {
            setTransition(true);

            console.log("translate: " + translate)
            console.log("max: " + max)

            setTranslate(translate => {
                const offset = Math.abs(translate % 240);

                if (-translate >= max)
                    return -max;
                if (translate > 0)
                    return 0;
                if (offset < 120)
                    return translate + offset;
                else
                    return translate - (240 - offset);
            })

            setTimeout(() => {
                setTransition(false);
            }, 200);
        }
    }

    const navOnClick = (direction: "l" | "r") => {
        setTransition(true);
        if (direction == "l" && translate < 0)
            setTranslate(translate => translate + 240);
        else if (direction == "r" && Math.abs(translate) < max) {
            if (Math.abs(translate) + 240 > max)
                setTranslate(-max);
            else
                setTranslate(translate => translate - 240);
        }
    }

    return (
        <>
            <div id="slider" style={{
                maxWidth: "1200px",
                padding: "0px 10px",
                width: "100%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}>
                {
                    title ?
                        <h1 style={{margin: "0 0 5px 0"}}>{title}</h1>
                        : <Skeleton.Input active style={{margin: "0 0 5px 0"}}/>
                }

                <div onMouseDown={onmousedown} onMouseUp={onmouseup} onClickCapture={onclick}
                     onMouseLeave={onmouseleave} className="slider" ref={ref}
                     style={{
                         background: "#D9D9D9",
                         display: "flex",
                         flexDirection: "row",
                         overflowX: "hidden",
                         padding: "10px 10px",
                         borderRadius: "20px",
                         position: "relative",
                     }}>
                    {
                        data ?
                            data.map((item: Course) => <div key={item.id}><Recommendation
                                style={{
                                    transform: `translate(${translate}px)`,
                                    transition: `${transition ? "all 0.2s ease-in-out" : ""}`
                                }} obj={item}/></div>)
                            : <Recommendation/>
                    }
                </div>
                <Button className="showmore right" type="text" icon={<RightOutlined />}
                        style={{display: `${Math.abs(translate) < max ? "block" : "none"}`}}
                        onClick={() => navOnClick("r")}/>
                <Button className="showmore left" type="text" icon={<LeftOutlined/>}
                        style={{display: `${translate < 0 ? "block" : "none"}`}}
                        onClick={() => {navOnClick("l"); snap()}}/>
            </div>

        </>
    );
}

export default RecomSlider;