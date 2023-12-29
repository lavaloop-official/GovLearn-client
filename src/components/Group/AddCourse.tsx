import { Badge, Button, Divider, Modal, Input, Select, SelectProps } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Course, Group, Groupmember } from "../../interfaces";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Groupuser from "./Groupuser";
import { SearchProps } from "antd/es/input/Search";
import { fetchWrapper } from "../../api/helper";

interface AddCourseProps {
    groupmember: Groupmember | undefined;
    addCourseToGroupmember(courseId: number[]): void;
}

const AddCourse = forwardRef((props: AddCourseProps, ref) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [options, setOptions] = useState<SelectProps['options']>([]);
    let courseIDs:number[] = [];

    const handleChange = (value: string[]) => {
        courseIDs = value.map(element => {
            return Number(element);
        });
        console.log(`selected ${value}`);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            props.addCourseToGroupmember(courseIDs);
            setLoading(false);
            setOpen(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        openDialog() {
            showModal();
        }
    }));

    useEffect(() => {
        const options: SelectProps['options'] = []
        const fetchedCourses = fetchWrapper.get(`api/v1/courses`).then(res => {
            let fetchedCourses:Course[] = res.payload;
            fetchedCourses.forEach(course => {
                options.push({
                    label: course.name,
                    value: course.id,
                    disabled: false,
                });
            });
        });
        Promise.all([fetchedCourses]).then(()=> setOptions(options));
    }, [open]);

    return (
        <div>
            <Modal
                open={open}
                title={"Kurs hinzufügen - " + props.groupmember?.name}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" loading={loading} onClick={handleCancel}>
                        Abbrechen
                    </Button>,
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Kurse hinzufügen
                    </Button>,
                ]}
            >
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Kurse suchen"
                    defaultValue={[]}
                    onChange={handleChange}
                    options={options}
                />
            </Modal>
        </div>
    )
});

export default AddCourse;