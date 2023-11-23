import {Affix, Button} from "antd";
import {useEffect, useState} from "react";
import {ArrowLeftShort} from "react-bootstrap-icons";
import Recommendation from "../components/Recommendation.tsx";
import Course from "../course.ts";
import { fetchWrapper } from "../api/helper.ts";

function Searching() {

    //TODO: How to fetch courses?
    //TODO: How to input from searchbar
    const [courses, setCourses] = useState<Course[]>([])
    const input=""

    useEffect(() => {
        fetchWrapper.get("/api/v1/filter/" + {input}).then((res) => {
            setCourses(res.payload.course)
        })
    })

    return (
        <>
        

        </>
    );
}

export default Searching;