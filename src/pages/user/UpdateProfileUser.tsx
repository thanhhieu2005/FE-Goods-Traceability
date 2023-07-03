import UserServices from "@/api/user_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { contentLayout, tailContentLayout } from "@/styles/content_layout";
import { UserDetailModel } from "@/types/user";
import { Button, Col, Form, Input, Modal } from "antd";
import React from "react";

const UpdateProfileUser = ({ myProps: props }: any) => {
  const [form] = Form.useForm();

  const currentUserInfo: UserDetailModel = props.currentUserInfo;

  const onCancel = () => {
    Modal.confirm({
      title: "Warning",
      content: "Do you want to close update profile form?",
      onOk: () => props.onClose(false),
    });
  };

  const updateProfileUser = async (value: any) => {
    const res: any = await UserServices.updateProfile(
      currentUserInfo.userId,
      value
    );

    if (res.status === 200) {
      successMessage("Update success!");
      props.updateSucces(res.data);
      props.onClose(false);
    } else {
      errorMessage("Update Failed!");
    }
  };

  return (
    <>
      <div className="content-page">
        <Col>
          <p className="text-main-label">Update Profile</p>
          <div style={{ padding: "12px" }} />
          <Form
            {...contentLayout}
            form={form}
            onFinish={(value) => {
              updateProfileUser(value);
            }}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              initialValue={currentUserInfo.firstName ?? ""}
              required
              rules={[
                {
                  required: true,
                  message: "First Name can not be blank",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              initialValue={currentUserInfo.lastName ?? ""}
              required
              rules={[
                {
                  required: true,
                  message: "Last Name can not be blank",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              initialValue={currentUserInfo.phoneNumber ?? ""}
              rules={[
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        if(!value || getFieldValue('phoneNumber').length == 10) {
                            return Promise.resolve();
                        }
                        return Promise.reject("Invalid phone number");
                    }
                })
              ]}
            >
              <Input type="phone"/>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              initialValue={currentUserInfo.address ?? ""}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={tailContentLayout}
              style={{ marginTop: "16px" }}
            >
              <Button
                type="primary"
                size="middle"
                htmlType="submit"
                style={{ marginRight: "12px" }}
              >
                Update
              </Button>
              <Button
                type="default"
                size="middle"
                htmlType="button"
                onClick={onCancel}
                style={{ borderRadius: "4px" }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </div>
    </>
  );
};

export default UpdateProfileUser;
