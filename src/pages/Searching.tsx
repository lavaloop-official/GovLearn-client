import {Skeleton} from "antd";
import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import Course from "../course.ts";
import { fetchWrapper } from "../api/helper.ts";
import { useParams } from "react-router-dom";

function Searching() {

    //TODO: How to fetch courses?
    //TODO: How to input from searchbar
    const [courses, setCourses] = useState<Course[]>([])

    const searchStr = location.pathname.split('/').pop();

    useEffect(() => {
        fetchWrapper.get('api/v1/filter/'+ searchStr).then((res) => {
            setCourses(res.payload)
        })
    })

    return (
        <div style={{display:"flex", width:"100%", justifyContent:"center", flexDirection:"row", flexWrap:"wrap"}}>
            <div style={{flexBasis:"100%", textAlign:"center", marginTop:"1rem"}}>
            {
                searchStr ?
                    <h1 style={{margin: "0 0 5px 0"}}>{searchStr}</h1>
                    : <h1 style={{margin: "0 0 5px 0"}}>Bitte geben Sie einen Suchbegriff ein!</h1>
            }
            </div>
            <div>
            {
                courses ?
                    courses.map((item: Course) => <div key={item.id}><SearchComponent obj={item}/></div>)
                    : <SearchComponent/>
            }
            </div>
        </div>

    );
}

export default Searching;