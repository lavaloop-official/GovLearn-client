import {Button, Col, Image, Row} from "antd";

const srcplaceholer: string = "https://image.stern.de/7690958/t/Qx/v3/w1440/r1.7778/-/stockfotos-aus-der-hoelle-01.jpg"
const descplaceholder: string = "Detailed description of the course goes here and can be very long. It can also be very short."

function CarouselPane({text = "hello", description = descplaceholder, src = srcplaceholer}: {
    text: string | undefined,
    src: string | undefined,
    description: string | undefined
}) {

    return (
        <>
            <div style={{background: "#D9D9D9", borderRadius: "20px", width: "100%", height: "400px"}}>
                <Row style={{height: "100%", borderRadius: "20px"}}>
                    <Col span={8}>
                        <div style={{
                            margin: "auto",
                            width: "100%",
                            height: "100%",
                            padding: "10px 10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                        }}>
                            <h1 style={{wordWrap: "break-word"}}>{text}</h1>
                            <h3 style={{wordWrap: "break-word"}}>{description}</h3>
                            <Button type="primary" shape="round" style={{maxWidth:"150px"}}>Weiterlesen</Button>

                        </div>

                    </Col>
                    <Col span={16}>
                        <div style={{display: "flex", width: "100%"}}>
                            <div style={{
                                marginRight: "0px",
                                marginLeft: "auto"
                            }}>
                                <Image preview={false} src={src}
                                       style={{
                                           maxHeight: "400px",
                                           height: "100%",
                                           borderRadius: "20px",

                                       }}/>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CarouselPane
