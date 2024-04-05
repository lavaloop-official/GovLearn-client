import './App.css'
import {ConfigProvider, Divider, Flex, Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import CustomHeader from "./components/header/CustomHeader.tsx";
import Discover from "./pages/discover/Discover.tsx";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Details from "./pages/detail/Details.tsx";
import Profile from "./pages/profile/Profile.tsx";
import Landing from "./pages/landing/Landing.tsx";
import Registration from "./pages/register/Registration.tsx";
import Searching from "./pages/search/Searching.tsx";
import {Provider} from "react-redux";
import reduxStore from "./state/reduxStore.ts";
import Protected from "./components/Protected.tsx";
import Bookmarks from "./pages/bookmark/Bookmarks.tsx";
import NotFound from "./pages/misc/NotFound.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Groups from "./pages/group/Groups.tsx";
import ResetPassword from "./pages/misc/ResetPassword.tsx";
import Imprint from "./pages/imprint/Imprint.tsx";
import Competences from './pages/competences/Competences.tsx';

/**
 * Main App component
 * @returns JSX.Element
 */
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
            <Provider store={reduxStore}>
                <BrowserRouter>
                    <Layout className="layout">
                        <Header>
                            <CustomHeader/>
                        </Header>
                        <Content>
                            <Routes>
                                <Route index element={<Landing/>}/>
                                <Route path="/discover" element={<Protected><Discover/></Protected>}/>
                                <Route path="/detail/*" element={<Protected><Details/></Protected>}/>
                                <Route path="/profile" element={<Protected><Profile/></Protected>}/>
                                <Route path="/register/*" element={<Protected><Registration/></Protected>}/>
                                <Route path="/bookmarks" element={<Protected><Bookmarks/></Protected>}/>
                                <Route path="/searching/:searchString?" element={<Protected><Searching/></Protected>}/>
                                <Route path="/reset-password/*" element={<ResetPassword/>}/>
                                <Route path="/dashboard/*" element={<Protected><Dashboard/></Protected>}/>
                                <Route path="/competences" element={<Protected><Competences/></Protected>}/>
                                <Route path="/groups" element={<Protected><Groups/></Protected>}/>
                                <Route path="/imprint" element={<Imprint/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </Content>
                        <Footer>
                            <Flex justify='center' align='center' gap='50px'>
                                <a style={{
                                    textAlign: "left",
                                    width: "fit-content",
                                    textDecoration: "None",
                                    color: "black"
                                }} href='/discover'>GovLearn</a>
                                <Divider type='vertical' style={{background: "black"}}/>
                                <p style={{textAlign: "center", width: "fit-content"}}>Made with ❤ in Münster</p>
                                <Divider type='vertical' style={{background: "black"}}/>
                                <Link style={{
                                    textAlign: "right",
                                    width: "fit-content",
                                    textDecoration: "None",
                                    color: "black"
                                }} to='/imprint'>Impressum</Link>
                            </Flex>
                        </Footer>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    )
}

export default App
