import {Card, Checkbox, DatePicker, DatePickerProps, Divider, Select, Slider} from 'antd';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import type {SelectProps} from 'antd';
import {SliderMarks, SliderTooltipProps} from "antd/es/slider/index";
import {CourseFilterWsTo} from '../interfaces';
import {useEffect, useState} from 'react';
import {fetchWrapper} from '../api/helper';
import './SearchOptions.css';

function SearchOptions({courseFilter, onFilterChange}: {
    courseFilter: CourseFilterWsTo,
    onFilterChange: (variable: object) => void
}) {

    const [options, setOptions] = useState<SelectProps['options']>([]);

    useEffect(() => {
        fetchWrapper.get('api/v1/courses/providers').then(res => {
            const options = []
            for (let i = 0; i < res.payload.length; i++) {
                const value = String(res.payload[i]);
                options.push({
                    label: value,
                    value,
                    disabled: false,
                });
            }
            setOptions(options)
        });
    }, []);

    const handleSelectChange = (value: string[]) => {
        console.log(`selected ${value}`);
        onFilterChange({anbieter: value});
    };

    const optionsWissensbezug = ["Theorie", "Praxis"];
    const onChangeWissensbezug = (checkedValues: CheckboxValueType[]) => {
        onFilterChange({wissensbezug: checkedValues});
    };

    const optionsVerwaltungsspezifisch = ['Verwaltungsspezifisch'];
    const onChangeVerwaltungsspezifisch = (checkedValues: CheckboxValueType[]) => {
        onFilterChange({verwaltungsspezifisch: checkedValues.includes("Verwaltungsspezifisch")});
    };

    const optionsZertifikat = ['Zertifikat'];
    const onChangeZertifikat = (checkedValues: CheckboxValueType[]) => {
        onFilterChange({zertifikat: checkedValues.includes("Zertifikat")});
    };

    const optionsKompetenzstufe = [{label: 'Einsteiger', value: '0'}, {
        label: 'Fortgeschritten',
        value: '1'
    }, {label: 'Experte', value: '2'}];
    const onChangeKompetenzstufe = (checkedValues: CheckboxValueType[]) => {
        onFilterChange({kompetenzstufe: checkedValues});
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
        const array: string[] = []
        for (let index = 0; index < checkedValues.length; index++) {
            const value = Number(checkedValues[index]);
            if (value == 0) {
                array[index] = "<10 Min."
            } else if (value == 50) {
                array[index] = "1 Std."
            } else if (value == 100) {
                array[index] = "8+Std."
            }
        }
        onFilterChange({dauer: array});
    };

    const optionsFormat = [
        {label: 'Live-Online', value: '0'},
        {label: 'Präsenz', value: '1'},
        {label: 'Hybrid', value: '2'},
        {label: 'Selbstorganisiert', value: '3'}
    ];
    const onChangeFormat = (checkedValues: CheckboxValueType[]) => {
        onFilterChange({format: checkedValues});
    };

    const onChangeStartdatum: DatePickerProps['onChange'] = (_date, dateString) => {
        onFilterChange({startdatum: dateString});
    };

    const optionsKosten = ['Kostenlos'];
    const onChangeKosten = (checkedValues: CheckboxValueType[]) => {
        onFilterChange({kosten: checkedValues.includes("Kostenlos")});
    };

    return (
        <Card className="searchfilter" title="Optionen" size="small"
              style={{minWidth: "250px", borderRadius: "20px", position: "sticky", top: "-500px"}}>

            <p>Anbieter</p>
            <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Anbieter auswählen..."
                defaultValue={[]}
                onChange={handleSelectChange}
                options={options}
                maxTagCount={'responsive'}
            />
            <Divider/>
            <p>Wissensbezug</p>
            <Checkbox.Group onChange={onChangeWissensbezug} options={optionsWissensbezug}/>
            <Divider/>
            <p>Verwaltungsspezifisch</p>
            <Checkbox.Group onChange={onChangeVerwaltungsspezifisch} options={optionsVerwaltungsspezifisch}/>
            <Divider/>
            <p>Zertifikat</p>
            <Checkbox.Group onChange={onChangeZertifikat} options={optionsZertifikat}/>
            <Divider/>
            <p>Kompetenzstufe</p>
            <Checkbox.Group onChange={onChangeKompetenzstufe} options={optionsKompetenzstufe}/>
            <Divider/>
            <p>Dauer</p>
            <Slider range marks={dauer} onChange={onChangeDauer} tooltip={tooltip} step={null} defaultValue={[0, 100]}
                    style={{marginLeft: "20px", marginRight: "20px"}}/>
            <Divider/>
            <p>Format</p>
            <Checkbox.Group onChange={onChangeFormat} options={optionsFormat}/>
            <Divider/>
            <p>Startdatum</p>
            <DatePicker onChange={onChangeStartdatum} placeholder="Datum"/>
            <Divider/>
            <p>Kosten</p>
            <Checkbox.Group onChange={onChangeKosten} options={optionsKosten}/>
            <Divider/>
            <p>Sonstiges</p>
        </Card>
    );
}

export default SearchOptions;