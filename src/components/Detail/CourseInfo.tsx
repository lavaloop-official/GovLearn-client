import { Button, Card, Flex, Skeleton, Image } from "antd";
import Bookmark from "../Bookmark";
import { Course } from "../../interfaces";

function CourseInfo({ course }: { course: Course }) {
    const defaultImageSrc = "https://st4.depositphotos.com/13194036/31587/i/450/depositphotos_315873928-stock-photo-selective-focus-happy-businessman-glasses.jpg"

    const translateFormat = (format: string) => {
        switch (format) {
            case "Praesenz":
                return "Präsenz";
            case "OnlineLive":
                return "Online Live-Veranstaltung";
            case "OnlineSelbstorganisiert":
                return "Online Selbstorganisiert";
            case "Hybrid":
                return "Hybridveranstaltung";
            default:
                return "Unbekannt";
        }
    }

    return (
        <Flex vertical
            style={{
                height: "100%",
                width: "100%",
                background: "#d9d9d9",
                borderRadius: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                maxWidth: "1200px",
            }}
        >
            <Flex className="course">
                {
                    course.image ? (
                        <img
                            src={course.image ? course.image : defaultImageSrc}
                            alt=""
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "20px",
                                padding: "5px",
                                maxWidth: "700px",
                                minHeight: "400px"
                            }}
                        />
                    ) : (
                        <div id="detailpic" style={{
                            padding: "5px",
                            maxWidth: "725px",
                            maxHeight: "400px",
                            width: "100%",
                            height: "400px",
                            display: "flex",
                        }}>
                            <Skeleton.Image active style={{
                                borderRadius: "15px",
                                width: "100%",
                                height: "100%",
                            }} />
                        </div>
                    )
                }


                <Flex className="course-sidebar" vertical gap="middle"
                    style={{
                        maxWidth: "200px",
                        width: "100%",
                        padding: "5px",
                    }}
                >
                    <Card className="antcard" style={{ height: "100%" }}>
                        {course.id ? <Bookmark id={course.id}
                            style={{ position: "absolute", top: "10px", right: "10px" }} /> : <></>}
                        <div className="course-details" style={{
                            padding: "0px",
                            maxWidth: "190px",
                            wordWrap: "break-word",
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
                                    <p className="attribute-value">{translateFormat(course.format)}</p>
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
                                    <p className="attribute-value">{course.domainSpecific ? "Ja" : "Nein"}</p>
                                </div>
                            )}
                        </div>
                    </Card>
                    <Button style={{ margin: "5px", borderRadius: "15px" }} type="primary" size="large"
                        href={course.link ? course.link : undefined}>
                        Zum Angebot
                    </Button>
                </Flex>
            </Flex>
            <Flex style={{ justifyContent: "space-between", width: "100%" }}>
                <Card className="antcard" style={{ margin: "5px", width: "70%" }}>
                    <p style={{ fontWeight: "bold" }}>Beschreibung</p>
                    {course.description ? (
                        <p>{course.description}</p>
                    ) : (
                        <p>keine Beschreibung vorhanden.</p>
                    )}
                </Card>
                <Card className="antcard" style={{ margin: "5px", width: "30%" }}>
                    <Flex justify="space-evenly">
                        <Image
                            style={{ borderRadius: '50%', width: '100px', height: '100px' }}
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
        </Flex>
    );
}

export default CourseInfo;