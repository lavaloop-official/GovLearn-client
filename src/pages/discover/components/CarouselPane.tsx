import {Button, Col, Row, Skeleton} from "antd";
import './CarouselPane.css'
import {Course} from "../../../constants/interfaces.ts";
import Bookmark from "../../bookmark/components/Bookmark.tsx";

function CarouselPane({obj}: { obj?: Course }) {

    return (
        <>
            <div style={{background: "#F9F9F9", borderRadius: "20px", width: "100%", height: "400px",}}>
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
                                (obj) ?
                                    <>
                                        <h1 style={{wordWrap: "break-word"}}>{obj.name}</h1>
                                        <h3 style={{wordWrap: "break-word"}}>{obj.description}</h3>
                                        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                                            <Button type="primary" shape="round"
                                                    style={{maxWidth: "130px", width: "100%"}}
                                                    href={`/detail/${obj.id}`}>
                                                Weiterlesen
                                            </Button>
                                            {obj.id ? <Bookmark id={obj.id}/> : <></>}
                                        </div>
                                    </>
                                    : <Skeleton active/>
                            }
                        </div>

                    </Col>
                    <Col span={16}>
                        <div style={{display: "flex", width: "100%", height: "100%"}}>
                            {
                                obj ?
                                    <img src={obj.image} style={{
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
