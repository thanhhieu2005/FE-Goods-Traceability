import ApiCommonService from "@/api/api_common/api_common";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [email, setEmail] = useState<string>();

  const [otpCode, setOtpCode] = useState<string>();

  const onSendEmail =  async(value: any) => {
    setEmail(value.email);
    setOpenOTP(true);

    const result : any = await ApiCommonService.resetPassword(value);

    if(result.otpCode !== null || result.otpCode !== undefined) {
      setOtpCode(result.otpCode);
    }
    console.log(result.otpCode);
  };

  const [openOTP, setOpenOTP] = useState(false);

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
                {openOTP ? "Enter OTP Code" : "Reset Your Password"}
              </div>
              <div className="text-grey">
                {openOTP ? `OTP code will be sent to ${email}` : 'The verification email will be sent to the mail-box.'}
              </div>
              <div className="text-grey">Please check it.</div>
              {openOTP ? (
                <div>
                  <Col>
                    <div className="form-authen">
                    <Form
                    layout="vertical"
                    // onFinish={(value) => {
                    //   onSendEmail(value);
                    // }}
                    form={form}
                  >
                    <Form.Item
                      label="OTP Code"
                      name="otp"
                      rules={[
                        {
                          message: "Please input your otp!",
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Input your otp" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        style={{
                          marginTop: "16px",
                          width: "80px",
                          borderRadius: "4px",
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
              ) : (
                <div className="form-authen">
                  <Form
                    layout="vertical"
                    onFinish={(value) => {
                      onSendEmail(value);
                    }}
                    form={form}
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
