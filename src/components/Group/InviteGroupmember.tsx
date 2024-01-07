import {Button, Form, FormProps, Modal, Select, SelectProps } from "antd";
import "./GroupmemberCourses.css"
import {SendInvitationWsTo, User } from "../../interfaces";
import {forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { fetchWrapper } from "../../api/helper";

interface InviteGroupProps {
    groupId: number | undefined;
    fetchGroupmembers: () => void | undefined;
}

const InviteGroupmember = forwardRef((props: InviteGroupProps, ref) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [options, setOptions] = useState<SelectProps['options']>([]);
    const [invitations, setInvitations] = useState<String[]>([]);

    const [users, setUsers] = useState<User[]>([]);


    const handleChange = (value: string[]) => {
        setInvitations(value);
        console.log(`selected ${value}`);
    };

    const showModal = () => {
        setOpen(true);
    };

    
    const [form] = Form.useForm();

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            let invitationWsTos: SendInvitationWsTo[] = [];
            console.log(invitations);
            invitations.forEach(element => {
                invitationWsTos.push({ userEmail: element.toString(), groupId: props.groupId })
            });
            const sendInvitations = fetchWrapper.post(`api/v1/groups/invitations`, invitationWsTos).then(res => {
                console.log(res.messages[0].message);
                if(res.messages[0].message == "success"){
                    Modal.success({
                        centered: true,
                        title: "Einladungen verschickt!",
                        content: 'Alle Gruppeneinladungen wurden erfolgreich verschickt!',
                    })
                }
            });
            Promise.all([sendInvitations]).then(() => {
                props.fetchGroupmembers();
                form.resetFields();
                fetchWrapper.get(`api/v1/users/all?groupID=${props.groupId}`).then(res => {
                    setUsers(res.payload);
                });
            })
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
        const fetchedUsers = fetchWrapper.get(`api/v1/users/all?groupID=${props.groupId}`).then(res => {
            setUsers(res.payload);
        });
        const options: SelectProps['options'] = []
        Promise.all([fetchedUsers]).then(() => {
            users.forEach(user => {
                options.push({
                    label: user.name,
                    value: user.email,
                    disabled: false,
                })
            });
            setOptions(options);
        });
    }, [open]);

    return (
        <div>
            <Form form={form}>
                <Modal
                    open={open}
                    title="Gruppenmitglieder hinzufügen"
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
                            Mitglieder einladen
                        </Button>,
                    ]}
                >
                    <Form.Item name="Nutzersuche">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Nutzer suchen"
                            defaultValue={[]}
                            onChange={handleChange}
                            options={options}
                        />
                    </Form.Item>
                </Modal>
            </Form>
        </div>
    )
});

export default InviteGroupmember;