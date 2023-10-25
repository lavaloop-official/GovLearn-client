import './App.css'
import {ConfigProvider, Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import CustomHeader from "./components/CustomHeader.tsx";
import Discover from "./pages/Discover.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Details from "./pages/Details.tsx";
import Profile from "./pages/Profile.tsx";


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
                    zIndex: "1000",
                    position: "sticky",
                    top: "0",
                    height: "100%"
                }}>
                    <CustomHeader/>
                </Header>
                <Content>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Discover/>}/>
                            <Route path="/detail" element={<Details/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                        </Routes>
                    </BrowserRouter>
                </Content>
            </Layout>
        </ConfigProvider>
    )
}

export default App
