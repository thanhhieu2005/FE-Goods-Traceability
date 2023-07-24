import { Button, Modal, Input, Form, Select } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import FarmManagementService from "@/api/admin_tech/farm_management_services";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";

const CreateFarmForm = ({myProps: props}: any) => {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCall: any = props.isCall;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const createNewFarm = async(value: any) => {
    console.log(value);

    setIsLoading(true);

    let finalValue = {};

    if(value.farmOwner !== null || value.farmOwner !== undefined) {
      finalValue = {
        ...value,
        statusFarm: 1,
      }
    } else {
      finalValue = value;
    }

    const res: any = await FarmManagementService.createNewFarm(finalValue);

    console.log(res);

    if(res.status === 200) {
      setIsLoading(false);

      props.setIsCall(!isCall);
      setIsModalOpen(false);

      successMessage("Create new Farm Successfully!");
    } else {
      setIsLoading(false);

      errorMessage("Create Failed!");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Create Farm
      </Button>
      <Modal
        title="Create new Farm"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText={"Create"}
        closable={false}
        width={640}
        maskClosable={false}
        destroyOnClose={true}
        confirmLoading={isLoading}
        bodyStyle={{
          fontWeight: "500",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={(value) => createNewFarm(value)}
        >
          <Form.Item
            label="Farm Code"
            name="farmCode"
            required
            rules={[{ required: true, message: "Please enter farm code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Farm Name"
            name="farmName"
            required
            rules={[{ required: true, message: "Please enter farm name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Farm Owner" name="farmOwner">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="farmPhoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="farmAddress">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateFarmForm;
