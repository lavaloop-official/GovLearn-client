import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import {Course, CourseFilterWsTo} from "../interfaces.ts";
import {fetchWrapper} from "../api/helper.ts";
import {useLocation} from "react-router-dom";
import {Button, Empty} from 'antd';
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
        format: [],
        dauerInMinLaengerAls: undefined,
        verwaltungsspezifisch: undefined,
        dauerInMinKuerzerAls: undefined,
        anbieter: [],
        startdatum: undefined,
        kompetenzstufe: [],
        zertifikat: undefined,
        kostenlos: undefined
    });

    const onSearch = (value: string) => {
        setSearchStr(value);
    }

    // Define the callback function
    const onFilterChange = (filter: object): void => {
        setCourseFilter(courseFilter => ({...courseFilter, ...filter}));
    };

    const handlePagination = () => {
        const newOffset = offset + limit;
        setOffset(newOffset)
        fetchWrapper.post('api/v1/filter/limit/' + limit + '/offset/' + newOffset + '/' + searchStr, courseFilter).then((res) => {
            setCourses(courses => [...courses, ...res.payload]);
        });
    }

    useEffect(() => {
        setOffset(0);
        fetchWrapper.post('api/v1/filter/limit/' + limit + '/offset/' + 0 + '/' + searchStr, courseFilter).then((res) => {
            setCourses(res.payload);
        });
    }, [searchStr, courseFilter]);

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
                    <SearchOptions initialTags={location.state?.tagsforselect ?? []} onFilterChange={onFilterChange}/>
                </div>
                <div style={{flex: "1", maxWidth: "1000px", marginRight: "1rem"}}>
                    {
                        courses && courses.length > 0 ?
                            courses.map((course: Course) =>
                                <div key={course.id}><SearchComponent obj={course}/></div>
                            ) :
                            <div style={{marginTop: "1rem"}}>
                                <Empty description={"Für die angegebenen Kriterien wurden keine Kurse gefunden."}/>
                            </div>
                    }
                    <div style={{flexBasis: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}}>
                        <Button type="primary" onClick={handlePagination}>Mehr anzeigen</Button>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Searching;