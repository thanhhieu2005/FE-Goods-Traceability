import { contentLayout, tailContentLayout } from "@/styles/content_layout";
import { StaffDepartment } from "@/types/user";
import { parseToStringDepartment } from "@/utils/format_state";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Form, Input, Modal, Select, message } from "antd";
import React from "react";

const CreateStaffForm = () => {
  const [form] = Form.useForm();

  const listDepartments = [
    StaffDepartment.Empty,
    StaffDepartment.HarvestInspection,
    StaffDepartment.TransportSupervision,
    StaffDepartment.WarehouseSupervision,
    StaffDepartment.SupervisingProducer,
  ]

  const onReset = () => {
    form.resetFields();
  };

  const cancelButtonResetForm = () => {
    console.log("Close cofirm dialog");
  };

  const showResetConfirmDialog = () => {
    Modal.confirm({
      title: "Do you want to RESET?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onReset();
      },
      onCancel() {
        cancelButtonResetForm();
      },
    });
  };

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-sytle">
              <Breadcrumb.Item>Staff Management</Breadcrumb.Item>
              <Breadcrumb.Item>Create New Staff</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Create new Staff</div>
            <div className="sub-title-header">
              Enter info form to create new staff
            </div>
          </Col>
        </div>
        <div className="content-page">
          <Col style={{ paddingTop: "64px" }}>
            <Form {...contentLayout} form={form}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid Email",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item> 
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your first name"
                    }
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your last name"
                    }
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
              >
                <Input/>
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Department"
                name="department"
              >
                <Select
                    placeholder="Select department"                
                >
                    {listDepartments.map((department)=> (
                        <Select.Option value={department} key={department}>
                            <span>
                                {parseToStringDepartment(department)}
                            </span>
                        </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={tailContentLayout}
                style={{ marginTop: "16px" }}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ marginRight: "12px" }}
                //   loading={loadingButton}
                >
                  Create
                </Button>
                <Button
                  type="default"
                  size="large"
                  htmlType="button"
                  onClick={showResetConfirmDialog}
                >
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </div>
      </Col>
    </div>
  );
};

export default CreateStaffForm;
