import {Badge, Button} from "antd";

const srcplaceholder: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR98LmXa4yE0U4qrQ69_L60a12hJ50QeT3KUg&usqp=CAU"
const ribbonPlaceHolder: string = "Trending"
const titlePlaceHolder: string = "Angebot"

function Recommendation({title = titlePlaceHolder, src = srcplaceholder, ribbon = ribbonPlaceHolder}: {
    title: string,
    src: string,
    ribbon: string
}) {
    return (
        <div style={{
            maxWidth: "220px",
            maxHeight: "120px",
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            display: "flex",
        }}>
            <Badge.Ribbon text={ribbon}>
                <div style={{height: "120px"}}>
                    <img style={{
                        objectFit: "cover",
                        borderRadius: "20px",
                        width: "220px",
                        height: "100%",
                        userSelect: "none",
                        pointerEvents: "none"
                    }} src={src}/>
                    <div style={{position: "absolute", left: "0", bottom: "0"}}>
                        <Button type="link" shape="round" href="/detail" style={{maxWidth: "150px", display: "flex"}}>
                            <h3 style={{
                                margin: "0",
                                alignSelf: "center",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxWidth: "inherit"
                            }}>{title}</h3></Button>
                    </div>
                </div>
            </Badge.Ribbon>
        </div>
    );
}

export default Recommendation;