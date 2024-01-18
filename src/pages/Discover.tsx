import {Carousel, Segmented, Tour, TourProps, TourStepProps} from "antd";
import CarouselPane from "../components/CarouselPane.tsx";
import RecomSlider from "../components/RecomSlider.tsx";
import {useEffect, useRef, useState} from "react";
import {fetchWrapper} from "../api/helper.ts";
import {Course} from "../interfaces.ts";
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import Recommendation from "../components/Recommendation.tsx";
import {checkComplete, setComplete} from "../api/onboarding.ts";

function Discover() {

    //onboarding tour stuff
    const featuredRef = useRef(null);
    const recommendedRef = useRef(null);
    const compactRef = useRef(null);
    const [tourOpen, setTourOpen] = useState<boolean>(false);
    const steps: TourProps['steps'] = [
        {
            title: "Empfehlungen",
            description: "Hier sehen Sie die Empfehlungen, die auf Basis Ihrer Rolle und Kompetenzen am besten zu Ihnen passen.",
            target: () => featuredRef.current
        },
        {
            title: "Weitere Empfehlungen",
            description: "Hier sehen sie weitere Empfehlungen die zu Ihnen passen.",
            target: () => recommendedRef.current
        },
        {
            title: "Ansicht",
            description: "Hier können Sie die Ansicht der Empfehlungen ändern.",
            target: () => compactRef.current
        }
    ]
    const finishTour = () => {
        setTourOpen(false)
        setComplete("discover")
    }

    const [featured, setFeatured] = useState<Course[]>([])
    const [recommended, setRecommended] = useState<{ category: string, items: Course[] }[]>([])
    const [compact, setCompact] = useState<boolean>(false)

    useEffect(() => {
        setTourOpen(!checkComplete("discover"))
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
                flexDirection: "column",
                gap: "10px"
            }}>
                <div ref={featuredRef}
                     style={{maxWidth: "1200px", margin: "auto", width: "100%", padding: "10px 10px"}}>
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
                    position: "relative"
                }}>
                    <div style={{margin: "10px", display: "block", marginLeft: "auto"}} ref={compactRef}>
                        <Segmented
                            options={[
                                {label: 'Nach Kategorie', value: 'List', icon: <BarsOutlined/>},
                                {label: 'Kompakte Ansicht', value: 'Kanban', icon: <AppstoreOutlined/>},
                            ]}
                            onChange={() => changeView()}
                        />
                    </div>
                    <div>
                        {
                            compact ?
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap"
                                }}>{recommended
                                    .map((e) => e.items)
                                    .flat()
                                    .map((item) => <Recommendation obj={item}/>)}</div>
                                :
                                recommended.length == 0 ? <RecomSlider/> :
                                    recommended.map((item: { category: string, items: Course[] }, index) => <div
                                        key={item.category}
                                        ref={index == 0 ? recommendedRef : null}>
                                        <RecomSlider title={item.category} data={item.items}/></div>)
                        }
                    </div>
                </div>
            </div>

            <Tour open={tourOpen} onClose={() => finishTour()} steps={steps}/>
        </>
    )
}

export default Discover;