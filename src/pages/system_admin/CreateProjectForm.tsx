import { Button, Modal, Input, Form, Select } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const CreateProjectForm = () => {
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
        Create new Project
      </Button>
      <Modal
        title="Create new Project"
        open={isModalOpen}
        onOk={handleCreate}
        onCancel={handleCancel}
        okText={"Create"}
        closable={false}
        width={640}
        maskClosable={false}
        destroyOnClose={true}
        bodyStyle={{
          fontWeight: "500",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="Project Code"
            name="projectCode"
            required
            rules={[{ required: true, message: "Please enter Project code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Name"
            name="projectName"
            required
            rules={[{ required: true, message: "Please enter Project name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProjectForm;
