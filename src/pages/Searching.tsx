import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import {Course} from "../interfaces.ts";
import {fetchWrapper} from "../api/helper.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from 'antd';
import SearchOptions from "../components/SearchOptions.tsx";

function Searching() {
      
    const loc = useLocation();

    const [courseFeedbacks, setCourseFeedbacks] = useState<{ course: Course, feedback: number }[]>([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const searchStr = location.pathname.split('/').pop();

    const handlePagination = () => {
        setLimit(limit+10)
    }

    const navigate = useNavigate();

    useEffect(() => {
        const tagIDs = loc.state?.tagIDs;
        console.log(tagIDs)
        fetchWrapper.post('api/v1/filter/limit/'+ limit + '/offset/' + offset + '/' + searchStr, tagIDs).then((res) => {
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
    }, [limit, offset, searchStr, navigate, loc.state]);

    return (
        <div style={{display: "flex", width: "100%", justifyContent: "center", flexDirection: "row", flexWrap: "wrap"}}>
            <div style={{flexBasis: "100%", textAlign: "center", marginTop: "1rem"}}>
                {
                    searchStr ?
                        <h1 style={{margin: "0 0 5px 0"}}>{searchStr}</h1>
                        : <h1 style={{margin: "0 0 5px 0"}}>Alle unsere Kursangebote!</h1>
                }
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", flexDirection: "row", flexWrap: "wrap"}}>
                <div style={{margin:"1rem"}}>
                    <SearchOptions></SearchOptions>
                </div>
                <div style={{flex:"1", maxWidth:"1000px", marginRight:"1rem"}}>
                {
                    courseFeedbacks ?
                        courseFeedbacks.map((item: any) => <div key={item.course.id}><SearchComponent obj={item.course}
                                                                                                      feedbackrate={item.feedback}/>
                        </div>)
                        : <SearchComponent/>
                }
            </div>
            <div style={{flexBasis: "100%", display:"flex", justifyContent:"center", marginTop:"20px"}}>
                <Button type="primary" onClick={handlePagination}>Mehr anzeigen</Button>
            </div>
            </div>
        </div>

    );
}

export default Searching;