import { Affix, Button, Card, Flex, Image, Rate, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { ArrowLeftShort } from "react-bootstrap-icons";
import Recommendation from "../components/Recommendation.tsx";
import Feedback from "../components/Detail/Feedback.tsx";
import { fetchWrapper } from "../api/helper.ts";
import './Details.css';
import { Course, Review } from "../interfaces.ts";
import ReviewComp from "../components/Detail/ReviewComp.tsx";
import {useNavigate} from "react-router-dom";
import CourseInfo from "../components/Detail/CourseInfo.tsx";

function Details() {

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
    const [limit, setLimit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);
    const [feedback, setFeedback] = useState<Review[]>([]);

    useEffect(() => {
        const courseId = window.location.pathname.split('/').pop();

        fetchWrapper.get(`api/v1/courses/${courseId}`).then((res) => {
            setCourse(res.payload);
            document.title = res.payload.name;
        });
        fetchWrapper.get(`api/v1/feedback/course/${courseId}?limit=${limit}&offset=${offset}`).then((res) => {
            setFeedback(res.payload);
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
        fetchWrapper.get(`api/v1/feedback/course/${courseId}/limit/6/offset/${feedback.length}`).then((res) => {
            setFeedback([...feedback, ...res.payload]);
        });
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
                            <CourseInfo course={course} />
                            <div
                                style={{
                                    background: "#d9d9d9",
                                    borderRadius: "20px",
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    display: "flex",
                                    flexDirection: "column",
                                    marginBottom: "5px",
                                    marginTop: "5px",
                                }}
                            >
                                <Flex style={{justifyContent: "space-between", width: "100%"}}>
                                    <Card className="antcard" style={{margin: "5px", width: "70%"}}>
                                        <p style={{fontWeight: "bold"}}>Beschreibung</p>
                                        {course.description ? (
                                            <p>{course.description}</p>
                                        ) : (
                                            <p>keine Beschreibung vorhanden.</p>
                                        )}
                                    </Card>
                                    <Card className="antcard" style={{margin: "5px", width: "30%"}}>
                                        <Flex justify="space-evenly">
                                            <Image
                                                style={{borderRadius: '50%', width: '100px', height: '100px'}}
                                                // TODO: Bilder von Instructor einfügen
                                                src="https://img.myloview.de/sticker/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-205664584.jpg"
                                                alt="Bild konnte nicht geladen werden"
                                            />
                                            <div>
                                                {
                                                    course.instructor ? (
                                                        <h3>{course.instructor}</h3>
                                                    ) : (
                                                        <h3>Unbekannt</h3>
                                                    )
                                                }
                                            </div>
                                        </Flex>
                                        <p>keine Beschreibung
                                            vorhanden.</p> {/* TODO: Kurs für instructor-Beschreibung überarbeiten */}
                                    </Card>
                                </Flex>
                                <Flex style={{ justifyContent: "space-between", width: "100%" }}>
                                    <Card className="antcard" style={{ margin: "5px", width: "30%" }}>
                                        <p style={{ fontWeight: "bold" }}>Durchschnittsbewertung</p>
                                        <Rate disabled value={course.ratingAverage} />
                                    </Card>
                                    <ReviewComp id={course.id}></ReviewComp>
                                </Flex>
                            </div>
                            <div
                                style={{
                                    background: "#d9d9d9",
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
                                    <Button type="primary" onClick={loadFeedback}>mehr Laden</Button>
                                </Flex>
                            </div>
                        </Flex>
                        <Affix offsetTop={90}>
                            <div style={{width: "100%", padding: "10px", display: "flex"}}>
                                <div
                                    style={{
                                        background: "#d9d9d9",
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
