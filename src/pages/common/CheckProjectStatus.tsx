import {
    SyncOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
  } from "@ant-design/icons";
import {  Tag } from "antd";
import React from "react";

const CheckProjectStatus = (status: number) => {
    if (status === 1) {
      return (
        <Tag icon={<SyncOutlined spin />} color="yellow">
          Pending
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

  export default CheckProjectStatus;