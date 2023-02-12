import {
  SyncOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Badge, Form, Row, Tag } from "antd";
import React from "react";

export const CheckProjectStatus = (status: number) => {
  if (status === 1) {
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        Processing
      </Tag>
    );
  } else if (status === 2) {
    return (
      <Tag icon={<CheckCircleOutlined spin />} color="success">
        Completed
      </Tag>
    );
  } else if (status === 3) {
    return (
      <Tag icon={<CloseCircleOutlined spin />} color="error">
        Cancel
      </Tag>
    );
  }
  return (
    <Tag icon={<ClockCircleOutlined spin />} color="default">
      Waiting
    </Tag>
  );
};

export const StateComponent = (state: number) => {
  switch (state) {
    case 1:
      return (
        <Form.Item label="State" name="state">
          <Row>
            <Badge
              status="processing"
              style={{ paddingRight: "4px" }}
              // color="yellow"
            />
            <div>Processing</div>
          </Row>
        </Form.Item>
      );
    case 2:
      return (
        <Form.Item label="State" name="state">
          <Row style={{ justifyItems: "center" }}>
            <Badge status="success" style={{ paddingRight: "4px" }} />
            <div>Completed</div>
          </Row>
        </Form.Item>
      );
    case 3:
      return (
        <Form.Item label="State" name="state">
          <Row>
            <Badge status="error" style={{ paddingRight: "4px" }} />
            Cancel
          </Row>
        </Form.Item>
      );
    default:
      return (
        <Form.Item label="State" name="state">
          <Row>
            <Badge style={{ paddingRight: "4px" }} color="default" />
            Waiting
          </Row>
        </Form.Item>
      );
  }
};
