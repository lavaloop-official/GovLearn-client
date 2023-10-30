import {Affix, Button} from "antd";
import {useEffect} from "react";
import {ArrowLeftShort} from "react-bootstrap-icons";
import Recommendation from "../components/Recommendation.tsx";

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
                        <h1 style={{margin: "0", padding: "0 15px", alignSelf: "center"}}>{title}</h1>
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
                                height: "100px",
                                width: "100%",
                                background: "#d9d9d9",
                                borderRadius: "20px",
                                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                display: "flex",
                            }}>

                            </div>
                            <div style={{height: "1000px", width: "100px", background: "green"}}>nur hier um scrolling
                                zu testen
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