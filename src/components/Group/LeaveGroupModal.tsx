import { Badge, Button, Divider, Modal, Input, Select, SelectProps } from "antd";
import GroupmemberCourses from "./GroupmemberCourses";
import "./GroupmemberCourses.css"
import { Course, Group, Groupmember } from "../../interfaces";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Groupuser from "./Groupuser";
import { SearchProps } from "antd/es/input/Search";
import { fetchWrapper } from "../../api/helper";

interface LeaveGroupModalProps {
    currentgroup: Group | undefined;
    leaveGroup(groupId: number): void;
}

const LeaveGroupModal = forwardRef((props: LeaveGroupModalProps, ref) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            props.leaveGroup(props!.currentgroup!.groupId!);
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

    return (
        <div>
            <Modal
                open={open}
                title={"Gruppe verlassen - " + props.currentgroup?.groupName}
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
                        Gruppe verlassen
                    </Button>,
                ]}
            >
            </Modal>
        </div>
    )
});

export default LeaveGroupModal;