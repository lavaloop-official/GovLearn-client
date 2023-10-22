import './App.css'
import {Avatar, ConfigProvider, Layout, Menu} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import {Typography} from 'antd';

const {Title} = Typography

function App() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        horizontalLineHeight: "30px"
                    },
                },
            }}
        >
            <Layout className="layout">
                <Header style={{
                    display: 'flex',
                    background: "inherit",
                    padding: "0px 10px",
                    height: "60px",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                    zIndex: "10000",
                    position: "sticky",
                    top: "0"
                }}>
                    <div style={{
                        margin: "0 auto",
                        maxWidth: "1200px",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        verticalAlign: "middle",
                        gap: "10px"
                    }}>
                        <Title level={3} style={{margin: "auto auto auto 0px", minWidth: "100px"}}>Govlearn</Title>
                        <Search placeholder="Kursangebote suchen" style={{maxWidth: "400px", margin: "auto"}}/>
                        <Avatar icon={<UserOutlined/>} style={{margin: "auto 0px auto auto", minWidth: "32px"}}/>
                    </div>
                </Header>
                <Content style={{zIndex: "1", display: "flex"}}>
                    <div style={{
                        margin: "0 auto",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        verticalAlign: "middle"
                    }}>
                        <Menu
                            style={{flex: "auto", background: "inherit", margin: " 0 auto"}}
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            items={new Array(3).fill(null).map((_, index) => {
                                const key = index + 1;
                                return {
                                    key,
                                    label: `nav ${key}`,
                                };
                            })}
                        />
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    )
}

export default App
