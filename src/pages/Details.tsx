import {Affix, Button, Card, Flex} from "antd";
import {useEffect} from "react";
import {ArrowLeftShort, ArrowRightShort} from "react-bootstrap-icons";
import Recommendation from "../components/Recommendation.tsx";
import Feedback from "../components/Feedback.tsx";

function Details({title = "Scrum lernen mit Jörg Becker"}: { title?: string }) {

    //TODO: skeleton loading
    //TODO: API calls for content

    useEffect(() => {
        document.title = "Details"
    })

    return (
        <>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <div style={{maxWidth: "1200px", width: "100%"}}>
                    <div style={{
                        width: "100%",
                        margin: "auto",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <Button type="primary" href="/discover"
                                style={{
                                    height: "fit-content",
                                    width: "fit-content",
                                    padding: "0",
                                    lineHeight: "0px",
                                    alignSelf: "center"
                                }}
                                icon={<ArrowLeftShort size={40}/>}/>
                        <h1 style={{margin: "0", padding: "0 15px"}}>{title}</h1>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{
                            maxWidth: "1200px",
                            width: "100%",
                            margin: "auto",
                            padding: "10px",
                            display: "flex",
                         flexDirection: "column"
                        }}>
                            <div style={{
                                height: "100%",
                                width: "100%",
                                background: "#d9d9d9",
                                borderRadius: "20px",
                                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                display: "flex"
                            }}>

        <img
            src="https://st4.depositphotos.com/13194036/31587/i/450/depositphotos_315873928-stock-photo-selective-focus-happy-businessman-glasses.jpg"
            alt=""
            style={{
                width: "100%", // Set the width to 100% to fill the container
                height: "100%", // Set the height to 100% to fill the container
                objectFit: "cover", // Maintain the aspect ratio and cover the container
                borderRadius: "20px", // Match the borderRadius of the container
            }}
        />
    
    <div style={{display: "flex", flexDirection: "column", width: "150px", padding: "5px"}}>
        <Card style={{ height: "100%" }}><p>Infos test</p></Card>
        <Button type="primary" icon={<ArrowRightShort size={12}/>}>Zum Angebot</Button>
    </div>
    
                            </div>
                            <Card style={{margin: "5px"}}>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img width="200px" object-fit="contain" src="https://www.wi.uni-muenster.de/sites/all/public/photos/46644531-becker-150x200.jpg" alt="" />
                                <div style={{ padding: "10px" }}>
                                    <h3>Jörg Becker</h3>
                                <p>Jörg Becker absolvierte sein Studium der Betriebswirtschaftslehre an der Universität des Saarlandes. Er schloss sein Studium im Jahr 1982 als Diplom-Kaufmann ab. Von 1980 bis 1981 studierte er zudem Betriebs- und Volkswirtschaftslehre an der University of Michigan in Ann Arbor, USA. Im Jahr 1987 promovierte Becker an der Wirtschaftswissenschaftlichen Fakultät der Universität des Saarlandes mit einer Dissertation zum Thema „Architektur eines EDV-Systems zur Materialflusssteuerung“. Seine Habilitation erfolgte im Jahr 1990 mit dem Thema „Die Integration in CIM-Systemen  Notwendigkeit und Realisierungsmöglichkeiten der EDV-gestützten Verbindung betrieblicher Bereiche“</p>
                                </div>
                                
                                </div>
                                </Card>
                                <div>
                                    <Feedback title={"Das ist Scrum!"} ribbon=""/>
                                 
                                </div>

                        </div>
                        <Affix offsetTop={90}>
                            <div style={{width: "100%", padding: "10px", display: "flex"}}>
                                <div style={{
                                    background: "#d9d9d9",
                                    borderRadius: "20px",
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "10px",
                                    gap: "10px"
                                }}>
                                    <h2 style={{
                                        padding: "10px",
                                        lineHeight: "0",
                                        textAlign: "center"
                                    }}>Empfehlungen</h2>
                                    <Recommendation title={"ja so hier"}
                                                    src={"https://images.ctfassets.net/hrltx12pl8hq/3AnnkVqrlhrqb9hjlMBzKX/693a8e5d40b4b6c55a7673ca4c807eef/Girl-Stock?fit=fill&w=600&h=338"}
                                                    ribbon={"Hot"}/>
                                    <Recommendation title={"ja so hier"}
                                                    src={"https://images.ctfassets.net/hrltx12pl8hq/3AnnkVqrlhrqb9hjlMBzKX/693a8e5d40b4b6c55a7673ca4c807eef/Girl-Stock?fit=fill&w=600&h=338"}
                                                    ribbon={"Hot"}/>
                                    <Recommendation title={"ja so hier"}
                                                    src={"https://images.ctfassets.net/hrltx12pl8hq/3AnnkVqrlhrqb9hjlMBzKX/693a8e5d40b4b6c55a7673ca4c807eef/Girl-Stock?fit=fill&w=600&h=338"}
                                                    ribbon={"Hot"}/>
                                </div>
                            </div>
                        </Affix>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;