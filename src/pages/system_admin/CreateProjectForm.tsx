import { Button, Modal, Input, Form, Select, Row } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { CreateNewProjectService } from "@/api/system_admin/project_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";

const CreateProjectForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentManagerInfo = useSelector(
    (state: any) => state.authen.currentUserInfo
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = async () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = async (value: any) => {
    const manager = currentManagerInfo._id;

    const finalValue = { ...value, manager: manager };
    console.log(finalValue);

    const result : any = await CreateNewProjectService(finalValue);

    if(result?.status === 200) {
      console.log("Tạo mới thành công")

      successMessage("Create new project successfully!")

      handleCreate();
    } else {
      console.log("Tạo mới thất bại");
      errorMessage("Create new project failed!")
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Create new Project
      </Button>
      <Modal
        title="Create new Project"
        open={isModalOpen}
        // onOk={handleSubmitForm}
        // onCancel={handleCancel}
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
        footer={null}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={(value) => handleSubmitForm(value)}
        >
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Row>
              <Button
                type="primary"
                danger
                style={{
                  marginRight: "8px"
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                // disabled = {email && password ? false : true}
              >
                Create
              </Button>
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProjectForm;
