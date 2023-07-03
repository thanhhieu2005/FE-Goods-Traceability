import { contentLayout, tailContentLayout } from "@/styles/content_layout";
import { Button, Col, Form, Input } from "antd";
import React from "react";

const UpdatePassword = ({myProps: props}: any) => {
  const [form] = Form.useForm();

  const onCancel = () => {
    props.onClose(false);
  };

  return (
    <>
      <div className="content-page">
        <Col>
          <p className="text-main-label">Change Your Password</p>
          <div style={{ padding: "12px" }} />
          <Form {...contentLayout} form={form}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              required
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              required
              rules={[
                {
                  required: true,
                  message: "Please enter your new password",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              required
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        if(!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The confirm password does not match')
                    }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={tailContentLayout}
                style={{ marginTop: '16px' }}
            >
                <Button
                    type="primary"
                    size="middle"
                    htmlType="submit"
                    style={{ marginRight: '12px' }}
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

export default UpdatePassword;
