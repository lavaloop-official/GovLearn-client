import {Button, Empty, Flex, Modal} from "antd";
import {ExclamationCircleFilled, FileAddOutlined} from "@ant-design/icons";
import ListComponent from "../../../components/listelement/ListComponent.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../../../api/helper.ts";
import {Course} from "../../../constants/interfaces.ts";

function DashOverview() {
    const {confirm} = Modal;

    const navigate = useNavigate();

    const [providedCourses, setProvidedCourses] = useState<Course[]>([])

    useEffect(() => {
        fetchWrapper.get("api/v1/creators/courses").then((res) => {
            setProvidedCourses(res.payload)
        })
    }, [navigate])

    function handleDelete(id: number | undefined) {
        confirm({
            title: 'Wollen Sie diesen Kurs wirklich löschen?',
            icon: <ExclamationCircleFilled/>,
            content: 'Dieser Kurs wird unwiderruflich gelöscht.',
            okText: 'Ja',
            okType: 'danger',
            cancelText: 'Nein',
            onOk() {
                fetchWrapper.delete('api/v1/courses/' + id).then((res) => {
                    if (res) {
                        setProvidedCourses(prevState => prevState.filter((course) => course.id !== id))
                    }
                });
            }
        });
    }

    return (
        <>
            <div style={{
                maxWidth: "1200px",
                minHeight: "860px",
                margin: "auto",
                width: "100%",
                padding: "10px 10px"
            }}>
                <Flex justify="space-between" align="center">
                    <h1>Meine Kurse</h1>
                    <Button type="primary" icon={<FileAddOutlined/>} onClick={() => {
                        navigate("/dashboard/add/details")
                    }}>
                        Angebot hinzufügen
                    </Button>
                </Flex>
                {providedCourses.length > 0 ? providedCourses.map((course) => <div key={course.id}><ListComponent
                        obj={course} editable onDelete={handleDelete} /*TODO: delete durch parent mitgeben*/ />
                    </div>)
                    : <Empty description={"Sie haben noch keine Kurse hinzugefügt."}/>
                }
            </div>
        </>
    );
}

export default DashOverview;