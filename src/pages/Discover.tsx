import {Carousel, Divider} from "antd";
import CarouselPane from "../components/CarouselPane.tsx";
import RecomSlider from "../components/RecomSlider.tsx";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper.ts";

function Discover() {

    const [featured, setFeatured] = useState<number[]>([])
    const [recommended, setRecommended] = useState<{ title: string, content: number[] }[]>([])

    useEffect(() => {
        /*
        fetchWrapper.get(`api/v1/recommendations`).then((res) => {
            setFeatured(res.payload.featured)
        })
         */

        //testing code
        setTimeout(() => {
            setFeatured([1, 2, 3])
            setRecommended([{title: "Lerne Scrum", content: [1, 2, 3]}, {
                title: "Modellieren mit Icebricks",
                content: [1, 2, 3]
            }])
        }, Math.random() * 3000)

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
                                featured.map((item: number) => <div key={item}><CarouselPane id={item}/></div>)
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
                            recommended.map((item: { title: string, content: number[] }) =>
                                <RecomSlider key={item.title} title={item.title} data={item.content}/>)
                    }
                </div>
            </div>
        </>
    )
}

export default Discover;