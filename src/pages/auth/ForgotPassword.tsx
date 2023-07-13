import ApiCommonService from "@/api/api_common/api_common";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { mainColor } from "@/utils/app_color";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formEmail] = Form.useForm();

  const [formOTP] = Form.useForm();

  const [formNewPassword] = Form.useForm();

  const [email, setEmail] = useState<string>("");

  const [otpCodeId, setOtpCodeId] = useState<string>("");

  const onSendEmail = async (value: any) => {
    const result: any = await ApiCommonService.resetPassword(value.email);

    console.log(result);

    if (result.data.otpCode !== null || result.data.otpCode !== undefined) {
      setEmail(value.email);
      setStepOTP(1);
      setOtpCodeId(result.data._id);
    } else if (result.response.data.code === 404) {
      errorMessage(result.response.data.message, 5);
    } else {
      errorMessage("Have problem try again!");
    }
  };

  const [stepOTP, setStepOTP] = useState(0);

  const onVerifyCode = async (value: any) => {
    const res: any = await ApiCommonService.confirmOTP(
      otpCodeId ?? "",
      value.otpCode
    );

    console.log(otpCodeId);
    console.log(value.otpCode);

    if (res.status === 200) {
      //
      setStepOTP(2);
    } else if (res.response.data.code === 404) {
      errorMessage(res.response.data.message);
    } else {
      errorMessage("Have problem try again!");
    }
  };

  const updateNewPassword = async (value: any) => {
    const res: any = await ApiCommonService.updateNewPassword(
      email,
      value.newPassword
    );

    if (res.status === 200) {
      navigate("/login");
      successMessage("Update Successfully!");
    } else {
      errorMessage("Update new Password Failed!");
    }
  };

  return (
    <div className="authen-page">
      <Row>
        <Col span={14}></Col>
        <Col span={10}>
          <div className="layout-authen">
            <Col className="content-form">
              <div>
                <Link to="/login" className="text-grey">
                  Back to Login
                </Link>
              </div>
              <div className="text-title" style={{ marginTop: "56px" }}>
                {stepOTP ? "Enter OTP Code" : "Reset Your Password"}
              </div>
              <div className="text-grey">
                {stepOTP
                  ? `OTP code will be sent to ${email}`
                  : "The verification email will be sent to the mail-box."}
              </div>
              <div className="text-grey">Please check it.</div>
              {stepOTP === 1 ? (
                <div>
                  <Col>
                    <div className="form-authen">
                      <Form
                        layout="vertical"
                        onFinish={(value) => {
                          onVerifyCode(value);
                        }}
                        form={formOTP}
                      >
                        <Form.Item
                          label="OTP Code"
                          name="otpCode"
                          required
                          rules={[
                            {
                              message: "Please input your otp!",
                              required: true,
                            },
                          ]}
                        >
                          <Input.Password placeholder="Input your otp" />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            style={{
                              marginTop: "16px",
                              width: "80px",
                              borderRadius: "4px",
                              backgroundColor: mainColor,
                              borderColor: mainColor,
                            }}
                            type="primary"
                            size="large"
                            htmlType="submit"
                          >
                            Send
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </Col>
                </div>
              ) : stepOTP === 2 ? (
                <>
                  <div className="form-authen">
                    <Form
                      layout="vertical"
                      form={formNewPassword}
                      onFinish={(value) => {
                        updateNewPassword(value);
                      }}
                    >
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
                              if (
                                !value ||
                                getFieldValue("newPassword") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                "The confirm password does not match"
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{
                            marginTop: "16px",
                            width: "80px",
                            borderRadius: "4px",
                            backgroundColor: mainColor,
                            borderColor: mainColor,
                          }}
                          type="primary"
                          size="large"
                          htmlType="submit"
                        >
                          Update
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </>
              ) : (
                <div className="form-authen">
                  <Form
                    layout="vertical"
                    onFinish={(value) => {
                      onSendEmail(value);
                    }}
                    form={formEmail}
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "Please input your email!",
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Input your email" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        style={{
                          marginTop: "16px",
                          width: "80px",
                          borderRadius: "4px",
                          backgroundColor: mainColor,
                          borderColor: mainColor,
                        }}
                        type="primary"
                        size="large"
                        htmlType="submit"
                      >
                        Send
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
