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
import Bookmarks from "./pages/Bookmarks.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Groups from "./pages/Groups.tsx";

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
                    <Layout className="layout" style={{ minHeight: "100vh" }}>
                        <Header>
                            <CustomHeader/>
                        </Header>
                        <Content>
                            <Routes>
                                <Route index element={<Landing/>}/>
                                <Route path="/discover" element={<Protected><Discover/></Protected>}/>
                                <Route path="/detail/*" element={<Protected><Details/></Protected>}/>
                                <Route path="/profile" element={<Protected><Profile/></Protected>}/>
                                <Route path="/register" element={<Protected><Registration/></Protected>}/>
                                <Route path="/bookmarks" element={<Protected><Bookmarks/></Protected>}/>
                                <Route path="/searching/:searchString?" element={<Protected><Searching/></Protected>}/>
                                <Route path="*" element={<NotFound/>}/>
                                <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
                                <Route path="/groups" element={<Protected><Groups/></Protected>}/>
                            </Routes>
                        </Content>
                        <Footer>Govlearn  -  Made with ❤ in Münster</Footer>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    )
}

export default App
