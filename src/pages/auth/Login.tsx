import React, { useEffect } from "react";
import "./Login.scss";
import { Col, Row, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserInfo } from "../../redux/authenSlice";
import { axiosClient } from "../../services/axios";
// import { addListener } from "process";
import logo from "../../assets/images/img-logo.png";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";

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

  const handleSubmit = async (value: any) => {
    try {
      const res = await axiosClient.post("/users/login", value);

      console.log("Res", res);

      localStorage.setItem("token", res.data.token);

      dispatch(setCurrentUserInfo(res.data));
      
      navigate("/", { replace: true });
      // console.log({ data: res.data });
      successMessage("Login Successfully", 2);

      
    } catch (err: any) {
      console.log(err);
      errorMessage(err.response.data.message, 3);
    }
  };

  return (
    <div className="authen-page">
      <Row>
        <Col span={14} className="background"></Col>
        <Col span={10}>
          <div className="layout-authen">
            <Col className="content-form">
              <div className="center-content"><img src={logo} /></div>
              <div className="text-title center-content">Welcome Back</div>
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
                        required: true, message: "Please input your email!",
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
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true, message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="myInput custom"
                      placeholder="Enter your password"
                      size="large"
                      name="pwd"
                    />
                  </Form.Item>
                  <Link
                    to="/forgot-password"
                    className="forgot-password"
                    style={{
                      color: "#1990ff",
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "flex-end",
                      fontWeight: 500,
                    }}
                  >
                    Forgot Password?
                  </Link>
                  <Button
                    block
                    // id="common-button"
                    style={{ marginTop: "16px" }}
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
