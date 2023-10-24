
const srcplaceholder: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR98LmXa4yE0U4qrQ69_L60a12hJ50QeT3KUg&usqp=CAU"
function Recommendation({title = "Angebot", src = srcplaceholder}: { title: string, src: string}) {
    return (
    <div style={{maxWidth: "200px", maxHeight: "100px", borderRadius: "20px", display: "flex"}}>
        <img style={{height: "100%", width: "100%", objectFit: "cover", borderRadius: "20px"}} src={src}/>
        <h3 style={{position: "absolute", padding: "12px", alignSelf: "end", margin: "0", color: "#ffffff"}}>{title}</h3>
    </div>
  );
}

export default Recommendation;