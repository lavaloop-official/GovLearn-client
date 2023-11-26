import {Rate, Skeleton} from "antd";
import Course from "../course.ts";

function SearchComponent({obj}: {obj?: Course}) {

    // TODO: Integrate Rating
    return (
        <a href="/detail" style={{textDecoration:"none", color:"inherit"}}>
            <div style={{background:"lightgrey", width:"1000px", borderRadius:"0.5rem", marginTop:"1rem", boxShadow:"0px 0px 2px 1px grey", display:"flex"}}>
            <div style={{background:"grey", width:"10rem", height:"10rem", boxShadow:"2px", color:"black", margin:"0.3rem", borderRadius:"0.2rem", flex:"0 0 10rem"}}>
                {
                    obj ?
                        <img src={obj.image} style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"0.2rem"}}/>
                        : <Skeleton.Image style={{
                            objectFit: "contain",
                            width:"100%",
                            height:"100%",
                        }} active/>
                }
            </div>
            <div style={{width:"100%", marginLeft:"0.3rem", marginRight:"1.3rem", height:"100%"}}>
                <div style={{display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center"}}>
                    <div>
                        {
                            obj ?
                                <h2 style={{maxWidth:"750px"}}>{obj.name}</h2>
                                :<Skeleton.Input active/>
                        }
                    </div>
                    {
                        obj ?
                        <Rate allowHalf disabled defaultValue={3.5} />
                        : <Skeleton.Input active/>
                    }
                </div>
                <div style={{marginTop:"-20px"}}>
                    {
                        obj ?
                            <p>{obj.description}</p>
                            :<Skeleton.Input active/>
                    }
                </div>
            </div>
        </div>
        </a>
    );
}

export default SearchComponent;