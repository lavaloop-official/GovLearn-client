import Recommendation from "./Recommendation.tsx";

function RecomSlider({title = "Empfehlung"}: { title: string}) {
    return (
        <>
            <div style={{maxWidth:"1200px", padding: "0px 10px", width:"100%", margin: "auto", display: "flex", flexDirection: "column"}}>
                <h1 style={{margin: "0 0 5px 0"}}>{title}</h1>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "left", gap: "10px"}}>
                    <Recommendation/>
                    <Recommendation/>
                    <Recommendation/>
                </div>
            </div>
        </>
    );
}

export default RecomSlider;