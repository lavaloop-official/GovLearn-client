import {Carousel, Segmented} from "antd";
import CarouselPane from "../components/CarouselPane.tsx";
import RecomSlider from "../components/RecomSlider.tsx";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper.ts";
import {Course} from "../interfaces.ts";
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import Recommendation from "../components/Recommendation.tsx";

function Discover() {

    const [featured, setFeatured] = useState<Course[]>([])
    const [recommended, setRecommended] = useState<{ category: string, items: Course[] }[]>([])
    const [compact, setCompact] = useState<boolean>(false)

    useEffect(() => {
        document.title = "GoLearn - Weiterbildung einfach gemacht";
        fetchWrapper.get(`api/v1/recommendations/bundle`).then((res) => {
            setFeatured(res.payload.featured)
            setRecommended(res.payload.categorized)
        })
    }, []);

    const changeView = () => {
        setCompact(prevState => !prevState)
    }


    return (
        <>
            <div style={{
                zIndex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems:"center",
                flexDirection: "column",
                gap: "10px",
                padding:"0px 10px 10px 10px",
            }}>
                <div style={{maxWidth: "1220px", marginTop:"10px", width: "100%"}}>
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
                    maxWidth: "1220px",
                    padding:"10px",
                    width: "100%",
                    marginTop:"10px",
                    position: "relative",
                    background: "#F9F9F9",
                    borderRadius: "20px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}>
                    <div style={{margin: "10px", display: "block", marginLeft: "auto"}}>
                        <Segmented
                            options={[
                                {label: 'Nach Kategorie', value: 'List', icon: <BarsOutlined/>},
                                {label: 'Kompakte Ansicht', value: 'Kanban', icon: <AppstoreOutlined/>},
                            ]}
                            onChange={() => changeView()}
                        />
                    </div>
                    {
                        compact ?
                            <div style={{
                                display: "flex",
                                justifyContent:"flex-start",
                                flexWrap: "wrap"
                            }}>{recommended
                                .map((e) => e.items)
                                .flat()
                                .map((item) => <Recommendation obj={item}/>)}</div>
                            :
                            recommended.length == 0 ? <RecomSlider/> :
                                recommended.map((item: { category: string, items: Course[] }) => <div
                                    key={item.category}>
                                    <RecomSlider title={item.category} data={item.items}/></div>)

                    }
                </div>
            </div>
        </>
    )
}

export default Discover;