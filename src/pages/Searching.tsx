import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import {Course, CourseFilterWsTo} from "../interfaces.ts";
import {fetchWrapper} from "../api/helper.ts";
import {useLocation} from "react-router-dom";
import {Button, Empty} from 'antd';
import SearchOptions from "../components/SearchOptions.tsx";
import Search from "antd/es/input/Search";
import './Searching.css';

/**
 * Searching component
 * This component is responsible for handling the search functionality of the application.
 * It allows users to search for courses and filter the results.
 */
function Searching() {

    const limit = 10;

    const location = useLocation();

    const [isMore, setIsMore] = useState<boolean>(true);
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

    /**
     * Define the onFilterChange function to update the course filter
     */
    const onFilterChange = (filter: object): void => {
        setCourseFilter(courseFilter => ({...courseFilter, ...filter}));
    };

    /**
     * Define the handlePagination function to fetch more courses when the user clicks the "Show more" button
     */
    const handlePagination = () => {
        const newOffset = offset + limit;
        setOffset(newOffset)
        fetchWrapper.post('api/v1/filter/limit/' + limit + '/offset/' + newOffset + '/' + searchStr, courseFilter).then((res) => {
            setCourses(courses => [...courses, ...res.payload]);
            setIsMore(res.payload.length === limit);
        });
    }

    /**
     * Use the useEffect hook to fetch courses when the component mounts or when the search string or course filter changes
     */
    useEffect(() => {
        setOffset(0);
        fetchWrapper.post('api/v1/filter/limit/' + limit + '/offset/' + 0 + '/' + searchStr, courseFilter).then((res) => {
            setCourses(res.payload);
            setIsMore(res.payload.length === limit);
        });
    }, [searchStr, courseFilter]);

    return (
        <div className="searching-container">
            <div className="search-bar">
                <Search size="large" defaultValue={searchStr} placeholder="Kursangebote durchsuchen"
                        onSearch={onSearch}/>
            </div>
            <div className="search-results">
                <div className="search-options">
                    <SearchOptions initialTags={location.state?.tagsforselect ?? []} onFilterChange={onFilterChange}/>
                </div>
                <div className="courses-list">
                    {
                        courses && courses.length > 0 ?
                            courses.map((course: Course) =>
                                <div key={course.id}><SearchComponent obj={course}/></div>
                            ) :
                            <div style={{marginTop: "1rem"}}>
                                <Empty description={"Für die angegebenen Kriterien wurden keine Kurse gefunden."}/>
                            </div>
                    }
                    {
                        isMore && courses.length > 0 ?
                            <div style={{
                                flexBasis: "100%",
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "20px"
                            }}>
                                <Button type="primary" onClick={handlePagination}>Mehr anzeigen</Button>
                            </div> :
                            <></>
                    }
                </div>

            </div>
        </div>
    );
}

export default Searching;