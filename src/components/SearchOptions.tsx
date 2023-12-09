import {Card, Checkbox, DatePicker, DatePickerProps, Divider, Select, Slider, Space} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { SelectProps } from 'antd';
import { SliderMarks, SliderTooltipProps } from "antd/es/slider/index";

function SearchOptions() {
    // Options
    const options: SelectProps['options'] = [];

    for (let i = 0; i < 100000; i++) {
        const value = `${i.toString(36)}${i}`;
        options.push({
            label: value,
            value,
            disabled: i === 10,
        });
    }

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

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

    const dauer: SliderMarks = {
        0: '<10 Min.',
        50: '1 Std.',
        100: '8+Std.'
      };

    const tooltip: SliderTooltipProps = {
        open: false
        // Vielleicht formatter benutzen?
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
            <Slider range marks={dauer} tooltip={tooltip} step={null} defaultValue={[0,100]} style={{marginLeft:"20px", marginRight:"20px"}}/>
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
    );
}

export default SearchOptions;