import React, {useEffect, useState} from "react";
import {Button, Checkbox, DatePicker, Flex, Form, Image, Input, InputNumber, message, Select, Steps, Tag} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Category, Coursetag, CreateCourse} from "../../interfaces";
import {fetchWrapper} from "../../api/helper";
import CourseInfo from "../Detail/CourseInfo";
import {useNavigate} from "react-router-dom";

/*const getBase64 = (img: RcFile, callback: (url: string) => void) => {
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
};*/

function AddCourse() {
    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);

    //const [loading, setLoading] = useState(false);

    const [imageUrl, setImageUrl] = useState<string>();
    const [newCourse, setNewCourse] = useState<CreateCourse>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Coursetag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Coursetag[]>([]);

    const [form] = Form.useForm();


    useEffect(() => {
        const tags = fetchWrapper.get('api/v1/tags').then(res => res.payload)
        const categories = fetchWrapper.get('api/v1/category').then(res => res.payload)
        Promise.all([tags, categories]).then(([tags, categories]) => {
            setCategories(categories);
            setTags(tags);
        });
    }, [])

    //TODO: add Image attribute to Course to store images in database
    /*const setCourseImage: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
                setNewCourse({ ...newCourse!, image: url });
            });
        }
    };*/

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

    /*const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );*/

    const uploadCourse = () => {
        fetchWrapper.post('api/v1/courses', {...newCourse}).then((res) => {
            const course = res.payload;
            const requests: Promise<any>[] = [];
            selectedTags.forEach((tag) => {
                requests.push(fetchWrapper.post('api/v1/tags/courses', {
                    courseId: course.id,
                    tagId: tag.id,
                }))
            })
            Promise.all(requests).then(() => {
                navigate("/dashboard/");
            })
        })
    }

    const first = (
        <>
            <Form
                name="basic"
                form={form}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{minWidth: 600, maxWidth: 900}}
                autoComplete="off">
                <h4>Allgemeines</h4>
                <hr/>
                {/*<Form.Item name="picture" label="Bild">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={setCourseImage}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                        </Form.Item>*/}

                {!imageUrl && <>
                    <Form.Item name="image" label="Bild-Url"
                               rules={[{required: true, message: "Bitte geben Sie ein Bild an"}]}>
                        <Input width={"100px"} onChange={(event) => {
                            setNewCourse(
                                {...newCourse!, image: event.target.value}
                            )
                        }}/>
                    </Form.Item>
                    <Flex justify="center">
                        {newCourse?.image ? <Image src={newCourse?.image} style={{
                            margin: "5px 0px 15px",
                            border: "1px solid black",
                            borderRadius: "25px",
                            width: "200px",
                            height: "150px",
                            objectFit: "contain"
                        }}/> : <></>}
                    </Flex>
                </>}
                <Form.Item name="name" label="Name"
                           rules={[{required: true, message: "Bitte geben Sie einen Namen an"}]}>
                    <Input width={"100px"}/>
                </Form.Item>
                <Form.Item name="description" label="Beschreibung"
                           rules={[{required: true, message: "Bitte geben Sie eine Beschreibung an"}]}>
                    <TextArea/>
                </Form.Item>
                <h4>Details</h4>
                <hr/>
                <Form.Item name="createdAt" label="Start-Datum"
                           rules={[{required: true, message: "Bitte geben Sie einen Startdatum an"}]}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item name="durationInHours" label="Dauer">
                    <InputNumber min={1} addonAfter="Stunden"/>
                </Form.Item>
                <Form.Item name="instructor" label="Dozent">
                    <Input width={"100px"}/>
                </Form.Item>
                <Form.Item name="provider" label="Anbieter">
                    <Input width={"100px"}/>
                </Form.Item>
                <Form.Item name="costFree" label="Kostenfrei">
                    <Checkbox/>
                </Form.Item>
                <Form.Item name="domainSpecific" label="Verwaltungsbezogen">
                    <Checkbox/>
                </Form.Item>
                <Form.Item name="format" label="Format"
                           rules={[{required: true, message: "Bitte geben Sie ein Format an"}]}>
                    <Select
                        style={{width: 120}}
                        options={[
                            {value: 'Praesenz', label: 'Präsenz'},
                            {value: 'OnlineLive', label: 'Live (Online)'},
                            {value: 'OnlineSelbstorganisiert', label: 'Selbstorganisiert (Online)'},
                            {value: 'Hybrid', label: 'Hybrid'},
                        ]}
                    />
                </Form.Item>
                <Form.Item name="skilllevel" label="Schwierigkeit"
                           rules={[{required: true, message: 'Please geben Sie eine Schwierigkeit an'}]}>
                    <Select
                        style={{width: 120}}
                        options={[
                            {value: 'Anfaenger', label: 'Anfänger'},
                            {value: 'Fortgeschritten', label: 'Fortgeschritten'},
                            {value: 'Experte', label: 'Experte'},
                        ]}
                    />
                </Form.Item>
                <Form.Item name="certificate" label="Zertifikat">
                    <Checkbox/>
                </Form.Item>
                <h4>Links</h4>
                <hr/>
                <Form.Item name="link" label="Website"
                           rules={[{required: true, message: "Bitte geben Sie den Link zum Angebot an"}]}>
                    <Input width={"100px"}/>
                </Form.Item>
            </Form>
        </>
    )

    const second = (
        <>
            <div>
                <h4>Füge passende Tags hinzu</h4>
                <p>Diese helfen uns das Weiterbildungsangebot für passende Nutzer vorzuschlagen</p>
                <hr/>
                <Flex vertical style={{gap: "10px"}}>
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
                                                                <Tag style={{
                                                                    background: "cornflowerblue",
                                                                    color: "white",
                                                                    padding: "3px",
                                                                    border: "1px solid blue",
                                                                    cursor: "pointer",
                                                                    fontWeight: "bold"
                                                                }} onClick={onTagSelection}>{tag.name}</Tag>
                                                                :
                                                                <Tag style={{
                                                                    background: "white",
                                                                    padding: "3px",
                                                                    border: "1px solid gray",
                                                                    cursor: "pointer"
                                                                }} onClick={onTagSelection}>{tag.name}</Tag>
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
        </>
    )

    const third = (
        <>
            <Flex vertical justify="center" gap={"2px"} style={{minWidth: "900px"}}>

                <h2>Vorschau: neues Weiterbildungsangebot</h2>
                {
                    newCourse && <CourseInfo course={{...newCourse, id: 9999, ratingAverage: 0, ratingAmount: 0}}/>
                }
                <Flex>
                    {
                        selectedTags.map((tag) => {
                            return (
                                <Tag key={tag.id} style={{
                                    background: "cornflowerblue",
                                    color: "white",
                                    padding: "3px",
                                    border: "1px solid blue",
                                    fontWeight: "bold"
                                }}>{tag.name}</Tag>
                            )
                        })
                    }
                </Flex>
            </Flex>
        </>
    )

    const content = [
        {
            content: first,
            step: {
                title: "Kursdetails festlegen"
            },
            url: "details"
        },
        {
            content: second,
            step: {
                title: 'Tags hinzufügen'
            },
            url: "tags"
        },
        {
            content: third,
            step: {
                title: "Abschluss"
            },
            url: "review"
        }
    ];

    const validate = () => {
        if (current == 0) {
            return form.validateFields().then((values) => {
                setNewCourse({
                    name: values.name ?? "",
                    image: values.image ?? "",
                    description: values.description ?? "",
                    createdAt: new Date().toISOString(),
                    provider: values.provider ?? "",
                    instructor: values.instructor ?? "",
                    certificate: values.certificate ?? false,
                    skilllevel: values.skilllevel ?? "Anfaenger",
                    durationInHours: values.durationInHours ?? "",
                    format: values.format ?? "",
                    startDate: new Date(values.startDate ?? new Date().toISOString()).toISOString(),
                    costFree: values.costFree ?? false,
                    domainSpecific: values.domainSpecific ?? false,
                    link: values.link ?? "",
                });
                return true;
            }).catch((info) => {
                console.log('Validate Failed:', info);
                return false;
            });
        } else if (current == 1) {
            if (selectedTags.length > 0 && selectedTags.length < 5) {
                return true;
            } else {
                message.error('Bitte wähle zwischen einem und vier Tags.');
                return false;
            }
        } else
            return true;
    }

    const next = () => {
        if (validate()) {
            if (current == content.length - 1) {
                uploadCourse();
            } else {
                navigate(`/dashboard/add/${content[current + 1].url}`);
            }
        }
    };

    const prev = () => {
        if (current != 0) {
            navigate(`/dashboard/add/${content[current - 1].url}`);
        } else if (current == 0)
            navigate("/dashboard/");
    };

    const onChange = (value: number) => {
        if (value < current) //always allow to go back
            navigate(`/dashboard/add/${content[value].url}`);
        else if (validate()) //only allow to go forward if current page is valid
            navigate(`/dashboard/add/${content[value].url}`);
    };

    useEffect(() => {
        setCurrent(() => {
            const url = window.location.pathname.split("/").pop();
            const index = content.findIndex((item) => item.url == url);
            if (index == -1) return 0;
            return index;
        });
    }, [navigate]);


    return (
        <div style={{maxWidth: "1200px", minHeight: "860px", margin: "auto", width: "100%", padding: "10px 10px"}}>
            <Steps
                size="small"
                onChange={onChange}
                current={current}
                items={content.map((item) => item.step)}
                style={{marginTop: "5px", marginBottom: "10px"}}
            />
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    background: "#d9d9d9",
                    borderRadius: "20px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    maxWidth: "1200px",
                    position: "relative",
                    paddingBottom: "24px"
                }}
            >
                <Flex justify="center">
                    {content[current].content}
                </Flex>
                <Button
                    type="primary"
                    onClick={next}
                    shape="round"
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px"
                    }}
                >
                    {current == content.length - 1 ? "Fertig" : "Weiter"}
                </Button>
                <Button
                    onClick={prev}
                    shape="round"
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px"
                    }}
                >
                    {current == 0 ? "Abbrechen" : "Zurück"}
                </Button>
            </div>
        </div>
    )
}

export default AddCourse;

