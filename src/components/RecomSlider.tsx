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

function RecomSlider({title = "Empfehlung"}: { title: string }) {
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
                <h1 style={{margin: "0 0 5px 0"}}>{title}</h1>

                <Carousel responsive={responsive}>
                    <Recommendation title={""} src={"https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"} ribbon={""}/>
                    <Recommendation
                        src={"https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"} title={""} ribbon={""}/>
                    <Recommendation title={""} src={"https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"} ribbon={""}/>
                    <Recommendation
                        src={"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"} title={""} ribbon={""}/>
                    <Recommendation title={""} src={"https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"} ribbon={""}/>
                    <Recommendation title={""} src={"https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"} ribbon={""}/>
                    <Recommendation title={""} src={"https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"} ribbon={""}/>
                    <Recommendation title={""} src={"https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"} ribbon={""}/>
                </Carousel>

                {/*<div style={{background: "#D9D9D9", borderRadius: "20px", padding: "10px"}}>
                    <Carousel responsive={responsive}>
                        <Recommendation/>
                        <Recommendation
                            src={"https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"}/>
                        <Recommendation/>
                        <Recommendation
                            src={"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}/>
                        <Recommendation/>
                        <Recommendation/>
                        <Recommendation/>
                        <Recommendation/>
                    </Carousel>
                </div>
                */}

            </div>
        </>
    );
}

export default RecomSlider;