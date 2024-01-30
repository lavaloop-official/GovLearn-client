import {Carousel, Segmented, Tour, TourProps} from "antd";
import CarouselPane from "../components/CarouselPane.tsx";
import RecomSlider from "../components/RecomSlider.tsx";
import {useEffect, useRef, useState} from "react";
import {fetchWrapper} from "../api/helper.ts";
import {Course} from "../interfaces.ts";
import './Discover.css';
import {AppstoreOutlined, BarsOutlined, CheckOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import Recommendation from "../components/Recommendation.tsx";
import {checkComplete, setComplete} from "../api/onboarding.ts";

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

    //onboarding tour stuff
    const featuredRef = useRef(null);
    const recommendedRef = useRef(null);
    const compactRef = useRef(null);
    const [tourOpen, setTourOpen] = useState<boolean>(false);
    const steps: TourProps['steps'] = [
        {
            title: "Empfehlungen",
            description: "Hier sehen Sie die Weiterbildungsangebote, die auf Basis ihren Rollen und Kompetenzen am besten zu Ihnen passen.",
            target: () => featuredRef.current,
            placement: "bottom",
            nextButtonProps: {
                children: (
                    <RightOutlined/>
                )
            },
        },
        {
            title: "Weitere Empfehlungen",
            description: "Hier sehen Sie Weiterbildungsangebote, nach den Kategorien geordnet, welche Zu ihren Rollen und Kompetenzen passen.",
            placement: "topRight",
            target: () => recommendedRef.current,
            nextButtonProps: {
                children: (
                    <RightOutlined/>
                )
            },
            prevButtonProps: {
                children: (
                    <LeftOutlined/>
                )
            },
        },
        {
            title: "Ansicht",
            description: "Hier können Sie die Ansicht der Empfehlungen ändern.",
            placement: "top",
            target: () => compactRef.current,
            prevButtonProps: {
                children: (
                    <LeftOutlined/>
                )
            },
            nextButtonProps: {
                children: (
                    <CheckOutlined/>
                ),
                style: {
                    color: "white",
                    backgroundColor: "green",
                }
            },
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
        document.title = "GovLearn - Weiterbildung einfach gemacht";
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
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
                padding: "0px 10px 10px 10px",
            }}>
                <div ref={featuredRef} style={{maxWidth: "1220px", marginTop: "10px", width: "100%"}}>
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
                    padding: "10px",
                    width: "100%",
                    marginTop: "10px",
                    position: "relative",
                    background: "#F9F9F9",
                    borderRadius: "20px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
                                    justifyContent: "flex-start",
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

            <Tour open={tourOpen} onClose={() => finishTour()} steps={steps} scrollIntoViewOptions={false}/>
        </>
    )
}

export default Discover;