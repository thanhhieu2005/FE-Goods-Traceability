import { Badge, Tag } from "antd";
import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const StateTag = ({ myProp: state }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "64px",
        paddingBottom: "24px",
      }}
    >
      {state === 2 ? (
        <Tag
          style={{
            fontWeight: "bold",
          }}
          icon={<CheckCircleOutlined />}
          color="#87d068"
        >
          This Project has been Completed
        </Tag>
      ) : (
        <Tag
          style={{
            fontWeight: "bold",
          }}
          icon={<CloseCircleOutlined />}
          color="#f50"
        >
          This Project has been Canceled
        </Tag>
      )}
    </div>
  );
};

export const StateTagStep = ({ myProp: state }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "64px",
        paddingBottom: "24px",
      }}
    >
      {state === 2 ? (
        <Tag
          style={{
            fontWeight: "bold",
          }}
          icon={<CheckCircleOutlined />}
          color="#87d068"
        >
          This Step has been Completed
        </Tag>
      ) : (
        <Tag
          style={{
            fontWeight: "bold",
          }}
          icon={<CloseCircleOutlined />}
          color="#f50"
        >
          This Step has been Canceled
        </Tag>
      )}
    </div>
  );
};

export const BadgeByState = (value: number) => {
  switch (value) {
    case 1:
      return (
        <span>
          <Badge status="processing" style={{ paddingRight: "4px" }} />
          Processing
        </span>
      );
    case 2:
      return (
        <span>
          <Badge status="success" style={{ paddingRight: "4px" }} />
          Completed
        </span>
      );
    case 3:
      return (
        <span>
          <Badge status="error" style={{ paddingRight: "4px" }} />
          Canceled
        </span>
      );
    default:
      return (
        <span>
          <Badge status="error" color="yellow" style={{ paddingRight: "4px" }} />
          Pending
        </span>
      );
  }
};

export const TagRoleUser = (value: number) => {
  switch(value) {
    case 1:
      return(
        <div>
          <Tag color="volcano">
            Technical Admin
          </Tag>
        </div>
      );
    case 2:
      return (
        <div>
          <Tag color="blue">
            System Admin
          </Tag>
        </div>
      );
    case 3:
      return (
        <div>
          <Tag color="green">
            Farmer
          </Tag>
        </div>
      );
    case 4:
      return (
        <div>
          <Tag color="gold">
            Staff
          </Tag>
        </div>
      );
    default:
      return (
        <div>
          <Tag color="default">
            Unknow
          </Tag>
        </div>
      );
  }
};
