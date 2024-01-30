import {Button, Modal} from "antd";
import "./GroupmemberCourses.css"
import {Group} from "../../../constants/interfaces.ts";
import {forwardRef, useImperativeHandle, useState} from "react";

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