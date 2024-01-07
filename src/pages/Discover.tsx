import {Carousel} from "antd";
import CarouselPane from "../components/CarouselPane.tsx";
import RecomSlider from "../components/RecomSlider.tsx";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper.ts";
import {Course} from "../interfaces.ts";
import './Discover.css';

/**
 * Discover function component
 *
 * This component fetches and displays featured and recommended courses.
 * It uses the Carousel component to display the featured courses and the RecomSlider component to display the recommended courses.
 * The courses data is fetched from the API endpoint 'api/v1/recommendations/bundle'.
 *
 * @returns JSX.Element
 */
function Discover() {

    const [featured, setFeatured] = useState<Course[]>([])
    const [recommended, setRecommended] = useState<{ category: string, items: Course[] }[]>([])

    useEffect(() => {
        fetchWrapper.get(`api/v1/recommendations/bundle`).then((res) => {
            setFeatured(res.payload.featured)
            setRecommended(res.payload.categorized)
        })
    }, []);


    return (
        <>
            <div className="discover-container">
                <div className="carousel-container">
                    <Carousel autoplay={true}
                              effect="fade"
                              style={{
                                  borderRadius: "20px",
                                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              }}>
                        {
                            featured.length == 0 ? <CarouselPane/> :
                                featured.map((item: Course) => <div key={item.id}><CarouselPane obj={item}/></div>)
                        }
                    </Carousel>
                </div>
                <div className="recommended-container">
                    {
                        recommended.length == 0 ? <RecomSlider/> :
                            recommended.map((item: { category: string, items: Course[] }) => <div key={item.category}>
                                <RecomSlider title={item.category} data={item.items}/></div>)
                    }
                </div>
            </div>
        </>
    )
}

export default Discover;