import './Landing.css';
import {Button, Card, Flex, Typography} from 'antd';
import {ReadOutlined, UserOutlined, PartitionOutlined, DoubleRightOutlined} from '@ant-design/icons';
import {openLoginModal} from "../state/modalutil.ts";
import LoginModal from "../components/Login/LoginModal.tsx";

function Landing() {

    const cardStyle: React.CSSProperties = {
        width: 1440,
    };

    const attributeCardStyle: React.CSSProperties = {
        width: 256,
        height: 200,
        backgroundColor: 'cornflowerblue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    };

    const imgStyle: React.CSSProperties = {
        display: 'block',
        width: 756,
    };

    const complementColor: React.CSSProperties = {
        backgroundColor: 'cornflowerblue'
    }

    const flexStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    };

    const flexCardStyle = {...cardStyle, ...flexStyle};

    return (
        <div style={{
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px"
        }}>
            <Flex vertical justify='center'>
                <Card style={cardStyle} bodyStyle={{padding: 0, overflow: 'hidden'}}>
                    <Flex justify="space-between">
                        <img
                            alt="avatar"
                            src="https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            style={imgStyle}
                        />
                        <Flex vertical align="flex-end" justify="space-between" style={{padding: 64}}>
                            <Typography.Title level={2}>
                                GovLearn - Deine Weiterbildungsangebotsplattform
                            </Typography.Title>
                            <Typography.Title level={3}>
                                Finde Weiterbildungsangebote die dir weiterhelfen.
                            </Typography.Title>
                        </Flex>
                    </Flex>
                </Card>

                <Card style={cardStyle} bodyStyle={complementColor}>
                    <div className="flip-container">
                        <Flex justify='space-around'>
                            <div className="flip-box">
                                <div className="flip-box-inner">
                                    <div className="flip-box-front"><Card style={attributeCardStyle}><ReadOutlined
                                        style={{fontSize: '64px', color: 'white'}}/><p
                                        style={{color: 'white', fontSize: 'large'}}>großes Angebot an
                                        Weiterbildungsangeboten</p></Card></div>
                                    <div className="flip-box-back"><Card style={attributeCardStyle}><p
                                        style={{color: 'white', fontSize: 'large'}}>BlalblvBlalblvapsfanglibahdbgah b bq
                                        q qbnfiwqlb fqasfnafafasfapsfanglibahdbgah b bq q qbnfiwqlb fqasfnafafasf</p>
                                    </Card></div>
                                </div>
                            </div>
                            <div className="flip-box">
                                <div className="flip-box-inner">
                                    <div className="flip-box-front"><Card style={attributeCardStyle}><UserOutlined
                                        style={{fontSize: '64px', color: 'white'}}/><p
                                        style={{color: 'white', fontSize: 'large'}}>Finde das Angebot das für dich am
                                        besten passt</p></Card></div>
                                    <div className="flip-box-back"><Card style={attributeCardStyle}><p
                                        style={{color: 'white', fontSize: 'large'}}>Unsere über jahrzehnte entwickelte
                                        Algorithmik erlaubt es uns mittel künstlicher Intelligenz, Weiterbildungsangebot
                                        vorzuschlagen, welche ihre Bedürfnisse erfüllen.</p></Card></div>
                                </div>
                            </div>
                            <div className="flip-box">
                                <div className="flip-box-inner">
                                    <div className="flip-box-front"><Card style={attributeCardStyle}><PartitionOutlined
                                        style={{fontSize: '64px', color: 'white'}}/><p
                                        style={{color: 'white', fontSize: 'large'}}>Ordne deinem Team Angebote zu</p>
                                    </Card></div>
                                    <div className="flip-box-back"><Card style={attributeCardStyle}><p
                                        style={{color: 'white', fontSize: 'large'}}>Blalblvapsfanglibahdbgah b bq q
                                        qbnfiwqlb Blalblvapsfanglibahdbgah b bq q qbnfiwqlb
                                        fqasfnafafasffqasfnafafasf</p></Card></div>
                                </div>
                            </div>
                        </Flex>
                    </div>
                </Card>
            </Flex>
            <LoginModal/>
        </div>
    )
}

export default Landing