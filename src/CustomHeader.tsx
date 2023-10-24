import Search from "antd/es/input/Search";
import {Avatar, Button, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";

const {Title} = Typography

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
                 <Title level={3} style={{margin: "auto auto auto 0px", minWidth: "100px", color: "#3f3f3f"}}>Govlearn</Title>
                 <Search placeholder="Kursangebote suchen" style={{maxWidth: "400px", margin: "auto"}}/>
                 <Avatar icon={<UserOutlined/>} style={{margin: "auto 0px auto auto", minWidth: "32px"}}/>
             </div>
             <div style={{width: "100%", height: "32px", borderTop:"1px solid #D9D9D9", margin:"0 auto", display: "flex", justifyContent: "center"}}>
                 <Button type="text" style={{margin:"0", borderRadius: "0px", maxWidth: "250px", width:"100%"}}>PlaceholderNav 1</Button>
                 <Button type="text" style={{margin:"0", borderRadius: "0px", maxWidth: "250px", width:"100%"}}>PlaceholderNav 2</Button>
                 <Button type="text" style={{margin:"0", borderRadius: "0px", maxWidth: "250px", width:"100%"}}>PlaceholderNav 3</Button>
             </div>
         </div>
     );
}

export default CustomHeader;