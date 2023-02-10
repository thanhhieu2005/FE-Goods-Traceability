import React, { useEffect } from "react";
import "./Login.scss";
import { Col, Row, Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserInfo } from "../../redux/authenSlice";
import { axiosClient } from "../../services/axios";
// import { addListener } from "process";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state: any) => state.authen.isLogin);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (login || currentToken) {
      navigate("/", { replace: true });
    }
  }, [navigate, login]);

  const handleSubmit = async (value: any) => {
    try {
      console.log(value);
      const res = await axiosClient.post("/users/login", value);

      localStorage.setItem("token", res.data.token);

      dispatch(setCurrentUserInfo(res.data));

      // console.log({ data: res.data });

      navigate("/", { replace: true });
    } catch (err: any) {
      console.log(err.response);
    }
  };

  return (
    <Row>
      <Col span={12} className="img"></Col>
      <Col span={12} className="content">
        <Col className="content-form">
          <h2 className="text-title">Sign In with HK Solution</h2>
          <Form layout="vertical" onFinish={(value) => handleSubmit(value)}>
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
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  message: "Please input your password!",
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
            <Button
              block
              id="common-button"
              size="large"
              htmlType="submit"
              // disabled = {email && password ? false : true}
            >
              LOGIN
            </Button>
          </Form>
          <Link
            to="/"
            className="forgot-password"
            style={{
              color: "#1C6758",
              fontSize: "12px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Forgot Password?
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

export default Login;
