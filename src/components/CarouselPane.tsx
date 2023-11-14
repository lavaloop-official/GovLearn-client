import {Button, Col, Row, Skeleton} from "antd";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper.ts";
import './CarouselPane.css'

function CarouselPane({id}: { id?: number }) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [src, setSrc] = useState("")

    useEffect(() => {
        if (!id)
            return

        fetchWrapper.get(`api/v1/courses/${id}`).then((res) => {
            setTitle(res.payload.title)
            setDesc(res.payload.description)
            setSrc(res.payload.image)
        })


    }, [id]);

    return (
        <>
            <div style={{background: "#D9D9D9", borderRadius: "20px", width: "100%", height: "400px",}}>
                <Row style={{height: "100%", borderRadius: "20px"}}>
                    <Col span={8}>
                        <div style={{
                            margin: "auto",
                            width: "100%",
                            height: "100%",
                            padding: "15px 10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                        }}>
                            {
                                (title != "" && desc != "") ?
                                    <>
                                        <h1 style={{wordWrap: "break-word"}}>{title}</h1>
                                        <h3 style={{wordWrap: "break-word"}}>{desc}</h3>
                                        <Button type="primary" shape="round"
                                                style={{maxWidth: "150px"}}
                                        href={`/detail/${id}`}>
                                            Weiterlesen
                                        </Button>
                                    </>
                                    : <Skeleton active/>
                            }


                        </div>

                    </Col>
                    <Col span={16}>
                        <div style={{display: "flex", width: "100%", height: "100%"}}>
                            {
                                src != "" ?
                                    <img src={src} style={{
                                        maxHeight: "400px",
                                        width: "100%",
                                        borderRadius: "0px 20px 20px 0px",
                                        objectFit: "cover"
                                    }}/>
                                    : <div id="carouselpic" style={{
                                        maxHeight: "400px",
                                        width: "100%",
                                        display: "flex",
                                    }}>
                                        <Skeleton.Image active style={{
                                            borderRadius: "0px 20px 20px 0px",
                                            width: "100%",
                                            height: "100%",
                                        }}/>
                                    </div>

                            }


                        </div>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CarouselPane
