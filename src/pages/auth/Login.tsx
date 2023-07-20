import React, { useEffect } from "react";
import "./Login.scss";
import { Col, Row, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserInfo } from "../../redux/authenSlice";
import { axiosClient } from "../../services/axios";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import {
  icLogo,
  logoBlockchain,
  logoFull,
  thumpLogin1,
  thumpLogin2,
} from "@/assets";
import { mainColor, whiteColor } from "@/utils/app_color";
import { ButtonStyle } from "@/utils/style_common";
import { AxiosError } from "axios";
import { onMessageListener } from "@/services/firebase";
import { getMessaging, onMessage } from "firebase/messaging";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state: any) => state.authen.isLogin);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (login || currentToken) {
      navigate("/", { replace: true });
    }
  }, [login, navigate]);

  useEffect(() => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  })

  const handleSubmit = async (value: any) => {
    try {
      const res = await axiosClient.post("/users/login", value);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);

        dispatch(setCurrentUserInfo(res.data));

        navigate("/", { replace: true });
        // console.log({ data: res.data });
        successMessage("Login Successfully", 2);
      }
    } catch (err: any) {
      console.log(err);
      if (err.code === AxiosError.ERR_NETWORK) {
        errorMessage("Server has Error, please try later!");
      } else {
        errorMessage(err.response.data.message, 3);
      }

    }
  };

  return (
    <div className="authen-page">
      <Row>
        <Col
          span={14}
          className="background"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* <img src={logoFull} width="50%" height="70%" style={{ display: 'flex' }} /> */}
          <img src={logoBlockchain} width="25%" height="35%" />
          <p
            style={{
              color: mainColor,
              fontSize: "32px",
              fontWeight: "600",
              padding: "0px",
              margin: "0px",
            }}
          >
            Unlocking Transparency - Building Trust
          </p>
          <p style={{ color: whiteColor, fontSize: "32px", fontWeight: "600" }}>
            Ethereum-Powered Traceability
          </p>
          <div style={{ padding: "24px" }} />
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <img src={thumpLogin1} width="30%" />
            <img src={thumpLogin2} width="30%" />
          </Row>
        </Col>
        <Col span={10}>
          <div className="layout-authen">
            <Col className="content-form">
              <div className="center-content">
                <img src={icLogo} height="144px" width="144px" />
              </div>
              <div
                className="text-title center-content"
                style={{ color: mainColor }}
              >
                HK Solution
              </div>
              <div className="form-authen">
                <Form
                  layout="vertical"
                  onFinish={(value) => handleSubmit(value)}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your email"
                      size="large"
                      name="email"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter your password"
                      size="large"
                      name="pwd"
                    />
                  </Form.Item>
                  <Link
                    to="/forgot-password"
                    className="forgot-password"
                    style={{
                      color: mainColor,
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "flex-end",
                      fontWeight: 500,
                    }}
                  >
                    Forgot Password?
                  </Link>
                  <div className="space-padding" />
                  <Button
                    block
                    // id="common-button"
                    style={ButtonStyle()}
                    type="primary"
                    size="large"
                    htmlType="submit"
                  // disabled = {email && password ? false : true}
                  >
                    LOGIN
                  </Button>
                </Form>
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
