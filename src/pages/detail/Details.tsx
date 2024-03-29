import {Affix, Button, Card, Flex, Rate} from "antd";
import {useEffect, useState} from "react";
import {ArrowLeftShort} from "react-bootstrap-icons";
import Recommendation from "../../components/recommmendation/Recommendation.tsx";
import Feedback from "./components/Feedback.tsx";
import {fetchWrapper} from "../../api/helper.ts";
import './Details.css';
import {Course, Review} from "../../constants/interfaces.ts";
import ReviewComp from "./components/ReviewComp.tsx";
import {useNavigate} from "react-router-dom";
import CourseInfo from "./components/CourseInfo.tsx";

/**
 * Details function component
 *
 * This component fetches and displays detailed information about a specific course.
 * It uses the CourseInfo, Feedback, and Recommendation components to display the course information, feedback, and related courses respectively.
 * The course data and feedback are fetched from the API endpoints 'api/v1/courses/{courseId}' and 'api/v1/feedback/course/{courseId}'.
 * The related courses are fetched from the API endpoint 'api/v1/similar-courses/{courseId}'.
 *
 * @returns JSX.Element
 */
function Details() {

    const limit = 5;

    const navigate = useNavigate();

    const [course, setCourse] = useState<Course>({
        id: undefined,
        name: "",
        image: undefined,
        description: undefined,
        createdAt: undefined,
        provider: undefined,
        instructor: undefined,
        certificate: undefined,
        skilllevel: undefined,
        durationInHours: undefined,
        format: undefined,
        startDate: undefined,
        costFree: undefined,
        domainSpecific: undefined,
        link: undefined,
        ratingAverage: undefined,
        ratingAmount: undefined,
    });

    const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [feedback, setFeedback] = useState<Review[]>([]);
    const [noFeebackLeft, setNoFeedbackLeft] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const courseId = window.location.pathname.split('/').pop();

        fetchWrapper.get(`api/v1/courses/${courseId}`).then((res) => {
            if (!res)
                navigate('/404');
            setCourse(res.payload);
            document.title = res.payload.name;
        });
        fetchWrapper.get(`api/v1/feedback/course/${courseId}?limit=5&offset=0`).then((res) => {
            setFeedback(res.payload);
            setOffset(5);
            if (res.payload.length < 5) {
                setNoFeedbackLeft(true);
            }
        });
        fetchWrapper.get(`api/v1/similar-courses/${courseId}/`).then((res) => {
            const filtered = res.payload.slice(0, 3);
            setRelatedCourses(filtered);
        });

    }, [navigate]);

    const onClickBackBtn = () => {
        history.back();
    }

    const loadFeedback = () => {
        const courseId = window.location.pathname.split('/').pop();
        fetchWrapper.get(`api/v1/feedback/course/${courseId}?limit=${limit}&offset=${offset}`).then((res) => {
            setFeedback([...feedback, ...res.payload]);
            setOffset(offset + limit);
            if (res.payload.length < limit) {
                setNoFeedbackLeft(true);
            }
        });
    }

    const finishCallback = () => {
        const courseId = window.location.pathname.split('/').pop();
        setTimeout(() => {
            fetchWrapper.get(`api/v1/feedback/course/${courseId}?limit=5&offset=0`).then((res) => {
                setFeedback(res.payload);
                setOffset(5);
                if (res.payload.length < 5) {
                    setNoFeedbackLeft(true);
                }
            });
            fetchWrapper.get(`api/v1/feedback/average/course/${courseId}`).then((res) => {
                setCourse(prevState => ({...prevState, ratingAverage: res.payload}));
            });
        }, 500);
    }

    return (
        <>
            <Flex
                style={{
                    justifyContent: "center"
                }}>
                <div style={{maxWidth: "1200px", width: "100%"}}>
                    <Flex
                        gap="small"
                        style={{
                            width: "100%",
                            margin: "auto",
                            padding: "10px",
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={onClickBackBtn}
                            style={{
                                height: "fit-content",
                                width: "fit-content",
                                padding: "0",
                                lineHeight: "0px",
                                alignSelf: "center",
                            }}
                            icon={<ArrowLeftShort size={40}/>}
                        />
                        <h1 style={{margin: "0", padding: "0 15px"}}>{course.name}</h1>
                    </Flex>
                    <Flex>
                        <Flex vertical className="course-main"
                              style={{
                                  maxWidth: "1200px",
                                  width: "100%",
                                  margin: "auto",
                                  padding: "10px",
                              }}
                        >
                            <CourseInfo course={course}></CourseInfo>
                            <div
                                style={{
                                    background: "#F9F9F9",
                                    borderRadius: "20px",
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    display: "flex",
                                    flexDirection: "column",
                                    marginBottom: "5px",
                                    marginTop: "5px",
                                }}
                            >
                                <Flex style={{justifyContent: "space-between", width: "100%"}}>
                                    <Card className="antcard" style={{margin: "5px", width: "30%"}}>
                                        <p style={{fontWeight: "bold"}}>Durchschnittsbewertung</p>
                                        <Rate disabled allowHalf value={course.ratingAverage}/>
                                    </Card>
                                    <ReviewComp id={course.id} finishCallback={finishCallback}></ReviewComp>
                                </Flex>
                            </div>
                            <div
                                style={{
                                    background: "#F9F9F9",
                                    borderRadius: "20px",
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                }}
                            >
                                <Flex vertical gap="small" className="course-feedback"
                                      style={{margin: "5px", borderRadius: "15px"}}>
                                    {feedback.length > 0 ? (
                                        feedback.map((feedbackItem) => (
                                            <Feedback review={feedbackItem} key={feedbackItem.feedbackID}></Feedback>
                                        ))
                                    ) : (
                                        <Card className="antcard" style={{justifyContent: "center"}}>keine Bewertungen
                                            vorhanden.</Card>
                                    )}
                                    {!noFeebackLeft &&
                                        <Button type="primary" onClick={loadFeedback}>mehr Laden</Button>}
                                </Flex>
                            </div>
                        </Flex>
                        <Affix offsetTop={90}>
                            <div style={{width: "100%", padding: "10px", display: "flex"}}>
                                <div
                                    style={{
                                        background: "#F9F9F9",
                                        borderRadius: "20px",
                                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: "10px",
                                        gap: "10px",
                                    }}
                                >
                                    <h2
                                        style={{
                                            padding: "10px",
                                            lineHeight: "0",
                                            textAlign: "center",
                                        }}
                                    >
                                        Empfehlungen
                                    </h2>
                                    {relatedCourses.length > 0 ?
                                        relatedCourses.map((course) => (
                                            <Recommendation obj={course} key={course.id}/>
                                        )) :
                                        <>
                                            <Recommendation/>
                                            <Recommendation/>
                                            <Recommendation/>
                                        </>
                                    }

                                </div>
                            </div>
                        </Affix>
                    </Flex>
                </div>
            </Flex>
        </>
    );
}


export default Details;
