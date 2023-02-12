import { Button, Modal, Input, Form, Select } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const CreateAccountForm: React.FC = () => {
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

  const { Option } = Select;

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Create New
      </Button>
      <Modal
        title="Create new Account"
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
            label="First Name"
            name="firstName"
            required
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            required
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            required
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            required
            rules={[
              { required: true, message: "Please enter confirm password" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber">
            <Input maxLength={11} />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select gender!" }]}
            required
          >
            <Select placeholder="Select your role">
              <Option value="systemadmin">System Admin</Option>
              <Option value="farmer">Farmer</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAccountForm;
