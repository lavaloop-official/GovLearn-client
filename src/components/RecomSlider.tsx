import { Button, Skeleton } from "antd";
import Recommendation from "./Recommendation.tsx";
import './RecomSlider.css'
import { Course } from "../interfaces.ts";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { timeout } from "d3";

/**
 * RecomSlider is a React component that displays a list of courses in a horizontally scrollable slider.
 * The slider supports both manual drag and navigation buttons for scrolling.
 *
 * @param {string} title - The title of the slider.
 * @param {Course[]} data - The list of courses to be displayed in the slider.
 */
function RecomSlider({ title, data }: { title?: string, data?: Course[] }) {

    // State variables for managing the slider's position, dragging status, transition effect and maximum scrollable distance.
    const [dragging, setDragging] = useState(false);
    const [max, setMax] = useState(740);
    const [leftButton, setLeftButton] = useState(false);
    const [rightButton, setRightButton] = useState(true);

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

    // Event handlers for mouse down, up, leave, and click events.
    const [isMouseDown, setIsMouseDown] = useState(false);

    const mouseCoords = useRef({
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0
    });
    const [isScrolling, setIsScrolling] = useState(false);

    const handleDragStart = (e) => {
        if (!ref.current) return
        const slider = ref.current;
        const startX = e.pageX - slider.offsetLeft;
        const startY = e.pageY - slider.offsetTop;
        const scrollLeft = slider.scrollLeft;
        const scrollTop = slider.scrollTop;
        mouseCoords.current = { startX, startY, scrollLeft, scrollTop }
        setIsMouseDown(true)
        document.body.style.cursor = "grabbing"
    }

    const handleDragEnd = () => {
        setIsMouseDown(false)
        if (!ref.current) return
        document.body.style.cursor = "default"
    }

    const onMouseLeave = () => {
        setIsMouseDown(false)
        if (!ref.current) return
        document.body.style.cursor = "default"
    }

    const handleDrag = (e) => {
        if (!isMouseDown || ! ref.current) return;
        e.preventDefault();
        const slider = ref.current;
        const x = e.pageX - slider.offsetLeft;
        const y = e.pageY - slider.offsetTop;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        const walkY = (y - mouseCoords.current.startY) * 1.5;
        slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
        slider.scrollTop = mouseCoords.current.scrollTop - walkY;
        //console.log(slider.scrollLeft)
        if(Math.abs(slider.scrollLeft) >= max){
            setRightButton(false);
            setLeftButton(true);
        }
        else if(Math.abs(slider.scrollLeft) < max && Math.abs(slider.scrollLeft) > 0){
            setRightButton(true);
            setLeftButton(true);
        }
        else if(Math.abs(slider.scrollLeft) <= 0){
            setRightButton(true);
            setLeftButton(false);
        }
    }

    const onclick = (e: React.MouseEvent<HTMLElement>) => {
        if (dragging)
            e.stopPropagation();
        setDragging(false);
    }

    // A function that adjusts the slider's position to align with the nearest course item.
    const snap = () => {
        if (max > 0) {
            if(ref.current){
                const offset = Math.abs(ref.current.scrollLeft % 240);

                if (Math.abs(ref.current.scrollLeft) >= max)
                    ref.current.scrollLeft = max;
                if (Math.abs(ref.current.scrollLeft) > 0)
                    ref.current.scrollLeft = 0;
                if (offset < 120)
                    ref.current.scrollLeft = ref.current.scrollLeft + offset;
                else
                    ref.current.scrollLeft = ref.current.scrollLeft - (240 - offset);
            }
        }
    }

    // A function that scrolls the slider when the navigation buttons are clicked.
    const navOnClick = (direction: "l" | "r") => {
        if(ref.current){
            if (direction == "l" && ref.current.scrollLeft > 0){
                ref.current.scrollLeft -= 240
                setRightButton(true);
            }
            else if(direction == "l" && ref.current.scrollLeft == 0){
                setRightButton(true);
                setLeftButton(false);
            }
            else if (direction == "r" && ref.current.scrollLeft < max) {
                if (ref.current.scrollLeft + 240 > max){
                        ref.current.scrollLeft = max
                        setRightButton(false);
                        setLeftButton(true);
                    }
                else{
                    ref.current.scrollLeft += 240
                    setLeftButton(true);
                }
        }
        //snap();
        }
    }

    const scrollTimer = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = (event) => {
        setIsScrolling(true)
        if(Math.abs(event.target.scrollLeft) == max){
            setRightButton(false);
            setLeftButton(true);
        }
        else if(Math.abs(event.target.scrollLeft) < max && Math.abs(event.target.scrollLeft) > 0){
            setRightButton(true);
            setLeftButton(true);
        }
        else if(Math.abs(event.target.scrollLeft) == 0){
            setRightButton(true);
            setLeftButton(false);
        }

        if (scrollTimer.current) {
            clearInterval(scrollTimer.current);
          }
      
          // Set a new timer to check for scroll stop after 200 milliseconds (adjust as needed)
          scrollTimer.current = setInterval(() => {
            setIsScrolling(false)
            clearInterval(scrollTimer.current);
          }, 200);
    }

    useEffect(() => {
        return () => {
          // Cleanup: clear the timer when the component unmounts
          if (scrollTimer.current) {
            clearInterval(scrollTimer.current);
          }
        };
      }, []);

    return (
        <>
            <div className="slider outer">
                {
                    title ?
                        <h1 style={{ margin: "0 0 5px 0" }}>{title}</h1>
                        : <Skeleton.Input active style={{ margin: "0 0 5px 0" }} />
                }

                <div onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onClickCapture={onclick}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={handleDrag}
                    className="slider inner" 
                    onScroll={handleScroll}
                    ref={ref}
                    style={{transition: "all 0.2s ease-in-out"}}>
                    {
                        data ?
                            data.map((item: Course) =>
                                <div key={item.id}>
                                    <Recommendation
                                        style={{
                                            pointerEvents: `${isScrolling? isMouseDown ? "none": "auto":"auto"}`,
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
                    icon={<RightOutlined />}
                    style={{ display: `${rightButton ? "block" : "none"}` }}
                    onClick={
                        () => navOnClick("r")
                    } />
                <Button className="showmore left"
                    type="text"
                    icon={<LeftOutlined />}
                    style={{ display: `${leftButton ? "block" : "none"}` }}
                    onClick={() => {
                        navOnClick("l");
                    }} />
            </div>
        </>
    );
}

export default RecomSlider;