import {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {Skeleton, Button, Modal, Switch, Input, Form} from "antd";
import './Profile.css';
import edit from '../assets/edit.png';
import { EMAIL_WRONG_FORMAT, ENTER_EMAIL } from "../constants/de.ts";
import {fetchWrapper} from "../api/helper";

function Profile() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        fetchWrapper.get('api/v1/users').then(res => {
            setEmail(res.payload.email) 
            setName(res.payload.name)
        })
    })

        // E-Mail ändern
        const [isModalMailOpen, setIsModalMailOpen] = useState(false);
      
        const showModalMail = () => {
          setIsModalMailOpen(true);
        };
      
        const handleOkMail = () => {
          setIsModalMailOpen(false);
        };
      
        const handleCancelMail = () => {
          setIsModalMailOpen(false);
        };

        // Name ändern
        const [isModalNameOpen, setIsModalNameOpen] = useState(false);
      
        const showModalName = () => {
          setIsModalNameOpen(true);
        };
      
        const handleOkName = () => {
          setIsModalNameOpen(false);
        };
      
        const handleCancelName = () => {
          setIsModalNameOpen(false);
        };

        //Switch Benachrichtigung
        const onChange = (checked: boolean) => {
            console.log(`switch to ${checked}`);
        };

    return (
        <div style={{display: "flex", flexWrap:"wrap",justifyContent: "center", marginLeft:"25%", marginRight:"25%"}}>
            <div>
                <h1 >Profil</h1>
            </div>
            <hr style={{width:"100%" }}/>
            <div style={{flexDirection:"row", flexWrap:"wrap", display:"flex", flexBasis: "100%"}}>
                {email ? <p style={{flex:"80%", width:"100%"}}>Ihre E-Mailadresse: {email}</p> : <Skeleton active />}
                <div  style={{flex:"20%", display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
                    <Button type="primary" onClick={showModalMail}><img src={edit} style={{width:"15px"}}></img></Button>
                </div>
                <Modal title="E-Mail ändern" open={isModalMailOpen} onOk={handleOkMail} onCancel={handleCancelMail}>
                    <p>Hier können Sie Ihre E-Mailadresse ändern:</p>
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: ENTER_EMAIL},
                            {type: 'email', message: EMAIL_WRONG_FORMAT}
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="E-Mail"/>
                    </Form.Item>
                </Modal>
            </div>
            <div style={{flexDirection:"row", flexWrap:"wrap", display:"flex", flexBasis: "100%"}}>
                {name ? <p style={{flex:"85%"}}>Ihr Name: {name}</p> : <Skeleton active />}
                <div  style={{flex:"15%", display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
                    <Button type="primary" onClick={showModalName}><img src={edit} style={{width:"15px"}}></img></Button>
                </div>
                <Modal title="Name ändern" open={isModalNameOpen} onOk={handleOkName} onCancel={handleCancelName}>
                    <p>Hier können Sie Ihren Namen ändern:</p>
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Name"/>
                </Modal>
            </div>
            <hr style={{width:"100%" }}/>
            <div style={{flexBasis: "100%"}}>
                <div>
                    <h2 style={{textAlign:"center"}}>Benachrichtigung</h2>
                </div>
                <div style={{flexDirection:"row", flexWrap:"wrap", display:"flex", flexBasis: "100%"}}>
                    <p style={{flex:"85%"}}>Benachrichtigung zu neuen Kursempfehlungen</p>
                    <div style={{flex:"15%", display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
                        <Switch defaultChecked onChange={onChange} />
                    </div>
                </div>
            </div>
            <hr style={{width:"100%" }}/>
            <div style={{flexBasis: "100%"}}>
                <h2 style={{textAlign:"center"}}>Datenschutz</h2>
                <p style={{textAlign:"left"}}>Hier werden irgendwann einmal Informationen zum Datenschutz stehen: Cookies, Datenschutzerklärung etc.</p>
            </div>
        </div>
    );
}

export default Profile;