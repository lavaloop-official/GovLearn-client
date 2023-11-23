import './App.css'
import {ConfigProvider, Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import CustomHeader from "./components/Header/CustomHeader.tsx";
import Discover from "./pages/Discover.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Details from "./pages/Details.tsx";
import Profile from "./pages/Profile.tsx";
import Landing from "./pages/Landing.tsx";
import Registration from "./pages/Registration.tsx";
import Searching from "./pages/Searching.tsx";
import {Provider} from "react-redux";
import reduxStore from "./state/reduxStore.ts";
import Protected from "./Protected.tsx";

function App() {
    //TODO: remove inline styles from components
    //TODO: refactor redux login modal state management
    //TODO: remove any types
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
            <Provider store={reduxStore}>
                <BrowserRouter>
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
                            <Routes>
                                <Route index element={<Landing/>}/>
                                <Route path="/discover" element={<Protected><Discover/></Protected>}/>
                                <Route path="/detail/*" element={<Protected><Details title={''}/></Protected>}/>
                                <Route path="/profile" element={<Protected><Profile/></Protected>}/>
                                <Route path="/register" element={<Protected><Registration/></Protected>}/>
                                <Route path="/search/*" element={<Protected><Searching/></Protected>}/>
                            </Routes>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Govlearn  -  Made with ❤ in Münster</Footer>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    )
}

export default App
