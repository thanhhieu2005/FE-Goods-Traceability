import { FormOutlined } from "@ant-design/icons";
import { Badge, Button, Col, DatePicker, Form, Input, Row } from "antd";
import React, { useState } from "react";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  
  let disabled = true;

function ProduceDetail() {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);
    return (
        <Col>
          <div className="header-content">Transport Detail</div>
          <div className="content">
            <Col>
              <p className="title">Transport Information</p>
              <div className="btn-update">
                <Button
                  type="primary"
                  icon={<FormOutlined />}
                  onClick={() => {
                    disabled = false;
                    setComponentDisabled(disabled);
                  }}
                >
                  Update
                </Button>
              </div>
              <div className="main-content">
                <Form {...layout} disabled={true}>
                  <Form.Item label="Production ID" name="produceId">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Project ID" name="projectId">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Project Code" name="projectCode">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Inspector" name="inspector">
                    <Input />
                  </Form.Item>
                </Form>
                <Form {...layout} disabled={componentDisabled}>
                  <Form.Item label="Total Input" name="totalInput">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Factory Company" name="factory">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Product Name" name="productName">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Total Product" name="totalProduct">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Humidity" name="humidity">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Drying Temperature" name="dryingTeperature">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Expired Date" name="expiredDate">
                    <DatePicker style={{ width: "70%" }} />
                  </Form.Item>
                </Form>
                <Form {...layout} disabled={true}>
                  <Form.Item label="dateCompleted" name="dateCompleted">
                    <Input />
                  </Form.Item>
                </Form>
                <Form {...layout}>
                  <Form.Item label="Project Status" name="status">
                    <Badge status="success" style={{ paddingRight: "4px" }} />
                    Completed
                  </Form.Item>
                </Form>
              </div>
              <div className="layout-btn-save">
                <Row>
                  <Button
                    className="btn-cancel"
                    type="primary"
                    // icon={<FormOutlined />}
                    onClick={() => {
                      disabled = true;
                      setComponentDisabled(disabled);
                    }}
                    hidden={disabled}
                    size={"large"}
                    style={{marginRight: "12px"}}
                    danger
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn-save"
                    type="primary"
                    // icon={<FormOutlined />}
                    onClick={() => {
                      disabled = true;
                      setComponentDisabled(disabled);
                    }}
                    hidden={disabled}
                    size={"large"}
                  >
                    Save
                  </Button>
                </Row>
              </div>
            </Col>
          </div>
        </Col>
      );
}

export default ProduceDetail