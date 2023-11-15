import { Skeleton } from "antd";
import Recommendation from "./Recommendation.tsx";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1200},
        items: 5,
        slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
        breakpoint: {max: 1200, min: 950},
        items: 4,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: {max: 950, min: 700},
        items: 3,
        slidesToSlide: 1
    },
    small: {
        breakpoint: {max: 700, min: 0},
        items: 1,
        slidesToSlide: 1
    }

};

function RecomSlider({title, data}: { title?: string, data?: number[] }) {
    return (
        <>
            <div id="slider" style={{
                maxWidth: "1200px",
                padding: "0px 10px",
                width: "100%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
            }}>
                {
                    title ?
                        <h1 style={{margin: "0 0 5px 0"}}>{title}</h1>
                        : <Skeleton.Input active style={{margin: "0 0 5px 0"}}/>
                }

                <div style={{background: "#D9D9D9", borderRadius: "20px", padding: "10px"}}>
                    <Carousel responsive={responsive}>
                        {
                            data ?
                            data.map((item: number) => <div key={item}><Recommendation id={item}/></div>)
                            : <Recommendation/>
                        }
                    </Carousel>
                </div>

            </div>
        </>
    );
}

export default RecomSlider;