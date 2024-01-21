import { Button, Skeleton } from "antd";
import Recommendation from "./Recommendation.tsx";
import './RecomSlider.css'
import { Course } from "../interfaces.ts";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

/**
 * RecomSlider is a React component that displays a list of courses in a horizontally scrollable slider.
 * The slider supports both manual drag and navigation buttons for scrolling.
 *
 * @param {string} title - The title of the slider.
 * @param {Course[]} data - The list of courses to be displayed in the slider.
 */
function RecomSlider({ title, data }: { title?: string, data?: Course[] }) {

    // State variables for managing the slider's position, dragging status, transition effect and maximum scrollable distance.
    const [translate, setTranslate] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [transition, setTransition] = useState(false);
    const [max, setMax] = useState(740);

    // A reference to the slider's DOM element.
    const ref = useRef<HTMLDivElement>(null);
    // The width of each course item in the slider.
    const contentWidth = 240;


    // A layout effect that updates the maximum scrollable distance when the window is resized.
    useLayoutEffect(() => {
        function updateSize() {
            if (ref.current && ref.current.offsetWidth) {
                setMax((data ? (data.length) * contentWidth : 0) - (ref.current.offsetWidth - 20))
            }
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [data, ref]);


    // A callback function that updates the slider's position when the mouse is moved.
    const listener = useCallback((e: MouseEvent) => {
        setTranslate(translate => {
            const offset = translate + e.movementX;

            if (offset < -max - 120)
                return -max - 120;

            return offset > 120 ? 120 : offset
        })
        if (e.movementX !== 0)
            setDragging(true);
    }, [max])

    // Event handlers for mouse down, up, leave, and click events.
    const onmousedown = (e: React.MouseEvent<HTMLElement>) => {
        if (max > 0) {
            window.addEventListener("mousemove", listener)
            e.preventDefault();
            setDragging(false)
        }
    }

    const onmouseup = (e: React.MouseEvent<HTMLElement>) => {
        window.removeEventListener("mousemove", listener)
        e.preventDefault();
        snap();
    }

    const onmouseleave = () => {
        window.removeEventListener("mousemove", listener)
        setDragging(false)
        snap();
    }

    const onclick = (e: React.MouseEvent<HTMLElement>) => {
        if (dragging)
            e.stopPropagation();
        setDragging(false);
    }

    // A function that adjusts the slider's position to align with the nearest course item.
    const snap = () => {
        if (max > 0) {
            setTransition(true);

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

    // A function that scrolls the slider when the navigation buttons are clicked.
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
        snap();
    }

    return (
        <>
            <div className="slider outer">
                {
                    title ?
                        <h1 style={{ margin: "0 0 5px 0" }}>{title}</h1>
                        : <Skeleton.Input active style={{ margin: "0 0 5px 0" }} />
                }

                <div onMouseDown={onmousedown}
                    onMouseUp={onmouseup}
                    onClickCapture={onclick}
                    onMouseLeave={onmouseleave}
                    className="slider inner"
                    ref={ref}>
                    {
                        data ?
                            data.map((item: Course) =>
                                <div key={item.id}>
                                    <Recommendation
                                        style={{
                                            transform: `translate(${translate}px)`,
                                            transition: `${transition ? "all 0.2s ease-in-out" : ""}`
                                        }}
                                        obj={item} />
                                </div>
                            )
                            :
                            <Recommendation />
                    }
                </div>
                <Button className="showmore right"
                    type="text"
                    icon={<RightOutlined/>}
                    style={{ display: `${Math.abs(translate) < max ? "block" : "none"}` }}
                    onClick={
                        () => navOnClick("r")
                    } />
                <Button className="showmore left"
                    type="text"
                    icon={<LeftOutlined/>}
                    style={{ display: `${translate < 0 ? "block" : "none"}` }}
                    onClick={() => {
                        navOnClick("l");
                    }} />
            </div>
        </>
    );
}

export default RecomSlider;