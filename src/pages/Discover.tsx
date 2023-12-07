import {Carousel} from "antd";
import CarouselPane from "../components/CarouselPane.tsx";
import RecomSlider from "../components/RecomSlider.tsx";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper.ts";
import {Course} from "../interfaces.ts";

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
            <div style={{
                zIndex: "1",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px"
            }}>
                <div style={{maxWidth: "1200px", margin: "auto", width: "100%", padding: "10px 10px"}}>
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
                <div style={{
                    zIndex: "1",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "1200px",
                    width: "100%",
                    margin: "auto",
                }}>
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