import React, { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Flex, Form, Input, InputNumber, Select, Steps, Tag, Upload, message, Image, Card, Skeleton } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";
import { Category, Course, Coursetag } from "../../interfaces";
import { ValueType } from "rc-input-number";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { fetchWrapper } from "../../api/helper";
import CourseInfo from "../Detail/CourseInfo";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

interface ToggleProps {
    ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function AddCourse(Props: ToggleProps) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [page, setPage] = useState(0);
    const [newCourse, setNewCourse] = useState<Course>(
        {
            id: 0,
            name: "",
            description: "",
            startDate: "",
            durationInHours: "",
            costFree: false,
            domainSpecific: false,
            format: "",
            skilllevel: "",
            certificate: false,
            link: "",
            image: "",
            createdAt: "",
            provider: "",
            instructor: "",
            ratingAverage: 0,
            ratingAmount: 0
        }
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Coursetag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Coursetag[]>([]);

    useEffect(() => {
        const tags = fetchWrapper.get('api/v1/tags').then(res => res.payload)
        const categories = fetchWrapper.get('api/v1/category').then(res => res.payload)
        Promise.all([tags, categories]).then(([tags, categories]) => {
            setCategories(categories);
            setTags(tags);
        });
    }, [])

    const setCourseImage: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
                setNewCourse({ ...newCourse!, image: url });
            });
        }
    };

    const setCourseName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewCourse({ ...newCourse!, name: event.target.value });
    };

    const setCourseDescription: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setNewCourse({ ...newCourse!, description: event.target.value });
    }

    const setCourseStartDate: (date: any, dateString: string) => void = (date, dateString) => {
        setNewCourse({ ...newCourse!, startDate: dateString });
    }

    const setCourseDuration: (value: ValueType | null) => void = (value) => {
        setNewCourse({ ...newCourse!, durationInHours: `${value} Stunden` });
    }

    const setCoursePrice: (e: CheckboxChangeEvent) => void = (e) => {
        setNewCourse({ ...newCourse!, costFree: e.target.checked });
    }

    const setCourseDomainspecific: (e: CheckboxChangeEvent) => void = (e) => {
        setNewCourse({ ...newCourse!, domainSpecific: e.target.checked });
    }

    const setCourseFormat: (value: string) => void = (value) => {
        setNewCourse({ ...newCourse!, format: value });
    }

    const setCourseSkilllevel: (value: string) => void = (value) => {
        setNewCourse({ ...newCourse!, skilllevel: value });
    }

    const setCourseCertificate: (e: CheckboxChangeEvent) => void = (e) => {
        setNewCourse({ ...newCourse!, certificate: e.target.checked });
    }

    const setCourseLink: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewCourse({ ...newCourse!, link: event.target.value });
    }

    const onTagSelection: React.MouseEventHandler<HTMLSpanElement> = (event) => {
        const tag = tags.find((tag) => tag.name === event.currentTarget.innerText);
        if (tag) {
            if (selectedTags.includes(tag)) {
                setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
            } else {
                setSelectedTags([...selectedTags, tag]);
            }
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const nextPage: () => void = () => {
        setPage(page + 1);
    }

    const lastPage: () => void = () => {
        setPage(page - 1);
    }

    const uploadCourse: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        fetchWrapper.post('api/v1/courses', newCourse).then((res) => {
            if (res.success) {
                const course = res.payload;
                console.log(course);
                if (course) {
                    selectedTags.forEach((tag) => {
                        fetchWrapper.post('api/v1/tags/courses', { courseId: course.id, tagId: tag.id });
                    })
                }
            }
        })
        Props.ClickHandler(event);
    }

    return (
        <div style={{ maxWidth: "1200px", minHeight: "860px", margin: "auto", width: "100%", padding: "10px 10px" }}>
            <Steps
                size="small"
                current={page}
                items={[
                    {
                        title: 'Kursdetails festlegen',
                    },
                    {
                        title: 'Tags hinzufügen',
                    },
                    {
                        title: 'Abschluss',
                    },
                ]}
                style={{ margin: "5px" }}
            />
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    background: "#d9d9d9",
                    borderRadius: "20px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    maxWidth: "1200px",
                }}
            >
                <Flex vertical justify="center" >
                    {page === 0 ?
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            /*onFinish={onFinish}
                            onFinishFailed={onFinishFailed}*/
                            autoComplete="off">
                            <h4>Allgemeines</h4>
                            <hr />
                            <Form.Item name="picture" label="Bild">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                //onChange={setCourseImage}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>

                            <Form.Item name="image" label="Bild-Url">
                                <Input defaultValue={newCourse?.image} width={"100px"} onChange={(event) => {
                                    setNewCourse(
                                        { ...newCourse!, image: event.target.value }
                                    )
                                }} />
                            </Form.Item>
                            <Flex justify="center">
                                {newCourse?.image ? <Image src={newCourse?.image} style={{ margin: "5px 0px 15px", border: "1px solid black", borderRadius: "25px" }} /> : <></>}
                            </Flex>
                            <Form.Item name="name" label="Name">
                                <Input defaultValue={newCourse?.name} width={"100px"} onChange={setCourseName} />
                            </Form.Item>
                            <Form.Item name="description" label="Beschreibung">
                                <TextArea defaultValue={newCourse?.description} onChange={setCourseDescription} />
                            </Form.Item>
                            <h4>Details</h4>
                            <hr />
                            <Form.Item name="startDate" label="Start-Datum" >
                                <DatePicker onChange={setCourseStartDate} />
                            </Form.Item>
                            <Form.Item name="duration" label="Dauer" >
                                <InputNumber defaultValue={newCourse?.durationInHours} addonAfter="Stunden" onChange={setCourseDuration} />
                            </Form.Item>
                            <Form.Item name="price" label="Kostenfrei">
                                <Checkbox defaultChecked={newCourse?.costFree} onChange={setCoursePrice}></Checkbox>;
                            </Form.Item>
                            <Form.Item name="domainspecific" label="Verwaltungsbezogen">
                                <Checkbox defaultChecked={newCourse?.domainSpecific} onChange={setCourseDomainspecific}></Checkbox>;
                            </Form.Item>
                            <Form.Item name="format" label="Format">
                                <Select
                                    defaultValue={newCourse?.format}
                                    style={{ width: 120 }}
                                    onChange={setCourseFormat}
                                    options={[
                                        { value: 'Praesenz', label: 'Präsenz' },
                                        { value: 'OnlineLive', label: 'Live (Online)' },
                                        { value: 'OnlineSelbstorganisiert', label: 'Selbstorganisiert (Online)' },
                                        { value: 'Hybrid', label: 'Hybrid' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name="skilllevel" label="Schwierigkeit">
                                <Select
                                    defaultValue={newCourse?.skilllevel}
                                    style={{ width: 120 }}
                                    onChange={setCourseSkilllevel}
                                    options={[
                                        { value: 'Anfaenger', label: 'Anfänger' },
                                        { value: 'Fortgeschritten', label: 'Fortgeschritten' },
                                        { value: 'Experte', label: 'Experte' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name="certificate" label="Zertifikat">
                                <Checkbox defaultChecked={typeof newCourse?.certificate === 'boolean' ? newCourse.certificate : false} onChange={setCourseCertificate}></Checkbox>;                            </Form.Item>
                            <h4>Links</h4>
                            <hr />
                            <Form.Item name="website" label="Website">
                                <Input defaultValue={newCourse?.link} width={"100px"} onChange={setCourseLink} />
                            </Form.Item>
                        </Form> : page === 1 ?
                            <div>
                                <h4>Füge passende Tags hinzu</h4>
                                <p>Diese helfen uns das Weiterbildungsangebot für passende Nutzer vorzuschlagen</p>
                                <hr />
                                <Flex vertical style={{ gap: "10px" }}>
                                    {
                                        categories.map((category) => {
                                            return (
                                                <div key={category.id}>
                                                    <h4>{category.name}</h4>
                                                    <Flex wrap="wrap" gap={"10px"}>
                                                        {
                                                            tags.filter((tag) => tag.categoryID === category.id).map((tag) => {
                                                                return (
                                                                    <div key={tag.id}>
                                                                        {
                                                                            selectedTags.includes(tag) ?
                                                                                <Tag style={{ background: "cornflowerblue", color: "white", padding: "3px", border: "1px solid blue", cursor: "pointer", fontWeight: "bold" }} onClick={onTagSelection}>{tag.name}</Tag>
                                                                                :
                                                                                <Tag style={{ background: "white", padding: "3px", border: "1px solid gray", cursor: "pointer" }} onClick={onTagSelection}>{tag.name}</Tag>
                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </Flex>
                                                </div>
                                            )
                                        })
                                    }
                                </Flex>
                            </div>
                            : page === 2 ?
                                <Flex vertical justify="center" gap={"2px"}>

                                    <h2>Vorschau: neues Weiterbildungsangebot</h2>
                                    {
                                        newCourse && <CourseInfo course={newCourse} />
                                    }
                                    <Flex>
                                        {
                                            selectedTags.map((tag) => {
                                                return (
                                                    <Tag style={{ background: "cornflowerblue", color: "white", padding: "3px", border: "1px solid blue", fontWeight: "bold" }}>{tag.name}</Tag>
                                                )
                                            })
                                        }
                                    </Flex>
                                </Flex>
                                : <></>
                    }
                </Flex>
                {page === 0 ?
                    <Flex justify="space-between" style={{ margin: "15px" }}>
                        <Button onClick={Props.ClickHandler}>Abbrechen</Button>
                        <Button onClick={nextPage}>Weiter</Button>
                    </Flex>
                    : page === 1 ?
                        <Flex justify="space-between" style={{ margin: "15px" }}>
                            <Button onClick={lastPage}>Zurück</Button>
                            <Button onClick={nextPage}>Weiter</Button>
                        </Flex>
                        : page === 2 ?
                            <Flex justify="space-between" style={{ margin: "15px" }}>
                                <Button onClick={lastPage}>Zurück</Button>
                                <Button type="primary" onClick={uploadCourse}>Abschließen</Button>
                            </Flex>
                            : <></>
                }
            </div>
        </div>
    )
}

export default AddCourse;

