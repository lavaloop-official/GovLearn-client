import { Badge, Button, Divider, Modal, Input, Select, SelectProps } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Group, Groupmember } from "../../interfaces";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Groupuser from "./Groupuser";
import { SearchProps } from "antd/es/input/Search";

interface AddCourseProps {
    name: string | undefined;
}

const AddCourse = forwardRef((props: AddCourseProps, ref) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

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

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
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
        //fetch all users and insert them into the search array
    })

    return (
        <div>
            <Modal
                open={open}
                title={"Kurs hinzufügen - " + props.name}
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