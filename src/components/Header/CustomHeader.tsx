import {Avatar, Button, Col, Dropdown, MenuProps, Row, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";
import {useEffect, useState} from "react";
import SubHeader from "./SubHeader.tsx";
import {openLoginModal} from "../../state/modalutil.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../state/reduxStore.ts";
import {fetchWrapper} from "../../api/helper";
import {clearToken} from "../../api/auth.ts";
import Searchbar from "../Searchbar.tsx";
import {BookmarkFill} from "react-bootstrap-icons";
import './CustomHeader.css'

const {Title} = Typography

function CustomHeader() {

    const [subHeader, setSubHeader] = useState(<div style={{height: "32px", width: "1px"}}/>)

    //TODO: implement global state for logged in
    const loggedIn = useSelector((state: RootState) => state.auth.auth)

    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState('')

    useEffect(() => {
        if (location.pathname.includes("discover") || (location.pathname.includes("detail") && !location.pathname.includes("dashboard")) || location.pathname.includes("profile") || location.pathname.includes("searching") || location.pathname.includes("bookmarks") || location.pathname.includes("groups")) {
            setSubHeader(<SubHeader/>)
        } else {
            setSubHeader(<></>)
        }
        if (loggedIn)
            fetchWrapper.get('api/v1/users').then(res => setName(res.payload.name))
    }, [location.pathname])

    const openBookmarks = () => {
        navigate('/bookmarks');
    }

    //TODO: refactor avatar to component
    //TODO: dont show search bar on landing page
    //TODO: placeholder for avatar/loginbutton so it doesnt jump around

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a rel="noopener noreferrer" href="/profile">
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
                    {window.location.pathname.includes("reset-password") ? <></> :
                        loggedIn ?
                            <div style={{
                                margin: "auto 10px auto auto",
                                minWidth: "60px",
                                lineHeight: "0px",
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "center"
                            }}>
                                <Button style={{marginRight: "15px", width: "32px", height: "32px"}} shape="circle"
                                        onClick={openBookmarks}>
                                    <BookmarkFill className="bookmark_inner filled" style={{height: "12px"}}/>
                                </Button>
                                <div>
                                    <Dropdown menu={{items}} placement="bottomRight" arrow={{pointAtCenter: true}}
                                              trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Avatar icon={<UserOutlined/>}/>
                                        </a>
                                    </Dropdown>
                                </div>
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