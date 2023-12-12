import {Button, Card, Checkbox, DatePicker, DatePickerProps, Divider, Form, Select, Slider, Space} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { SelectProps } from 'antd';
import { SliderMarks, SliderTooltipProps } from "antd/es/slider/index";
import { CourseFilterWsTo, Format, Skilllevel } from '../interfaces';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchWrapper } from '../api/helper';

interface SearchOptionsProps {
    
    onVariableChange: (variable: CourseFilterWsTo) => void;
  }

const SearchOptions: React.FC<SearchOptionsProps> = ({onVariableChange}) => {

    const loc = useLocation();

    const buildCourseFilterWsTo = () => {
        let courseFilter: CourseFilterWsTo = {
            tagIDs: loc.state?.tagIDs,
            Anbieter: Anbieter,
            Wissensbezug: Wissensbezug,
            Verwaltungsspezifisch: Verwaltungsspezifisch,
            Zertifikat: Zertifikat,
            Kompetenzstufe: Kompetenzstufen,
            Format: Formate,
            Startdatum: Startdatum,
            Dauer: Dauer,
            Kosten: Kosten,
            Sonstiges: []
        }
        onVariableChange(courseFilter);
    }

    const [Anbieter, setAnbieter] = useState<string[]>([]);
    const [Wissensbezug, setWissensbezug] = useState<string[]>();
    const [Verwaltungsspezifisch, setVerwaltungsspezifisch] = useState<boolean>();
    const [Zertifikat, setZertifikat] = useState<boolean>();
    const [Kompetenzstufen, setKompetenzstufen] = useState<Skilllevel[]>([Skilllevel.Anfaenger, Skilllevel.Fortgeschritten, Skilllevel.Experte]);
    const [Formate, setFormat] = useState<Format[]>([Format.OnlineLive, Format.Praesenz, Format.Hybrid, Format.OnlineSelbstorganisiert]);
    const [Startdatum, setStartdatum] = useState<Date>();
    const [Dauer, setDauer] = useState<string[]>();
    const [Kosten, setKosten] = useState<boolean>(false);
    const [Sonstiges, setSonstiges] = useState<string[]>();
    // Options

    const [options, setOptions] = useState<SelectProps['options']>([]);

    // for (let i = 0; i < 100000; i++) {
    //     const value = `${i.toString(36)}${i}`;
    //     options.push({
    //         label: value,
    //         value,
    //         disabled: i === 10,
    //     });
    // }

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
        setAnbieter(value);
    };

    const CheckboxGroupWissensbezug = Checkbox.Group;

    const onChangeWissensbezug = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        let array:string[]=[]
        for (let index = 0; index < checkedValues.length; index++) {
            array[index]=String(checkedValues[index]);
        }
        setWissensbezug(array);
      };

    const CheckboxGroupVerwaltungsspezifisch = Checkbox.Group;

    const onChangeVerwaltungsspezifisch = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        let value = false
        if (String(checkedValues[0]) == "Einsteiger"){
            value = true
        }
        setVerwaltungsspezifisch(value);
    };

    const CheckboxGroupZertifikat = Checkbox.Group;

    const onChangeZertifikat = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        let value = false
        if (String(checkedValues[0]) == "Zertifikat"){
            value = true
        }
        setZertifikat(value);
    };

    const CheckboxGroupKompetenzstufe = Checkbox.Group;

    const onChangeKompetenzstufe = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        let array:Skilllevel[]=[]
        for (let index = 0; index < checkedValues.length; index++) {
            let value = String(checkedValues[index]);
            if (value == "Einsteiger"){
                array[index]=0
            }
            else if (value == "Fortgeschritten"){
                array[index]=1
            }
            else if (value == "Experte"){
                array[index]=2
            }
        }
        setKompetenzstufen(array);
    };

    const dauer: SliderMarks = {
        0: '<10 Min.',
        50: '1 Std.',
        100: '8+Std.'
      };

    const tooltip: SliderTooltipProps = {
        open: false
        // Vielleicht formatter benutzen?
      };

    const onChangeDauer = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        let array:string[]=[]
        for (let index = 0; index < checkedValues.length; index++) {
            let value = Number(checkedValues[index]);
            if (value == 0){
                array[index]="<10 Min."
            }
            else if (value == 50){
                array[index]="1 Std."
            }
            else if (value == 100){
                array[index]="8+Std."
            }
        }
        setDauer(array);
    };


    const CheckboxGroupFormat = Checkbox.Group;

    const onChangeFormat = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        let array:Format[]=[]
        for (let index = 0; index < checkedValues.length; index++) {
            let value = String(checkedValues[index]);
            if (value == "Live-Online"){
                array[index]=0
            }
            else if (value == "Präsenz"){
                array[index]=1
            }
            else if (value == "Hybrid"){
                array[index]=2
            }
            else if (value == "Selbstorganisiert"){
                array[index]=3
            }
        }
        setFormat(array);
    };

    const onChangeStartdatum: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setStartdatum(date?.toDate)
      };

    const CheckboxGroupKosten = Checkbox.Group;

    const onChangeKosten = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        let value = false
        if (String(checkedValues[0]) == "Kostenlos"){
            value = true
        }
        setKosten(value);
    };

    useEffect(() => {
        buildCourseFilterWsTo();
    }, [Anbieter, Wissensbezug, Verwaltungsspezifisch, Zertifikat, Kompetenzstufen, Formate, Startdatum, Dauer, Kosten, Sonstiges])

    useEffect(() => {
        fetchWrapper.get('api/v1/courses/providers').then(res => {
            let options:SelectProps['options']=[]
            for (let i = 0; i < res.payload.length; i++) {
                let value = String(res.payload[i]);
                options.push({
                    label: value,
                    value,
                    disabled: false,
                });
            }
            setOptions(options)
        });
    }, options);

    return (
        <Card title="Optionen" size="small" style={{minWidth:"250px", borderRadius:"20px", position:"sticky", top:"-500px"}}>
            <p>Anbieter</p>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Anbieter auswählen..."
                defaultValue={[]}
                onChange={handleChange}
                options={options}
                maxTagCount={'responsive'}
            />
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
            <Slider range marks={dauer} onChange={onChangeDauer} tooltip={tooltip} step={null} defaultValue={[0,100]} style={{marginLeft:"20px", marginRight:"20px"}}/>
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
                    </Space>
                </CheckboxGroupKosten>
            <Divider/>
            <p>Sonstiges</p>
            </Card>
    );
}

export default SearchOptions;