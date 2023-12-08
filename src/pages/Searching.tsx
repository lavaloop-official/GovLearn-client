import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import {Course} from "../interfaces.ts";
import {fetchWrapper} from "../api/helper.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Checkbox, DatePicker, DatePickerProps, Divider, Space} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

function Searching() {
    // Options
    const CheckboxGroupWissensbezug = Checkbox.Group;

    const onChangeWissensbezug = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
      };

    const CheckboxGroupVerwaltungsspezifisch = Checkbox.Group;

    const onChangeVerwaltungsspezifisch = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };

    const CheckboxGroupZertifikat = Checkbox.Group;

    const onChangeZertifikat = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };

    const CheckboxGroupKompetenzstufe = Checkbox.Group;

    const onChangeKompetenzstufe = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };

    const CheckboxGroupFormat = Checkbox.Group;

    const onChangeFormat = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };

    const onChangeStartdatum: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
      };

    const CheckboxGroupKosten = Checkbox.Group;

    const onChangeKosten = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };
      
    const loc = useLocation();

    const [courseFeedbacks, setCourseFeedbacks] = useState<{ course: Course, feedback: number }[]>([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const searchStr = location.pathname.split('/').pop();

    const handlePagination = () => {
        setLimit(limit+10)
    }

    const navigate = useNavigate();

    useEffect(() => {
        const tagIDs = loc.state?.tagIDs;
        console.log(tagIDs)
        fetchWrapper.post('api/v1/filter/limit/'+ limit + '/offset/' + offset + '/' + searchStr, tagIDs).then((res) => {
            const coursePromises = res.payload.map((course: Course) => {
                return fetchWrapper.get('api/v1/feedback/average/course/' + course.id)
                    .then((res) => ({course, feedback: res.payload}))
                    .catch((error) => {
                        console.error(error);
                        return {course, feedback: 0.0};
                    });
            });

            Promise.all(coursePromises).then(setCourseFeedbacks);
        });
    }, [limit, offset, searchStr, navigate, loc.state]);

    return (
        <div style={{display: "flex", width: "100%", justifyContent: "center", flexDirection: "row", flexWrap: "wrap"}}>
            <div style={{flexBasis: "100%", textAlign: "center", marginTop: "1rem"}}>
                {
                    searchStr ?
                        <h1 style={{margin: "0 0 5px 0"}}>{searchStr}</h1>
                        : <h1 style={{margin: "0 0 5px 0"}}>Alle unsere Kursangebote!</h1>
                }
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", flexDirection: "row", flexWrap: "wrap"}}>
                <div style={{margin:"1rem"}}>
                    <Card title="Optionen" size="small" style={{minWidth:"250px", borderRadius:"20px"}}>
                        <p>Anbieter</p>
                        <Divider/>
                        <p>Wissensbezug</p>
                            <CheckboxGroupWissensbezug onChange={onChangeWissensbezug}>
                                <Space direction="vertical">
                                    <Checkbox value="Theorie">Theorie</Checkbox>
                                    <Checkbox value="Praxis">Praxis</Checkbox>
                                </Space>
                            </CheckboxGroupWissensbezug>
                        <Divider/>
                        <p>Verwaltungsspezifisch</p>
                            <CheckboxGroupVerwaltungsspezifisch onChange={onChangeVerwaltungsspezifisch}>
                                <Space direction="vertical">
                                    <Checkbox value="Verwaltungsspezifisch">Verwaltungsspezifisch</Checkbox>
                                </Space>
                            </CheckboxGroupVerwaltungsspezifisch>
                        <Divider/>
                        <p>Zertifikat</p>
                            <CheckboxGroupZertifikat onChange={onChangeZertifikat}>
                                <Space direction="vertical">
                                    <Checkbox value="Zertifikat">Zertifikat</Checkbox>
                                </Space>
                            </CheckboxGroupZertifikat>
                        <Divider/>
                        <p>Kompetenzstufe</p>
                            <CheckboxGroupKompetenzstufe onChange={onChangeKompetenzstufe}>
                                <Space direction="vertical">
                                    <Checkbox value="Einsteiger">Einsteiger</Checkbox>
                                    <Checkbox value="Fortgeschritten">Fortgeschritten</Checkbox>
                                    <Checkbox value="Experte">Experte</Checkbox>
                                </Space>
                            </CheckboxGroupKompetenzstufe>
                        <Divider/>
                        <p>Dauer</p>
                        <Divider/>
                        <p>Format</p>
                            <CheckboxGroupFormat onChange={onChangeFormat}>
                                <Space direction="vertical">
                                    <Checkbox value="Live-Online">Live-Online</Checkbox>
                                    <Checkbox value="Präsenz">Präsenz</Checkbox>
                                    <Checkbox value="Hybrid">Hybrid</Checkbox>
                                    <Checkbox value="Selbstorganisiert">Selbstorganisiert</Checkbox>
                                </Space>
                            </CheckboxGroupFormat>
                        <Divider/>
                        <p>Startdatum</p>
                            <DatePicker onChange={onChangeStartdatum} placeholder="Datum"/>
                        <Divider/>
                        <p>Kosten</p>
                            <CheckboxGroupKosten onChange={onChangeKosten}>
                                <Space direction="vertical">
                                    <Checkbox value="Kostenlos">Kostenlos</Checkbox>
                                    <Checkbox value="Kostenpflichtig">Kostenpflichtig</Checkbox>
                                </Space>
                            </CheckboxGroupKosten>
                        <Divider/>
                        <p>Sonstiges</p>
                    </Card>
                </div>
                <div style={{flex:"1", maxWidth:"1000px", marginRight:"1rem"}}>
                {
                    courseFeedbacks ?
                        courseFeedbacks.map((item: any) => <div key={item.course.id}><SearchComponent obj={item.course}
                                                                                                      feedbackrate={item.feedback}/>
                        </div>)
                        : <SearchComponent/>
                }
            </div>
            <div style={{flexBasis: "100%", display:"flex", justifyContent:"center", marginTop:"20px"}}>
                <Button type="primary" onClick={handlePagination}>Mehr anzeigen</Button>
            </div>
            </div>
        </div>

    );
}

export default Searching;