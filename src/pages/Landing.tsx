import "./Landing.css";
import {Card, Flex, notification, Typography} from "antd";
import {PartitionOutlined, ReadOutlined, UserOutlined} from "@ant-design/icons";
import {openLoginModal} from "../state/modalutil.ts";
import LoginModal from "../components/Login/LoginModal.tsx";
import AnimatedButton from "../components/AnimatedButton.tsx";
import {RootState} from "../state/reduxStore.ts";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {WELCOME, WELCOME_BACK} from "../constants/de.ts";
import {useEffect} from "react";

function Landing() {
    const loggedIn = useSelector((state: RootState) => !!state.auth.auth);
    const navigate = useNavigate();
    const location = useLocation();

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        document.title = "GovLearn - Weiterbildung einfach gemacht";
        const openNotification = (message: string, description: string) => {
            api.info({
                message,
                description,
                placement: "top",
            });
        }
        if (location.state?.reason === "logout")
            openNotification("Erfolgreich ausgeloggt", "Sie wurden erfolgreich ausgeloggt.");
        else if (location.state?.reason === "401")
            openNotification("Sitzung abgelaufen", "Ihre Sitzung ist abgelaufen. Bitte loggen Sie sich erneut ein.");
    }, [api, location.state?.reason]);

    const cardStyle: React.CSSProperties = {
        width: 1440,
    };

    const attributeCardStyle: React.CSSProperties = {
        width: 256,
        height: 200,
        backgroundColor: "cornflowerblue",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    };

    const imgStyle: React.CSSProperties = {
        display: "block",
        width: 756,
    };

    const complementColor: React.CSSProperties = {
        backgroundColor: "cornflowerblue",
    };

    return (
        <>
            {contextHolder}
            <div
                style={{
                    zIndex: "1",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: "10px",
                }}
            >
                <Flex vertical justify="center">
                    <Card style={cardStyle} bodyStyle={{padding: 0, overflow: "hidden"}}>
                        <Flex justify="space-between">
                            <img
                                alt="avatar"
                                src="https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                style={imgStyle}
                            />
                            <Flex
                                vertical
                                align="flex-start"
                                justify="space-between"
                                style={{padding: 64}}
                            >
                                <Typography.Title level={2}>
                                    GovLearn - Ihre Weiterbildungsangebotsplattform für den
                                    öffentlichen Dienst
                                </Typography.Title>
                                <Typography.Title level={3}>
                                    {loggedIn ? WELCOME_BACK :
                                        WELCOME}

                                </Typography.Title>
                                <AnimatedButton
                                    onClick={() => {
                                        if (loggedIn) {
                                            navigate("/discover");
                                            return;
                                        }
                                        openLoginModal("register");
                                    }}
                                >
                                    {loggedIn ? "Fortsetzen" : "Jetzt Loslegen!"}
                                </AnimatedButton>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card style={cardStyle} bodyStyle={complementColor}>
                        <div className="flip-container">
                            <Flex justify="space-around">
                                <div className="flip-box">
                                    <div className="flip-box-inner">
                                        <div className="flip-box-front">
                                            <Card style={attributeCardStyle}>
                                                <ReadOutlined
                                                    style={{fontSize: "64px", color: "white"}}
                                                />
                                                <p style={{color: "white", fontSize: "large"}}>
                                                    Großes Angebot an Weiterbildungsangeboten
                                                </p>
                                            </Card>
                                        </div>
                                        <div className="flip-box-back">
                                            <Card style={attributeCardStyle}>
                                                <p style={{color: "white", fontSize: "large"}}>
                                                    Unser breites Spektrum an Weiterbildungsangeboten
                                                    ermöglicht es dir, deine Fähigkeiten zu erweitern und
                                                    beruflich voranzukommen.
                                                </p>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                                <div className="flip-box">
                                    <div className="flip-box-inner">
                                        <div className="flip-box-front">
                                            <Card style={attributeCardStyle}>
                                                <UserOutlined
                                                    style={{fontSize: "64px", color: "white"}}
                                                />
                                                <p style={{color: "white", fontSize: "large"}}>
                                                    Finde das Angebot, welches für dich am besten passt
                                                </p>
                                            </Card>
                                        </div>
                                        <div className="flip-box-back">
                                            <Card style={attributeCardStyle}>
                                                <p style={{color: "white", fontSize: "large"}}>
                                                    Unsere Plattform nutzt moderne Technologie, um dir
                                                    gezielt Weiterbildungsangebote vorzuschlagen, die deinen
                                                    Bedürfnissen entsprechen.
                                                </p>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                                <div className="flip-box">
                                    <div className="flip-box-inner">
                                        <div className="flip-box-front">
                                            <Card style={attributeCardStyle}>
                                                <PartitionOutlined
                                                    style={{fontSize: "64px", color: "white"}}
                                                />
                                                <p style={{color: "white", fontSize: "large"}}>
                                                    Ordne deinem Team Angebote zu
                                                </p>
                                            </Card>
                                        </div>
                                        <div className="flip-box-back">
                                            <Card style={attributeCardStyle}>
                                                <p style={{color: "white", fontSize: "large"}}>
                                                    Unsere Plattform ermöglicht es dir,
                                                    Weiterbildungsangebote effizient an dein Team zuzuweisen
                                                    und deren berufliche Entwicklung zu fördern.
                                                </p>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </Flex>
                        </div>
                    </Card>
                </Flex>
                <LoginModal/>
            </div>
        </>
    );
}

export default Landing;
