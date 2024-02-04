import {Alert, Button, Flex, Steps, Switch, Tag, Tooltip, Typography} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CircleSelect from "./components/CircleSelect/CircleSelect.tsx";
import Deselect from "./components/Deselect.tsx";
import "./Registration.css";
import {QuestionCircleOutlined, StarOutlined, TeamOutlined} from "@ant-design/icons";
import {Role, RoleTag} from "../../constants/interfaces.ts";
import {fetchWrapper} from "../../api/helper.ts";
import {checkComplete, setComplete} from "../../state/onboarding.ts";

/**
 * Registration component for the application.
 * This component handles the registration process of a new user.
 * It guides the user through a series of steps to gather necessary information.
 */
function Registration() {
    //TODO: move onlick to here and pass down to circleselect so that it can be reset by clicking outside of the circle

    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number[]>(new Array(6).fill(-1));
    const [digitallotse, setDigitallotse] = useState<boolean>(false);
    const [deselected, setDeselected] = useState<number[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    /**
     * Fetch competences on component mount
     */
    useEffect(() => {
        fetchWrapper.get("api/v1/roles").then((res) => {
            setRoles(res.payload)
        })
    }, []);

    useEffect(() => {
        document.title = "GovLearn - Registrierung";
        if (checkComplete("register"))
            navigate("/discover");
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

    // Function to convert selected roles to text
    const selectedToText = () => {
        const responsibilites = ["Umsetzer", "Entscheidungsträger", "Stratege"];
        const roles = [
            "Organisation",
            "Digitalisierung",
            "Informationstechnik",
            "Smart City",
            "Anderer Verantwortungsbereich",
            "Personal"
        ];
        const text = [];
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] != -1) {
                text.push(
                    {role: roles[i], resp: responsibilites[selected[i]]}
                );
            }
        }
        return text;
    }

    const selectedToDisplay = () => {
        const text = selectedToText();
        if (text.length == 0)
            return <Tag color="red">Keine Rollen ausgewählt</Tag>;
        return text.map((item, index) => (
            <Tag color="blue" key={index}>
                {item.role} - {item.resp}
            </Tag>
        ));
    };

    const selectedToCompetences = (rating: number) => {
        const objects = selectedToText();
        const competences: Role[] = [];
        for (const obj of objects) {
            let role = roles.find((role) => role.name == obj.role && role.verantwortungsbereich == obj.resp);
            if (role == undefined)
                continue;

            // Filter Tags by Tag rating -> Grundlagen or Fortgeschritten
            role = {
                id: role.id,
                name: role.name,
                description: role.description,
                verantwortungsbereich: role.verantwortungsbereich,
                roleTagWsTos: role.roleTagWsTos
                    .filter((tag) => tag.rating == rating)
            };

            let filteredRoleTags: RoleTag[] = [];

            // Filter all Tags inside the Role if they already exist in other roles
            role.roleTagWsTos.forEach(tag => {
                let roleTags: String[] = [];
                competences.forEach(competence => competence.roleTagWsTos.forEach(roleTag => roleTags.push(roleTag.tagName)));
                if (!roleTags.includes(tag.tagName))
                    filteredRoleTags.push(tag);
            });

            // Push filtered role
            competences.push({
                id: role.id,
                name: role.name,
                description: role.description,
                verantwortungsbereich: role.verantwortungsbereich,
                roleTagWsTos: filteredRoleTags
            });
        }
        return competences;
    }

    const handleDeselect = (id: number) => {
        setDeselected((deselected) => {
            if (deselected.includes(id)) {
                return deselected.filter((item) => item != id);
            } else {
                return [...deselected, id];
            }
        });
    }

    const handleSubmit = () => {
        //concat all RoleTags of all Roles
        const roletags = selectedToCompetences(1).concat(selectedToCompetences(2)).map(role => role.roleTagWsTos);
        let tags: RoleTag[] = [];
        roletags.forEach(roletag => roletag.forEach(tag => tags.push(tag)))

        //filter out deselected tags
        const filteredTags = tags.filter((tag) => !deselected.includes(tag.tagID));
        const objs = filteredTags.map((tag) => ({tagId: tag.tagID, rating: tag.rating}));
        return fetchWrapper.post("api/v1/tags/users", objs)
    }

    // Content for the tooltips
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

            <h4 className="role-title">Organisation</h4>
            <p className="role-desc">Im Bereich Organisation werden Strukturen und Abläufe innerhalb der öffentlichen
                Verwaltung geplant, koordiniert und optimiert, um eine effiziente und transparente Arbeitsweise zu
                gewährleisten.</p>

            <h4 className="role-title">Digitalisierung</h4>
            <p className="role-desc">Die Digitalisierung im öffentlichen Dienst konzentriert sich auf die Integration
                moderner Technologien, um Verwaltungsprozesse zu verbessern, den Bürgerservice zu optimieren und den
                Zugang zu Informationen zu erleichtern.</p>

            <h4 className="role-title">Informationstechnik</h4>
            <p className="role-desc">Im Bereich Informationstechnik werden IT-Lösungen entwickelt, implementiert und
                gewartet, um eine reibungslose Funktionalität der technologischen Infrastruktur der öffentlichen
                Verwaltung sicherzustellen.</p>

            <h4 className="role-title">Smart City</h4>
            <p className="role-desc">Smart City bezieht sich auf die Entwicklung und Umsetzung intelligenter
                Technologien, um städtische Lebensqualität zu verbessern. Dazu gehören etwa die Vernetzung von
                Verkehrssystemen, Umweltüberwachung und bürgernahe Dienstleistungen.</p>

            <h4 className="role-title">Anderer Verantwortungsbereich</h4>
            <p className="role-desc">Dieser Verantwortungsbereich umfasst spezifische Aufgaben, die je nach
                individuellem Bedarf und Schwerpunktsetzung der öffentlichen Verwaltung variieren können.</p>

            <h4 className="role-title">Personal</h4>
            <p className="role-desc">Im Personalbereich werden alle Angelegenheiten rund um die Mitarbeiterinnen und
                Mitarbeiter des öffentlichen Dienstes verwaltet, einschließlich Personalbeschaffung, -entwicklung,
                -betreuung und -administration.</p>

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
                ihrer Plattform für gezielte Weiterbildungen im öffentlichen Dienst. Wir freuen uns, Sie als neues
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
                            Dienst auszuwählen. Wählen Sie hierbei die Rolle(n) aus, die Sie aktuell ausüben oder
                            ausüben möchten. Sie können auch mehrere Teilrollen auswählen.
                        </p>
                    </Flex>
                    <br/>
                    <Flex align="center">
                        <Flex className="intro-step" vertical justify="center" align="center">
                            <StarOutlined style={{fontSize: "64px", color: "#212321"}}/>
                            <h5 style={{margin: "0"}}>2. Kompetenzen definieren</h5>
                        </Flex>
                        <hr className="vertical"></hr>
                        <p>
                            Nachdem Sie Ihre Rolle ausgewählt haben, geht es darum, Ihre spezifischen Kompetenzen
                            genauer zu beschreiben. Auf Basis ihrer ausgewählten Rollen werden Ihnen Kompetenzen
                            zugeordnet. Diese können Sie nun anpassen, indem Sie Kompetenzen abwählen, die nicht in die
                            Weiterbildungsempfehlungen einfließen sollen.
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
                            flexDirection: "column"
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
                            <Typography.Text>{selectedToDisplay()}</Typography.Text>
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
                    {selectedToDisplay()}
                    {digitallotse ? <Tag color="green">Digitallotse</Tag> : <></>}
                </Typography.Text>
                <Typography.Title level={4} style={{marginTop: "15px"}}>
                    Kompetenzen:
                </Typography.Title>
                <Typography.Text>
                    Wählen Sie hier die Kompetenzen ab, welche nicht in die Weiterbildungsempfehlungen einfließen
                    sollen.
                </Typography.Text>
                <Alert
                    message="Kompetenzen, die bereits in anderen Rollen enthalten sind, wurden für eine bessere Übersichtlichkeit herausgefiltert."
                    type="info" showIcon style={{marginTop: "5px", width: "fit-content"}}></Alert>
                <div className="competence-container">
                    <div style={{width: "50%"}}>
                        <Typography.Title level={5} style={{margin: "5px 0px"}}>
                            Grundlagen-Kompetenzen
                        </Typography.Title>
                        <div className="deselect-grid">
                            {selectedToCompetences(1).map(role => (
                                <div>
                                    {
                                        role.roleTagWsTos.length > 0 ?
                                            <div>
                                                <p>{role.name} - {role.verantwortungsbereich}</p>
                                                <div style={{display: "flex", flexWrap: "wrap", gap: "5px"}}>
                                                    {
                                                        role.roleTagWsTos.map((competence, index) => (
                                                            <Deselect title={competence.tagName} id={competence.tagID}
                                                                      deselect={handleDeselect}
                                                                      key={index}/>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            : <div/>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{width: "50%"}}>
                        <Typography.Title level={5} style={{margin: "5px 0px"}}>
                            Fortgeschrittene Kompetenzen
                        </Typography.Title>
                        <div className="deselect-grid">
                            {selectedToCompetences(2).map(role => (
                                <div>
                                    {
                                        role.roleTagWsTos.length > 0 ?
                                            <div>
                                                <p>{role.name} - {role.verantwortungsbereich}</p>
                                                <div style={{display: "flex", flexWrap: "wrap", gap: "5px"}}>
                                                    {
                                                        role.roleTagWsTos.map((competence, index) => (
                                                            <Deselect title={competence.tagName} id={competence.tagID}
                                                                      deselect={handleDeselect}
                                                                      key={index}/>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            : <div/>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    // Content for the registration steps
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
        if (current == content.length - 1) {
            handleSubmit().then(() => {
                navigate("/discover");
                setComplete("register")
            });
        } else {
            navigate(`/register/${content[current + 1].url}`);
            window.scrollTo(0, 0);
        }
    };

    const prev = () => {
        if (current != 0) {
            navigate(`/register/${content[current - 1].url}`);
            window.scrollTo(0, 0);
        }
    };

    const onChange = (value: number) => {
        navigate(`/register/${content[value].url}`);
    };

    // Update the current step based on the URL
    useEffect(() => {
        setCurrent(() => {
            const url = window.location.pathname.split("/").pop();
            const index = content.findIndex((item) => item.url == url);
            if (index == -1) return 0;
            return index;
        });
    }, [content, navigate]);

    return (
        <div className="registration-container">
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
                        background: "#F9F9F9",
                        borderRadius: "20px",
                        padding: "10px",
                        display: "flex",
                        position: "relative",
                        color: "#3F3F3F",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                    }}
                >
                    <div style={{marginBottom: "40px", width: "100%"}}>{content[current].content}</div>
                    <Button
                        type="primary"
                        onClick={next}
                        shape="round"
                        className="registration-button next"
                    >
                        {current == content.length - 1 ? "Fertig" : "Weiter"}
                    </Button>
                    <Button
                        onClick={prev}
                        shape="round"
                        className="registration-button back"
                        style={{display: current == 0 ? "none" : ""}}
                    >
                        Zurück
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Registration;
