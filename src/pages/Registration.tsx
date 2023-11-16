import {Affix, Button, Steps} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Registration() {



    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);

    const content = [
        {
            content: <h1>Content 1</h1>,
            step: {
                title: 'First',
                description: 'First-content'
            }
        },
        {
            content: <h1>Content 2</h1>,
            step: {
                title: 'Second',
                description: 'Second-content'
            }
        },
        {
            content: <h1>Content 3</h1>,
            step: {
                title: 'Third',
                description: 'Third-content'
            }
        },
        {
            content: <h1>Content 4</h1>,
            step: {
                title: 'Last',
                description: 'Last-content'
            }
        },
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
                <Affix offsetTop={90} style={{width: "100%", maxWidth: "250px", maxHeight: "500px"}}>
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