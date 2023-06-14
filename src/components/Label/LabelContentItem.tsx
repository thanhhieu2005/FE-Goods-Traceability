import { Row } from "antd";
import React from "react";

const LabelContentItem = ({ myProps: props }: any) => {
  return (
    <>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4px",
          width: props.width ?? "50%",
        }}
      >
        <p className="title-text">{props.label}:</p>
        <div style={{ padding: "4px" }}></div>
        <p className="content-text">{props.content}</p>
      </Row>
    </>
  );
};

export default LabelContentItem;
