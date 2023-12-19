import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import {Course, CourseFilterWsTo} from "../interfaces.ts";
import {fetchWrapper} from "../api/helper.ts";
import {useLocation} from "react-router-dom";
import {Button} from 'antd';
import SearchOptions from "../components/SearchOptions.tsx";
import Search from "antd/es/input/Search";

function Searching() {

    const limit = 10;

    const location = useLocation();

    const [courses, setCourses] = useState<Course[]>([]);
    const [offset, setOffset] = useState(0);
    const [searchStr, setSearchStr] = useState<string>(location.state?.searchStr ?? "");
    const [courseFilter, setCourseFilter] = useState<CourseFilterWsTo>({
        tagIDs: location.state?.tagIDs ?? [],
        anbieter: [],
        wissensbezug: [],
        verwaltungsspezifisch: false,
        zertifikat: false,
        kompetenzstufe: [],
        format: [],
        startdatum: undefined,
        dauer: [],
        kostenlos: false,
        sonstiges: []
    });

    const onSearch = (value: string) => {
        setSearchStr(value);
    }

    // Define the callback function
    const onFilterChange = (filter: object): void => {
        setCourseFilter(courseFilter => ({...courseFilter, ...filter}));
    };

    const handlePagination = () => {
        setOffset(offset => offset + limit)
    }

    useEffect(() => {
        fetchWrapper.post('api/v1/filter/limit/' + limit + '/offset/' + offset + '/' + searchStr, courseFilter).then((res) => {
            if (offset === 0)
                setCourses(res.payload);
            else
                setCourses([...courses, ...res.payload]);
        });
    }, [limit, offset, searchStr, courseFilter]);

    return (
        <div style={{display: "flex", width: "100%", justifyContent: "center", flexDirection: "row", flexWrap: "wrap"}}>
            <div style={{flexBasis: "100%", textAlign: "center", marginTop: "1rem", maxWidth: "400px"}}>
                <Search size="large" defaultValue={searchStr} placeholder="Kursangebote durchsuchen"
                        onSearch={onSearch}/>
            </div>
            <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                flexDirection: "row",
                flexWrap: "wrap"
            }}>
                <div style={{margin: "1rem"}}>
                    <SearchOptions courseFilter={courseFilter} onFilterChange={onFilterChange}/>
                </div>
                <div style={{flex: "1", maxWidth: "1000px", marginRight: "1rem"}}>
                    {
                        courses ?
                            courses.map((course: Course) => <div key={course.id}><SearchComponent obj={course}/>
                            </div>)
                            : <SearchComponent/>
                    }
                </div>
                <div style={{flexBasis: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}}>
                    <Button type="primary" onClick={handlePagination}>Mehr anzeigen</Button>
                </div>
            </div>
        </div>

    );
}

export default Searching;