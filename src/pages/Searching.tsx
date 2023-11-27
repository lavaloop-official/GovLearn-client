import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import Course from "../course.ts";
import { fetchWrapper } from "../api/helper.ts";

function Searching() {

    //TODO: How to fetch courses?
    //TODO: How to input from searchbar

    const [courseFeedbacks, setCourseFeedbacks] = useState<{course: Course, feedback: number}[]>([]);

    const searchStr = location.pathname.split('/').pop();

    useEffect(() => {
        fetchWrapper.get('api/v1/filter/'+ searchStr).then((res) => {
            const coursePromises = res.payload.map((course: Course) => {
                return fetchWrapper.get('api/v1/feedback/average/course/' + course.id)
                    .then((res) => ({course, feedback: res.payload}))
                    .catch((error) => {
                        console.error(error);
                        return {course, feedback: 0.0};
                    });
            });

            Promise.all(coursePromises).then(setCourseFeedbacks);
        });
    });

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
                courseFeedbacks ?
                    courseFeedbacks.map((item: any) => <div key={item.course.id}><SearchComponent obj={item.course} feedbackrate={item.feedback}/></div>)
                    : <SearchComponent/>
            }
            </div>
        </div>

    );
}

export default Searching;