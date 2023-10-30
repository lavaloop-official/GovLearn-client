import Search from "antd/es/input/Search";
import {Avatar, Dropdown, MenuProps, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import SubHeader from "./SubHeader.tsx";

const {Title} = Typography

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
                    Max Mustermann
                </span>

            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Einstellungen
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Placeholder
            </a>
        ),
    },
    {
        key: '4',
        label: (
            <a href="/">
                Ausloggen
            </a>
        ),
        danger: true,
    },
];

function CustomHeader() {
    const [subHeader, setSubHeader] = useState(<div style={{height: "32px", width: "1px"}}/>)

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("discover") || location.pathname.includes("detail") || location.pathname.includes("profile"))
            setSubHeader(<SubHeader/>)
        else
            setSubHeader(<></>)
    }, [location.pathname])


    return (
        <div style={{width: "100%", height: "100%"}}>
            <div style={{
                margin: "0 auto",
                maxWidth: "1200px",
                width: "100%",
                height: "56px",
                display: "flex",
                verticalAlign: "middle",
                gap: "10px",
                padding: "0px 10px",
            }}>
                <Title level={3}
                       style={{
                           margin: "auto auto auto 0px",
                           minWidth: "100px",
                           color: "#3f3f3f"
                       }}>
                    <a href="/discover" style={{color: "#212321"}}>
                        Govlearn
                    </a>
                </Title>
                <Search placeholder="Kursangebote suchen" style={{maxWidth: "400px", margin: "auto"}} allowClear/>
                <div style={{margin: "auto 0px auto auto", minWidth: "32px", lineHeight: "0px"}}>
                    <Dropdown menu={{items}} placement="bottomRight" arrow={{pointAtCenter: true}} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Avatar icon={<UserOutlined/>}/>
                        </a>
                    </Dropdown>
                </div>


            </div>
            {subHeader}
        </div>
    );
}

export default CustomHeader;