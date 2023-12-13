function Groupmember() {

    return (
        <div style={{background:"lightgrey", flex:"1", margin:"10px", borderRadius:"10px", display:"flex", flexDirection:"column"}}>
                    <div style={{margin:"0px 10px 0px 10px"}}>
                        <h1>Gruppentitel</h1>
                    </div>
                    <div style={{margin:"0px 10px 0px 10px"}}>
                        <p>Gruppenbeschreibung</p>
                    </div>
                    <div style={{margin:"0px 10px 0px 10px", display:"flex", flexDirection:"column"}}>
                        <h3>Gruppenmitglieder</h3>
                        <div style={{background:"grey", height:"100px", borderRadius:"10px"}}>

                        </div>
                    </div>
                    <div style={{margin:"0px 10px 0px 10px", display:"flex", flexDirection:"column"}}>
                        <h3>Zugewiesene Kurse</h3>
                        <div style={{background:"grey", height:"100px", borderRadius:"10px"}}>

                        </div>
                    </div>
                    <div style={{margin:"0px 10px 10px 10px", display:"flex", flexDirection:"column"}}>
                        <h3>Abgeschlossene Kurse</h3>
                        <div style={{background:"grey", height:"100px", borderRadius:"10px"}}>

                        </div>
                    </div>
                </div>
    )
}

export default Groupmember;