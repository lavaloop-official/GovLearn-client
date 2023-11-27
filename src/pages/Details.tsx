import {Affix, Button, Card, Flex, Form, Image, Input, Rate} from "antd";
import {useEffect, useState} from "react";
import {ArrowLeftShort} from "react-bootstrap-icons";
import Recommendation from "../components/Recommendation.tsx";
import Feedback from "../components/Detail/Feedback.tsx";
import {fetchWrapper} from "../api/helper.ts";
import Modal from "antd/es/modal/Modal";
import './Details.css';
import {Course, Review} from "../interfaces.ts";
import ReviewComp from "../components/Detail/ReviewComp.tsx";

function Details() {
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
        domainSpecific: undefined
    });

    const [averageRating, setAverageRating] = useState<number>(0);

    const [feedback, setFeedback] = useState<Review[]>([]);
    const [courseTags, setCourseTags] = useState<string[]>([]); // Use an array to store multiple tags
    const [tags, setTags] = useState<{
        id: number,
        name: string
    }[]>([]); // Use an array to store multiple tags
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const defaultImageSrc = "https://st4.depositphotos.com/13194036/31587/i/450/depositphotos_315873928-stock-photo-selective-focus-happy-businessman-glasses.jpg"
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [form] = Form.useForm();
    //const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');


    useEffect(() => {
        const courseId = window.location.pathname.split('/').pop();
        fetchWrapper.get(`api/v1/tags/courses/${courseId}`).then((res) => {
            // Assuming res.payload is an array of tag objects with a 'name' property
            const tagNames = res.payload.map((tag: {
                name: string
            }) => tag.name);
            setCourseTags(tagNames);
        });
        fetchWrapper.get(`api/v1/courses/${courseId}`).then((res) => {
            setCourse(res.payload);
            document.title = res.payload.name;
        });
        fetchWrapper.get(`api/v1/tags`).then((res) => {
            // Assuming res.payload is an array of tag objects with a 'name' property
            const tags = res.payload.map((tag: {
                id: number;
                name: string;
            }) => (
                {
                    id: tag.id,
                    name: tag.name
                }
            ))
            setTags(tags);
        });
        fetchWrapper.get(`api/v1/feedback/course/${courseId}/limit/100/offset/0`).then((res) => {
            setFeedback(res.payload);
        });
        fetchWrapper.get(`api/v1/feedback/average/course/${courseId}`).then((res) => {
            console.log(res.payload);
            setAverageRating(res.payload);
        });
    }, []);

    const showTagModal = () => {
        setIsTagModalOpen(true);
    };

    const findTagIdByName = (tagName: string | null) => {
        const foundTag = tags.find((tag) => tag.name === tagName);
        return foundTag ? foundTag.id : null;
    };

    /*
        const requestBody = {
            courseId: course.id,
            tagId: findTagIdByName(selectedValue),
        };

     */

    const handleTagOk = () => {
        setIsTagModalOpen(false);
        /*
        if (findTagIdByName(selectedValue) != null) {
            fetchWrapper.post(`api/v1/tags/courses`).then((res) => {
                body: requestBody
            }).then((res) => {
                // Handle the response
                console.log(res);
            })
                .catch((error) => {
                    // Handle errors
                    console.error(error);
                    ;
                })
        }
        ;
        */
    }

    const handleTagCancel = () => {
        setIsTagModalOpen(false);
    };

    const handleTagChange = (value: string | null) => {
        setSelectedValue(value);
    };

    const getOptions = () => {
        return tags.map((tag) => ({
            value: tag.name,
            label: tag.name,
            disabled: courseTags.includes(tag.name),
        }));
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const filterOption = (input: string, option?: {
        label: string;
        value: string
    }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const showFeedbackModal = () => {
        setIsFeedbackModalOpen(true);
    };

    const handleFeedbackOk = () => {
        setIsFeedbackModalOpen(false);
        //TODO: Richtige Daten aus Formular verwenden
        const feedback = {
            "title": "Super Kurs!",
            "description": "Ein super Weiterbildungsangebot! Es hat mir sehr geholfen und ich kann es nur weiterempfehlen!",
            "rating": 3,
            "courseID": course.id,
        }
        fetchWrapper.post(`api/v1/feedback`, feedback).then((res) => {
            console.log(res);
        })
    };

    const handleFeedbackCancel = () => {
        setIsFeedbackModalOpen(false);
    };

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
                            href="/discover"
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
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "#d9d9d9",
                                    borderRadius: "20px",
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    display: "flex",
                                }}
                            >
                                <img
                                    src={course.image ? course.image : defaultImageSrc}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "20px",
                                        padding: "5px"
                                    }}
                                />

                                <Flex className="course-sidebar" vertical gap="middle"
                                      style={{
                                          width: "200px",
                                          padding: "5px",
                                      }}
                                >
                                    <Card className="antcard" style={{height: "100%"}}>
                                        <div className="course-details" style={{
                                            padding: "2px"
                                        }}>
                                            {course.durationInHours && (
                                                <div className="course-attribute">
                                                    <p className="attribute-label">Länge:</p>
                                                    <p className="attribute-value">{course.durationInHours}</p>
                                                </div>
                                            )}
                                            {course.skilllevel && (
                                                <div className="course-attribute">
                                                    <p className="attribute-label">Schwierigkeit:</p>
                                                    <p className="attribute-value">{course.skilllevel}</p>
                                                </div>
                                            )}
                                            {course.format && (
                                                <div className="course-attribute">
                                                    <p className="attribute-label">Format:</p>
                                                    <p className="attribute-value">{course.format}</p>
                                                </div>
                                            )}
                                            {course.startDate && (
                                                <div className="course-attribute">
                                                    <p className="attribute-label">Start:</p>
                                                    <p className="attribute-value">{new Date(course.startDate).toLocaleDateString('DE')}</p>
                                                </div>
                                            )}
                                            {course.domainSpecific && (
                                                <div className="course-attribute">
                                                    <p className="attribute-label">Verwaltungsbezogen:</p>
                                                    <p className="attribute-value">{course.domainSpecific}</p>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                    <Button style={{margin: "5px", borderRadius: "15px"}} type="primary" size="large">
                                        Zum Angebot
                                    </Button>
                                </Flex>
                            </div>
                            {/*
                            {tags.length > 0 ? (
                                <ul>
                                    {courseTags.map((tag, index) => (
                                        <Tag key={index} color="cornflowerblue"
                                             style={{fontWeight: "bolder", padding: "1px"}}>{tag}</Tag>
                                    ))}
                                    <Button size="small" shape="circle" onClick={showTagModal} icon={<PlusOutlined/>}/>
                                </ul>
                            ) : (
                                <p>Keine Tags vorhanden</p>
                            )}
                            <Modal title="Tag hinzufügen" open={isTagModalOpen} onOk={handleTagOk}
                                   onCancel={handleTagCancel}>
                                <label>
                                    <Select
                                        showSearch
                                        //defaultValue=""
                                        style={{width: 120}}
                                        onSearch={onSearch}
                                        filterOption={filterOption}
                                        onChange={handleTagChange}
                                        options={getOptions()}
                                    />
                                </label>
                            </Modal>
                            */}
                            <div
                                style={{
                                    background: "#d9d9d9",
                                    borderRadius: "20px",
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    marginBottom: "5px",
                                    marginTop: "5px"
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
                            </div>
                            <div
                                style={{
                                    background: "#d9d9d9",
                                    borderRadius: "20px",
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    display: "flex",
                                    marginBottom: "5px"
                                }}
                            >
                                <Flex style={{justifyContent: "space-between", width: "100%"}}>
                                    <Card className="antcard" style={{margin: "5px", width: "30%"}}>
                                        <p>Durchschnittsbewertung</p>
                                        <Rate disabled value={averageRating} />
                                    </Card>
                                    <ReviewComp id={course.id}></ReviewComp>
                                </Flex>
                            </div>
                            <Modal title="Deine Bewertung" open={isFeedbackModalOpen} onOk={handleFeedbackOk}
                                   onCancel={handleFeedbackCancel}>
                                <br/>
                                <div style={{
                                    background: "#FFFFFF",
                                    borderRadius: "20px",
                                    display: "inline-block",
                                    padding: "5px",
                                    marginBottom: "5px"
                                }}>
                                    <Rate/>
                                </div>
                                <Form
                                    form={form}
                                    layout="vertical"
                                >
                                    <Form.Item
                                    >
                                        <Input placeholder="Titel (optional)"/>
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Input placeholder="Text (optional)"/>
                                    </Form.Item>
                                </Form>
                            </Modal>
                            <div
                                style={{
                                    background: "#d9d9d9",
                                    borderRadius: "20px",
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                }}
                            >
                                <Flex vertical gap="small" className="course-feedback" style={{margin: "5px", borderRadius: "15px"}}>
                                    {feedback.length > 0 ? (
                                        feedback.map((feedbackItem) => (
                                            <Feedback review={feedbackItem}/*TODO: userName verwenden */></Feedback>
                                        ))
                                    ) : (
                                        <Card className="antcard" style={{justifyContent: "center"}}>keine Bewertungen
                                            vorhanden.</Card>
                                    )}
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
                                    {/* //TODO: get recommendations from backend */}
                                    <Recommendation/>
                                    <Recommendation/>
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
