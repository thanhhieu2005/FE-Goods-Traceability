import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="authen-page">
      <Row>
        <Col span={14}></Col>
        <Col span={10}>
          <div className="layout-authen">
            <Col className="content-form">  
              <div>
                <Link to="/login" className="text-grey" >Back to Login</Link>
              </div>
              <div className="text-title" style={{marginTop: "56px"}}>Reset Your Password</div>
              <div className="text-grey">The verification email will be sent to the mail-box.</div>
              <div className="text-grey">Please check it.</div>
              <div className="form-authen">
                <Form layout="vertical">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      className="myInput custom"
                      placeholder="Enter your email"
                      size="large"
                      name="email"
                    />
                  </Form.Item>
                </Form>
                <Button
                  style={{
                    marginTop: "16px",
                    width: "80px",
                    borderRadius: "8px",
                  }}
                  type="primary"
                  size="large"
                >
                  Send
                </Button>
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
