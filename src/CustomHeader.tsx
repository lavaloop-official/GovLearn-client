import Search from "antd/es/input/Search";
import {Avatar, Button, Dropdown, MenuProps, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";

const {Title} = Typography

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
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
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Ausloggen
            </a>
        ),
        danger: true,
    },
];

function CustomHeader() {
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
                       style={{margin: "auto auto auto 0px", minWidth: "100px", color: "#3f3f3f"}}>Govlearn</Title>
                <Search placeholder="Kursangebote suchen" style={{maxWidth: "400px", margin: "auto"}}/>
                <div style={{margin: "auto 0px auto auto", minWidth: "32px", lineHeight: "0px"}}>
                    <Dropdown menu={{items}} placement="bottomRight" arrow={{pointAtCenter: true}} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Avatar icon={<UserOutlined/>}/>
                        </a>
                    </Dropdown>
                </div>


            </div>
            <div style={{
                width: "100%",
                height: "32px",
                borderTop: "1px solid #D9D9D9",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center"
            }}>
                <Button type="text" style={{margin: "0", borderRadius: "0px", maxWidth: "250px", width: "100%"}}>PlaceholderNav
                    1</Button>
                <Button type="text" style={{margin: "0", borderRadius: "0px", maxWidth: "250px", width: "100%"}}>PlaceholderNav
                    2</Button>
                <Button type="text" style={{margin: "0", borderRadius: "0px", maxWidth: "250px", width: "100%"}}>PlaceholderNav
                    3</Button>
            </div>
        </div>
    );
}

export default CustomHeader;