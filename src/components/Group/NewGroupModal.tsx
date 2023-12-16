import { Button, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

function NewGroupModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    return (
        <Modal title="Gruppe erstellen" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h3>Gruppenname</h3>
            <Input placeholder="Basic usage" />
            <h3>Gruppenbeschreibung</h3>
            <TextArea rows={4} />
        </Modal>
    )
}

export default NewGroupModal;