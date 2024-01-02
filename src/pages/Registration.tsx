import {Button, Flex, Steps, Switch, Tag, Tooltip, Typography} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CircleSelect from "../components/Register/CircleSelect/CircleSelect.tsx";
import Deselect from "../components/Register/Deselect.tsx";
import "./Registration.css";
import {QuestionCircleOutlined, StarOutlined, TeamOutlined} from "@ant-design/icons";

function Registration() {
    //TODO: move onlick to here and pass down to circleselect so that it can be reset by clicking outside of the circle

    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number[]>(new Array(6).fill(-1));
    const [digitallotse, setDigitallotse] = useState<boolean>(false);
    const [competences, setCompetences] = useState<string[]>([]);

    useEffect(() => {
        /*
        fetchWrapper.get("/competences").then((res) => {
            setCompetences(res);
        })
         */
        //testing
        setCompetences(["Datenschutz", "Excel", "Word", "Powerpoint", "Führung", "Projektmanagement"]);
    }, []);

    useEffect(() => {
        document.title = "GovLearn - Registrierung";
    }, []);

    const selectCallback = (index: string) => {
        const slice = parseInt(index.charAt(0));
        const arc = parseInt(index.charAt(2));
        if (selected[slice] == arc) {
            setSelected((selected) => {
                const newSelected = [...selected];
                newSelected[slice] = -1;
                return newSelected;
            });
        } else {
            setSelected((selected) => {
                const newSelected = [...selected];
                newSelected[slice] = arc;
                return newSelected;
            });
        }
    };

    const selectedToText = () => {
        const responsibilites = ["Umsetzer", "Entscheidungsträger", "Stratege"];
        const roles = [
            "Organisation",
            "Digitalisierung",
            "Informationstechnik",
            "Smart City",
            "Nicht-digital",
            "Personal"
        ];
        const text = [];
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] != -1) {
                text.push(
                    <Tag color="blue" key={i}>
                        {roles[i]} - {responsibilites[selected[i]]}
                    </Tag>
                );
            }
        }
        if (text.length == 0) return <Tag color="red">Keine Rollen ausgewählt</Tag>;
        return text;
    };

    const digitalLotseInfoText = (
        <>
            <p>
                Digitallotsen sind Ansprechpartner/-in und Impulsgeber/-in, die Veränderungsprozesse anregen, die
                Veränderungen aktiv mit der Belegschaft der Kommunalverwaltungen gestalten und bei Innovationen
                unterstützen.
            </p>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.nsi-hsvn.de/digital-lotsen.html#:~:text=Die%20Digital%2DLotsen%20sind%20Ansprechpartner,gestalten%20und%20bei%20Innovationen%20unterst%C3%BCtzen."
            >
                Quelle
            </a>
        </>
    );

    // TODO: add definitions
    //TODO: add roles
    const AreaInfoText = (
        <>
            <h4>Organisation</h4>
            <p></p>
            <h4>Digitalisierung</h4>
            <p></p>
            <h4>Informationstechnik</h4>
            <p></p>
            <h4>Smart City</h4>
            <p></p>
            <h4>Nicht-digital</h4>
            <p></p>
            <h4>Personal</h4>
            <p></p>
        </>
    );

    const zero = (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "10px"
                }}
            >
                <Typography.Title level={4} style={{margin: "5px 0px"}}>
                    Herzlich Willkommen bei GovLearn
                </Typography.Title>
                Ihrer Plattform für gezielte Weiterbildungen im öffentlichen Dienst. Wir freuen uns, Sie als neues
                Mitglied in unserer wachsenden Gemeinschaft begrüßen zu dürfen. Um Ihnen bestmögliche Empfehlungen
                bieten zu können, möchten wir Sie durch den einfachen Registrierungsprozess führen.
                <br/>
                <Flex vertical style={{marginTop: "10px"}}>
                    <Flex align="center">
                        <Flex className="intro-step" vertical justify="center" align="center">
                            <TeamOutlined style={{fontSize: "64px", color: "#212321"}}/>
                            <h5 style={{margin: "0"}}>1. Rolle(n) wählen</h5>
                        </Flex>
                        <hr className="vertical"></hr>
                        <p>
                            Nach erfolgreicher Registrierung werden Sie gebeten, Ihre aktuelle Rolle im öffentlichen
                            Dienst auszuwählen. Ob Sie in der Verwaltung, im Finanzwesen oder in der Rechtsabteilung
                            tätig sind – wählen Sie die Rolle, die am besten Ihre beruflichen Aufgaben widerspiegelt.
                        </p>
                    </Flex>
                    <br/>
                    <Flex align="center">
                        <Flex className="intro-step" vertical justify="center" align="center">
                            <StarOutlined style={{fontSize: "64px", color: "#212321"}}/>
                            <h5 style={{margin: "0"}}>2. Kompetenzen - definieren</h5>
                        </Flex>
                        <hr className="vertical"></hr>
                        <p>
                            Nachdem Sie Ihre Rolle ausgewählt haben, geht es darum, Ihre spezifischen Kompetenzen
                            genauer zu beschreiben. Geben Sie an, welche Fähigkeiten und Kenntnisse Sie in Ihrer
                            beruflichen Tätigkeit auszeichnen. Je präziser Sie diese Informationen eingeben, desto
                            besser können wir Ihnen personalisierte Weiterbildungsempfehlungen präsentieren.
                        </p>
                    </Flex>
                </Flex>
            </div>
        </>
    );

    const first = (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "10px"
                }}
            >
                <Flex justify="space-between">
                    <Typography.Title level={3} style={{margin: "0"}}>
                        Rollenauswahl
                    </Typography.Title>
                    <Tooltip placement="leftBottom" title={AreaInfoText} style={{marginRight: "10px"}}>
                        <QuestionCircleOutlined style={{fontSize: "24px"}}/>
                    </Tooltip>
                </Flex>
                <Typography.Text>
                    Wählen Sie eine oder mehrere Rollen und den zugehörigen Verantwortungsbereich aus.
                </Typography.Text>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 auto"
                        }}
                    >
                        <CircleSelect selectCallback={selectCallback} selected={selected}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "20px"
                        }}
                    >
                        <div style={{minHeight: "160px"}}>
                            <Typography.Title level={4} style={{margin: "5px 0px"}}>
                                Ausgewählte Rollen:
                            </Typography.Title>
                            <Typography.Text>{selectedToText()}</Typography.Text>
                        </div>
                        <Typography.Title level={3} style={{margin: "0"}}>
                            Zusätzliche Anforderungen
                        </Typography.Title>
                        <Typography.Text>
                            Ich benötige Kompetenzen in meiner Funktion als <b>Digitallotse</b>
                            <Tooltip placement="leftBottom" title={digitalLotseInfoText}>
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </Typography.Text>
                        <div>
                            <Switch
                                checkedChildren="Ja"
                                unCheckedChildren="Nein"
                                defaultChecked={digitallotse}
                                onClick={() => {
                                    setDigitallotse((digitallotse) => !digitallotse);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const second = (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "10px"
                }}
            >
                <Typography.Title level={4} style={{margin: "5px 0px"}}>
                    Ausgewählte Rollen:
                </Typography.Title>
                <Typography.Text>
                    {selectedToText()}
                    {digitallotse ? <Tag color="green">Digitallotse</Tag> : <></>}
                </Typography.Text>
                <div className="competence-container">
                    <div className="competence-inner">
                        <Typography.Title level={5} style={{margin: "5px 0px"}}>
                            Grundlagen-Kompetenzen
                        </Typography.Title>
                        <div className="deselect-grid">
                            {competences.map((competence, index) => (
                                <Deselect title={competence} key={index}/>
                            ))}
                        </div>
                    </div>
                    <div className="competence-inner">
                        <Typography.Title level={5} style={{margin: "5px 0px"}}>
                            Fortgeschrittene Kompetenzen
                        </Typography.Title>
                        <div className="deselect-grid">
                            {competences.map((competence, index) => (
                                <Deselect title={competence} key={index}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const content = [
        {
            content: zero,
            step: {
                title: "Einführung"
            },
            url: "onboarding"
        },
        {
            content: first,
            step: {
                title: "Rollen"
            },
            url: "roles"
        },
        {
            content: second,
            step: {
                title: "Kompetenzen"
            },
            url: "competences"
        }
    ];

    const next = () => {
        if (current == content.length - 1) navigate("/discover");
        else {
            navigate(`/register/${content[current + 1].url}`);
        }
    };

    const prev = () => {
        if (current != 0) {
            navigate(`/register/${content[current - 1].url}`);
        }
    };

    const onChange = (value: number) => {
        navigate(`/register/${content[value].url}`);
    };

    useEffect(() => {
        setCurrent(() => {
            const url = window.location.pathname.split("/").pop();
            const index = content.findIndex((item) => item.url == url);
            if (index == -1) return 0;
            return index;
        });
    }, [content, navigate]);

    return (
        <div
            style={{
                zIndex: "1",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                margin: "10px auto",
                maxWidth: "1200px",
                padding: "10px 10px"
            }}
        >
            <Steps
                size="small"
                onChange={onChange}
                direction="horizontal"
                current={current}
                items={content.map((item) => item.step)}
                style={{marginBottom: "10px", minWidth: "100%"}}
            />
            <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <div
                    style={{
                        width: "100%",
                        background: "#d9d9d9",
                        borderRadius: "20px",
                        padding: "10px",
                        display: "flex",
                        position: "relative"
                    }}
                >
                    <div style={{marginBottom: "40px", width: "100%"}}>{content[current].content}</div>
                    <Button
                        type="primary"
                        onClick={next}
                        shape="round"
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px"
                        }}
                    >
                        {current == content.length - 1 ? "Fertig" : "Weiter"}
                    </Button>
                    <Button
                        onClick={prev}
                        shape="round"
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                            display: current == 0 ? "none" : ""
                        }}
                    >
                        Zurück
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Registration;
