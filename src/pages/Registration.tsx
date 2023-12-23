import {Affix, Button, Steps, Tag, Typography} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CircleSelect from "../components/CircleSelect/CircleSelect.tsx";

function Registration() {

    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number[]>(new Array(6).fill(-1));


    const selectCallback = (index: string) => {
        const slice = parseInt(index.charAt(0));
        const arc = parseInt(index.charAt(2));
        if (selected[slice] == arc) {
            setSelected(selected => {
                const newSelected = [...selected];
                newSelected[slice] = -1;
                return newSelected;
            });
        } else {
            setSelected(selected => {
                const newSelected = [...selected];
                newSelected[slice] = arc;
                return newSelected;
            });
        }
    }

    const selectedToText = () => {
        const responsibilites = ["Umsetzer", "Entscheidungsträger", "Stratege"]
        const roles = ["Organisation", "Digitalisierung", "Informationstechnik", "Smart City", "Nicht-digital", "Personal"]
        const text = [];
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] != -1) {
                text.push(<Tag color="green" key={i}>{roles[i]} - {responsibilites[selected[i]]}</Tag>)
            }
        }
        return text;
    }

    const first =
        <>
            <div style={{display: "flex", flexDirection: "column", width: "100%", padding: "10px"}}>
                <Typography.Title level={3} style={{margin: "0"}}>
                    Rollenauswahl
                </Typography.Title>
                <Typography.Text>
                    Wählen Sie eine oder mehrere Rollen und den zugehörigen Verantwortungsbereich aus.
                </Typography.Text>
                <div style={{display: "flex", flexDirection: "column", margin: "0 auto"}}>
                    <CircleSelect selectCallback={selectCallback} selected={selected}/>
                </div>
                <Typography.Title level={4} style={{margin: "5px 0px"}}>
                    Ausgewählte Rollen:
                </Typography.Title>
                <Typography.Text>
                    {selectedToText()}
                </Typography.Text>
            </div>
        </>

    const second =
        <>
            <div style={{display: "flex", flexDirection: "column", width: "100%", padding: "10px"}}>
                <Typography.Title level={3} style={{margin: "0"}}>
                    Übersicht
                </Typography.Title>
                <Typography.Text>
                    Überprüfen Sie Ihre Eingaben und bestätigen Sie mit "Weiter".
                </Typography.Text>
                <Typography.Title level={4} style={{margin: "5px 0px"}}>
                    Ausgewählte Rollen:
                </Typography.Title>
                <Typography.Text>
                    {selectedToText()}
                </Typography.Text>
            </div>
        </>

    const content = [
        {
            content: first,
            step: {
                title: 'Rollenauswahl',
                description: 'Auswahl der Rollen'
            }
        },
        {
            content: second,
            step: {
                title: 'Übersicht',
                description: 'Eingabe kontrollieren'
            }
        },
        {
            content: <h1>Content 3</h1>,
            step: {
                title: 'Ethische Kompetenz',
                description: 'Third-content'
            }
        },
        {
            content: <h1>Content 5</h1>,
            step: {
                title: 'Persönliche Kompetenz',
                description: 'Fourth-content'
            }
        }
    ]

    const next = () => {
        if (current == content.length - 1)
            navigate("/discover")
        else
            setCurrent(current + 1);
    }

    const prev = () => {
        if (current != 0)
            setCurrent(current - 1);
    }


    const onChange = (value: number) => {
        setCurrent(value);
    };


    return (
        <div style={{
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
            margin: "auto",
            maxWidth: "1200px",
            padding: "10px 10px",
        }}>
            <h1 style={{margin: "0", padding: "0 15px", textAlign: "center"}}>Registrierung</h1>
            <div style={{display: "flex", flexDirection: "row", maxWidth: "1100px", width: "100%"}}>
                <Affix offsetTop={90} style={{width: "100%", maxWidth: "300px", maxHeight: "500px"}}>
                    <Steps
                        style={{height: "500px"}}
                        onChange={onChange}
                        direction="vertical"
                        current={current}
                        items={content.map((item) => item.step)}
                    />
                </Affix>
                <div style={{
                    width: "100%",
                    background: "#d9d9d9",
                    borderRadius: "20px",
                    height: "1000px",
                    padding: "10px",
                    display: "flex",
                    position: "relative",
                }}>
                    {content[current].content}
                    <Button type="primary" onClick={next} shape="round"
                            style={{position: "absolute", bottom: "10px", right: "10px"}}>
                        {current == content.length - 1 ? "Fertig" : "Weiter"}
                    </Button>
                    <Button onClick={prev} shape="round"
                            style={{
                                position: "absolute",
                                bottom: "10px",
                                left: "10px",
                                display: current == 0 ? "none" : ""
                            }}>
                        Zurück
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Registration;