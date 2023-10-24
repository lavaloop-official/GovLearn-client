import './App.css'
import {Carousel, ConfigProvider, Divider, Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import CarouselPane from './CarouselPane.tsx';
import CustomHeader from "./CustomHeader.tsx";
import RecomSlider from "./RecomSlider.tsx";


function App() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Divider: {
                        verticalMarginInline: "0"
                    }
                },
            }}
        >
            <Layout className="layout">
                <Header style={{
                    display: 'flex',
                    background: "inherit",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                    padding: "0px 0px",
                    zIndex: "10000",
                    position: "sticky",
                    top: "0",
                    height: "100%"
                }}>
                    <CustomHeader/>
                </Header>
                <Content style={{
                    zIndex: "1",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <div style={{maxWidth: "1200px", margin: "auto", width: "100%", padding: "10px 10px"}}>
                        <Carousel autoplay={true} effect="fade">
                            <div>
                                <CarouselPane text="Bilden sie sich weiter jetzt hallo"/>
                            </div>
                            <div>
                                <CarouselPane text="lalalalalalal das ist ein Weiterbildungsangebot"
                                              src="https://www.langweiledich.net/wp-content/uploads/2018/03/die-skurrilsten-wtf-stock-photos_01.jpg"/>
                            </div>
                            <div>
                                <CarouselPane text="2"/>
                            </div>
                            <div>
                                <CarouselPane/>
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
                        <RecomSlider/>
                        <Divider style={{margin: "0px"}}/>
                        <RecomSlider/>
                        <Divider style={{margin: "0px"}}/>
                        <RecomSlider/>
                        <Divider style={{margin: "0px"}}/>
                        <RecomSlider/>
                        <Divider style={{margin: "0px"}}/>
                        <RecomSlider/>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    )
}

export default App
