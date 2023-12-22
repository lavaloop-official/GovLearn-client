import {Affix, Button, Steps} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CircleSelect from "../components/CircleSelect/CircleSelect.tsx";

function Registration() {

    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<string[]>([]);

    const selectCallback = (name: string) => {
        setSelected(selected => {
            console.log("selected: " + selected + "name: " + name);
            if (selected.includes(name)) {
                return selected.filter(e => e != name);
            } else {
                const newSelected = selected.filter(e => !e.startsWith(name.charAt(0)));
                newSelected.push(name);
                return newSelected;
            }
        });
        console.log(selected);
    }

    const first =
        <>
            <div style={{display: "flex", flexDirection: "column"}}>
                <h4>{selected.map(e => `${e}; `)}</h4>
                <CircleSelect selectCallback={selectCallback}/>
            </div>
        </>

    const content = [
        {
            content: first,
            step: {
                title: 'IT- und Medienkompetenz',
                description: 'First-content'
            }
        },
        {
            content: <h1>Content 2</h1>,
            step: {
                title: 'Diversity Kompetenz',
                description: 'Second-content'
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
        },
        {
            content: <h1>Content 6</h1>,
            step: {
                title: 'Soziale Kompetenz',
                description: 'Fifth-content'
            }
        },
        {
            content: <h1>Content 7</h1>,
            step: {
                title: 'Strategische Kompetenz',
                description: 'Sixth-content'
            }
        },
        {
            content: <h1>Content 8</h1>,
            step: {
                title: 'Persönliche Einstellungen',
                description: 'Datenschutz und Benachrichtigungen'
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