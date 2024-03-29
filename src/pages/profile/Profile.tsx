import {useEffect, useState} from "react";
import {DeleteOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Divider, Empty, Form, Input, List, Modal, Skeleton, Switch} from "antd";
import './Profile.css';
import edit from '../../assets/edit.png';
import {EMAIL_WRONG_FORMAT, ENTER_EMAIL, ENTER_PASSWORD, REENTER_PASSWORD} from "../../constants/de.ts";
import {fetchWrapper} from "../../api/helper.ts";
import {Key} from "react-bootstrap-icons";
import {setToken} from "../../api/auth.ts";
import {Course} from "../../constants/interfaces.ts";

function Profile() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newName, setNewName] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [submitPassword, setSubmitPassword] = useState(true)
    const [completedCourses, setCompletedCourses] = useState<Course[]>([])

    useEffect(() => {
        fetchWrapper.get('api/v1/users').then(res => {
            setEmail(res.payload.email)
            setName(res.payload.name)
        })
        //TODO: change to use completed courses endpoint
        fetchWrapper.get('api/v1/completions').then(res => {
            setCompletedCourses(res?.payload ?? [])
        });
    }, [])

    // E-Mail ändern
    const [isModalMailOpen, setIsModalMailOpen] = useState(false);

    const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    };

    const showModalMail = () => {
        setIsModalMailOpen(true);
    };

    const handleOkMail = () => {
        fetchWrapper.put(`api/v1/users`, {email: newEmail, password: password, name: name}).then(res => {
            if (res.payload == "Keine Änderung gefunden!") {
                Modal.error({
                    centered: true,
                    title: "Ihre E-Mailadresse konnte nicht geändert werden!",
                    content: 'Bitte geben Sie eine andere E-Mailadresse ein.',
                });
            } else if (res.messages[0].message == "User exists already") {
                Modal.error({
                    centered: true,
                    title: "E-Mailaddresse bereits vergeben!",
                    content: 'Bitte geben Sie eine andere E-Mailadresse ein.',
                });
            } else if (res.messages[0].message == "Password wrong") {
                Modal.error({
                    centered: true,
                    title: "Passwort falsch!",
                    content: 'Bitte überprüfen Sie ihr Passwort',
                });
            } else if (res.messages[0].message == "success") {
                setIsModalMailOpen(false);
                Modal.success({
                    centered: true,
                    title: "Ihre E-Mailadresse wurde erfolgreich geändert!",
                    content: '',
                });
                setToken(res.payload.token, true);
                setEmail(newEmail);
            }
        });
    };

    const handleCancelMail = () => {
        setIsModalMailOpen(false);
    };

    const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewEmail(event.target.value);
    };

    // Name ändern
    const [isModalNameOpen, setIsModalNameOpen] = useState(false);

    const showModalName = () => {
        setIsModalNameOpen(true);
    };

    const handleOkName = () => {
        fetchWrapper.put(`api/v1/users`, {email: email, password: password, name: newName}).then(res => {
            if (res.payload == "Keine Änderung gefunden!") {
                Modal.error({
                    centered: true,
                    title: "Ihr Name konnte nicht geändert werden!",
                    content: 'Bitte geben Sie einen anderen Namen ein.',
                });
            } else if (res.messages[0].message == "Password wrong") {
                Modal.error({
                    centered: true,
                    title: "Passwort falsch!",
                    content: 'Bitte überprüfen Sie ihr Passwort',
                });
            } else if (res.messages[0].message == "success") {
                setIsModalNameOpen(false);
                Modal.success({
                    centered: true,
                    title: "Ihr Name wurde erfolgreich geändert!",
                    content: '',
                });
                setName(newName);
            }
        });
    };

    const handleCancelName = () => {
        setIsModalNameOpen(false);
    };

    const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewName(event.target.value);
    };

    // Passwort ändern
    const [isModalOldPasswordOpen, setIsModalOldPasswordOpen] = useState(false);

    const showModalOldPassword = () => {
        setIsModalOldPasswordOpen(true);
    };

    const handleOkOldPassword = () => {
        fetchWrapper.post(`api/v1/users/auth-token`, {email: email, password: oldPassword, name: name}).then(res => {
            if (res.messages[0].message == "Password wrong") {
                Modal.error({
                    centered: true,
                    title: "Passwort falsch!",
                    content: 'Bitte überprüfen Sie Ihr Passwort',
                });
            } else if (res.messages[0].message == "success") {
                setIsModalOldPasswordOpen(false);
                showModalNewPassword();
                setOldPassword('');
            }
        });
    };

    const handleCancelOldPassword = () => {
        setIsModalOldPasswordOpen(false);
    };

    const onChangeOldPassword: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setOldPassword(event.target.value);
    };

    const [isModalNewPasswordOpen, setIsModalNewPasswordOpen] = useState(false);

    const showModalNewPassword = () => {
        setIsModalNewPasswordOpen(true);
    };

    const handleOkNewPassword = () => {
        fetchWrapper.put(`api/v1/users/password`, {email: email, password: newPassword, name: name}).then(res => {
            if (res.payload == "Gleiches Passwort!") {
                Modal.error({
                    centered: true,
                    title: "Gleiches Passwort!",
                    content: 'Bitte geben Sie ein anderes Passwort ein.',
                });
            } else if (res.messages[0].message == "success") {
                setIsModalNewPasswordOpen(false);
                Modal.success({
                    centered: true,
                    title: "Ihr Passwort wurde erfolgreich geändert!",
                    content: '',
                });
                setToken(res.payload.token, true);
            }
        });
    };

    const handleCancelNewPassword = () => {
        setIsModalNewPasswordOpen(false);
    };

    //Switch Benachrichtigung
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const [form] = Form.useForm();

    const deleteCourse = (id: number | undefined) => {
        if (!id)
            return
        fetchWrapper.delete(`api/v1/completions/course/${id}`)
        setCompletedCourses(prevState => prevState.filter((course: Course) => course.id !== id))
    }

    return (
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                minWidth: "400px",
                maxWidth: "800px",
                marginLeft: "20%",
                marginRight: "20%",
                background: "#F9F9F9",
                borderRadius: "20px",
                marginTop: "25px",
                paddingLeft: "15px",
                paddingRight: "15px",
                color: "#3F3F3F",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            }}>
                <div>
                    <h1>Profil</h1>
                </div>
                <div className="profile-content-section">
                    <div className="profile-content-section-flex">
                        {email ? <p style={{flex: "80%", width: "100%"}}>Ihre E-Mailadresse: {email}</p> :
                            <Skeleton active/>}
                        <div style={{flex: "20%", display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
                            <Button type="primary" onClick={showModalMail}><img src={edit}
                                                                                style={{width: "15px"}}></img></Button>
                        </div>
                        <Modal title="E-Mail ändern" open={isModalMailOpen} onOk={handleOkMail}
                               onCancel={handleCancelMail}
                               footer={[
                                   <Button key="back" onClick={handleCancelMail}>
                                       Abbrechen
                                   </Button>,
                                   <Button
                                       type="primary"
                                       onClick={handleOkMail}
                                   >
                                       E-Mail ändern
                                   </Button>,
                               ]}
                        >
                            <p>Hier können Sie Ihre E-Mailadresse ändern:</p>
                            <Form>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {required: true, message: ENTER_EMAIL},
                                        {type: 'email', message: EMAIL_WRONG_FORMAT}
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="E-Mail"
                                           onChange={onChangeEmail} style={{marginBottom: "5px"}}/>
                                </Form.Item>
                                <Input.Password prefix={<Key/>} placeholder="Passwort" onChange={onChangePassword}
                                                hidden={true}/>
                            </Form>
                        </Modal>
                    </div>
                    <div className="profile-content-section-flex">
                        {name ? <p style={{flex: "85%"}}>Ihr Name: {name}</p> : <Skeleton active/>}
                        <div className="profile-content-section-flex-15">
                            <Button type="primary" onClick={showModalName}><img src={edit}
                                                                                style={{width: "15px"}}></img></Button>
                        </div>
                        <Modal title="Name ändern" open={isModalNameOpen} onOk={handleOkName}
                               onCancel={handleCancelName}
                               footer={[
                                   <Button key="back" onClick={handleCancelName}>
                                       Abbrechen
                                   </Button>,
                                   <Button
                                       type="primary"
                                       onClick={handleOkName}
                                   >
                                       Name ändern
                                   </Button>,
                               ]}
                        >
                            <p>Hier können Sie Ihren Namen ändern:</p>
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Name"
                                   onChange={onChangeName} style={{marginBottom: "5px"}}/>
                            <Input.Password prefix={<Key/>} placeholder="Passwort" onChange={onChangePassword}
                                            hidden={true}/>
                        </Modal>
                    </div>
                    <div className="profile-content-section-flex">
                        {name ? <p style={{flex: "85%"}}>Passwort ändern</p> : <Skeleton active/>}
                        <div className="profile-content-section-flex-15">
                            <Button type="primary" onClick={showModalOldPassword}><img src={edit}
                                                                                       style={{width: "15px"}}></img></Button>
                        </div>
                        <Modal title="Passwort ändern" open={isModalOldPasswordOpen} onOk={handleOkOldPassword}
                               onCancel={handleCancelOldPassword}
                               footer={[
                                   <Button key="back" onClick={handleCancelOldPassword}>
                                       Abbrechen
                                   </Button>,
                                   <Button
                                       type="primary"
                                       onClick={handleOkOldPassword}
                                   >
                                       Weiter
                                   </Button>,
                               ]}>
                            <p>Geben Sie hier bitte Ihr altes Passwort ein.</p>
                            <Input.Password prefix={<Key/>} placeholder="Passwort" onChange={onChangeOldPassword}
                                            hidden={true}/>
                        </Modal>
                        <Modal title="Passwort ändern" open={isModalNewPasswordOpen} onOk={handleOkNewPassword}
                               onCancel={handleCancelNewPassword}
                               footer={[
                                   <Button key="back" onClick={handleCancelNewPassword}>
                                       Abbrechen
                                   </Button>,
                                   <Button
                                       htmlType="submit"
                                       type="primary"
                                       onClick={handleOkNewPassword}
                                       disabled={submitPassword}
                                   >
                                       Passwort ändern
                                   </Button>,
                               ]}
                        >
                            <p>Geben Sie hier bitte Ihr neues Passwort ein.</p>
                            <Form
                                form={form}
                                name="dependencies"
                                autoComplete="off"
                                style={{maxWidth: 600}}
                                layout="vertical"
                            >

                                <Form.Item label="Passwort" name="password"
                                           rules={[{required: true, message: ENTER_PASSWORD}]}>
                                    <Input.Password placeholder="Passwort eingeben"/>
                                </Form.Item>

                                {/* Field */}
                                <Form.Item
                                    label="Passwort wiederholen"
                                    name="password2"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true, message: REENTER_PASSWORD
                                        },
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    setNewPassword(value);
                                                    setSubmitPassword(false);
                                                    return Promise.resolve();
                                                }
                                                setSubmitPassword(true);
                                                return Promise.reject(new Error('Die Passwörter stimmen nicht überein!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Passwort eingeben"/>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <Divider/>
                <div style={{flexBasis: "100%"}}>
                    <div>
                        <h2 style={{textAlign: "center"}}>Benachrichtigung</h2>
                    </div>
                    <div className="profile-content-section-notifications">
                        <p style={{flex: "85%"}}>Benachrichtigung zu neuen Kursempfehlungen</p>
                        <div className="profile-content-section-flex-15">
                            <Switch defaultChecked onChange={onChange}/>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div style={{flexBasis: "100%", marginBottom: "0px"}}>
                    <h2 style={{textAlign: "center"}}>Beendete Kurse</h2>
                    <div style={{textAlign: "left", background: "#F7F7F7", borderRadius: "10px", padding: "15px"}}>
                        {completedCourses.length === 0 ?
                            <Empty description={"Sie haben noch keine Kurse abgeschlossen"}/> :
                            <List
                                bordered
                                itemLayout="horizontal"
                                dataSource={completedCourses}
                                renderItem={(item: Course) => (
                                    <List.Item actions={[<Button danger icon={<DeleteOutlined/>}
                                                                 onClick={() => deleteCourse(item.id)}/>]}>
                                        <List.Item.Meta
                                            title={<a href={`/detail/${item.id}`}>{item.name}</a>}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;