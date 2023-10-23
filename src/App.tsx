import './App.css'
import {Avatar, Carousel, ConfigProvider, Layout} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import {Typography} from 'antd';
import CarouselPane from './CarouselPane.tsx';

const {Title} = Typography

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
                    height: "76px"
                }}>
                    <div style={{width: "100%", height: "56px"}}>
                        <div style={{
                            margin: "0 auto",
                            maxWidth: "1200px",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            verticalAlign: "middle",
                            gap: "10px",
                            padding: "0px 10px",
                        }}>
                            <Title level={3} style={{margin: "auto auto auto 0px", minWidth: "100px"}}>Govlearn</Title>
                            <Search placeholder="Kursangebote suchen" style={{maxWidth: "400px", margin: "auto"}}/>
                            <Avatar icon={<UserOutlined/>} style={{margin: "auto 0px auto auto", minWidth: "32px"}}/>
                        </div>
                        <div style={{width: "100%", height: "20px", background: "red"}}>
                        </div>
                    </div>

                </Header>
                <Content style={{zIndex: "1", display: "flex"}}>
                    <div style={{maxWidth: "1200px", margin: "auto", width: "100%", padding: "10px 10px"}}>
                        <Carousel autoplay={true} effect="fade">
                            <div>
                                <CarouselPane text="oi9sugsiouebgiu"/>
                            </div>
                            <div>
                                <CarouselPane text="lalalalalalal das ist ein Weiterbildungsangebot" src="https://www.langweiledich.net/wp-content/uploads/2018/03/die-skurrilsten-wtf-stock-photos_01.jpg"/>
                            </div>
                            <div>
                                <CarouselPane text="2"/>
                            </div>
                        </Carousel>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    )
}

export default App
