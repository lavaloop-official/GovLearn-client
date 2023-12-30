import {Avatar, Button, Col, Dropdown, MenuProps, Row, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import SubHeader from "./SubHeader.tsx";
import {openLoginModal} from "../../state/modalutil.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../state/reduxStore.ts";
import {fetchWrapper} from "../../api/helper";
import {clearToken} from "../../api/auth.ts";
import Searchbar from "../Searchbar.tsx";
import './CustomHeader.css'

const {Title} = Typography

function CustomHeader() {

    const [subHeader, setSubHeader] = useState(<div style={{height: "32px", width: "1px"}}/>)

    //TODO: implement global state for logged in
    const loggedIn = useSelector((state: RootState) => state.auth.auth)

    const location = useLocation();

    const [name, setName] = useState('')

    useEffect(() => {
        if (location.pathname.includes("discover") || location.pathname.includes("detail") || location.pathname.includes("profile") || location.pathname.includes("searching") || location.pathname.includes("bookmarks")) {
            setSubHeader(<SubHeader/>)
        } else {
            setSubHeader(<></>)
        }
        if (loggedIn)
            fetchWrapper.get('api/v1/users').then(res => setName(res.payload.name))
    }, [location.pathname])

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a rel="noopener noreferrer" href="profile">
                    Eingeloggt als:
                    <span style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        maxWidth: "120px",
                        display: "block",
                    }}>
                    {name}
                </span>

                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a rel="noopener noreferrer" href="/dashboard">
                    Weiterbildungsangebote verwalten
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Einstellungen
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a onClick={() => {
                    clearToken("logout")
                }}>
                    Ausloggen
                </a>
            ),
            danger: true,
        },
    ];

    return (
        <div style={{width: "100%", height: "100%"}}>
            <Row>
                <Col span={8}>
                    <Title level={3}>
                        <a href="/discover" style={{color: "#212321"}}>
                            Govlearn
                        </a>
                    </Title>
                </Col>
                <Col span={8}>
                    {loggedIn && !location.pathname.includes("searching") ?
                        <Searchbar/>
                        : <></>
                    }
                </Col>
                <Col span={8}>
                    {loggedIn ?
                        <div className="avatar">
                            <Dropdown menu={{items}} placement="bottomRight" arrow={{pointAtCenter: true}}
                                      trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Avatar icon={<UserOutlined/>}/>
                                </a>
                            </Dropdown>
                        </div>
                        :
                        <Button className="loginbtn" type="primary" size="large" onClick={() => {
                            openLoginModal("login")
                        }}>Anmelden</Button>
                    }
                </Col>
            </Row>
            {subHeader}
        </div>
    );
}

export default CustomHeader;