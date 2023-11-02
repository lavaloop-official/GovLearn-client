import {Carousel, Divider} from "antd";
import CarouselPane from "../components/CarouselPane.tsx";
import RecomSlider from "../components/RecomSlider.tsx";

function Discover() {
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
                        <div>
                            <CarouselPane text="Bilden sie sich weiter jetzt hallo" src={undefined} description={undefined}/>
                        </div>
                        <div>
                            <CarouselPane text="lalalalalalal das ist ein Weiterbildungsangebot"
                                          src="https://www.langweiledich.net/wp-content/uploads/2018/03/die-skurrilsten-wtf-stock-photos_01.jpg"
                            description="ja das ist die Beschreibung hallooooo. cooles angebot hier lalalalalalalla"/>
                        </div>
                        <div>
                            <CarouselPane text="2" src={undefined} description={undefined}/>
                        </div>
                        <div>
                            <CarouselPane text={undefined} src={undefined} description={undefined}/>
                        </div>
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
                    <Divider style={{margin: "0px", maxWidth: "1100px"}}/>
                    <RecomSlider title="Lerne Scrum"/>
                    <Divider style={{margin: "0px"}}/>
                    <RecomSlider title={"Modellieren mit Icebricks"}/>
                    <Divider style={{margin: "0px"}}/>
                    <RecomSlider title={"Unlearning: Schaffe Platz für Neues"}/>
                    <Divider style={{margin: "0px"}}/>
                    <RecomSlider title={"So benutze ich Microsoft Teams"}/>
                    <Divider style={{margin: "0px"}}/>
                    <RecomSlider title={"Zeitmanagement: Grundlagen"}/>
                </div>
            </div>
        </>
    )
}

export default Discover;