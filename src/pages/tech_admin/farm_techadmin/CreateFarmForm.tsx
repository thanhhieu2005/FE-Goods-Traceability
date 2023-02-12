import { Button, Modal, Input, Form, Select } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const CreateFarmForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Create Farm
      </Button>
      <Modal
        title="Create new Farm"
        open={isModalOpen}
        onOk={handleCreate}
        onCancel={handleCancel}
        okText={"Create"}
        closable={false}
        width={640}
        maskClosable={false}
        destroyOnClose = {true}
        bodyStyle={{
          fontWeight: "500",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Farm Code" name="farmCode" required
            rules={[{ required: true, message: "Please enter farm code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Farm Name" name="farmName" required
            rules={[{ required: true, message: "Please enter farm name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Farm Owner" name="farmOwner">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateFarmForm;
