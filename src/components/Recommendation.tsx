import {Skeleton} from "antd";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper.ts";
import './Recommendation.css'

function Recommendation({id}: { id?: number }) {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [src, setSrc] = useState("")

    useEffect(() => {
        if (!id)
            return
        /*
        fetchWrapper.get(`api/v1/courses/${id}`).then((res) => {
            setTitle(res.payload.title)
            setDesc(res.payload.description)
            setSrc(res.payload.image)
        })
        */

        setTimeout(() => {
            setTitle("Lerne Scrum")
            setDesc("Scrum ist ein Framework für die agile Softwareentwicklung. Es wurde ursprünglich in der Softwaretechnik entwickelt, ist aber davon unabhängig. Scrum wird inzwischen in vielen Bereichen eingesetzt.")
            setSrc("https://media.licdn.com/dms/image/C4D0DAQHDhV5Kpf9QtQ/learning-public-crop_288_512/0/1636550183863?e=1700679600&v=beta&t=NibEkRqX1fs5U9q68ktGfuRwtBprd2MVhMKr1qEK6K8")
        }, Math.random() * 3000)

    }, [id]);

    return (<>
        <div id="recom" style={{
            maxWidth: "240px",
            maxHeight: "180px",
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
        }}>
            <div id="recompic" style={{height: "120px"}}>
                {
                    src != "" ?
                        <img style={{
                            objectFit: "cover",
                            borderRadius: "10px",
                            width: "220px",
                            height: "100%",
                            userSelect: "none",
                            pointerEvents: "none"
                        }} src={src}/>
                        : <Skeleton.Image style={{
                            objectFit: "cover",
                            borderRadius: "10px",
                            width: "220px",
                            height: "100%",
                            userSelect: "none",
                            pointerEvents: "none"
                        }} active/>
                }

            </div>
            {
                title != "" ?
                    <h3 style={{margin: "5px"}}>{title}</h3>
                    : <Skeleton.Input active size="small" style={{margin: "5px"}}/>
            }
        </div>
    </>);
}

export default Recommendation;