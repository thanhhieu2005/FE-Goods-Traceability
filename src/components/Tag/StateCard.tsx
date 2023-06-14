import { CommonProjectState } from "@/types/project_model";
import { Tag } from "antd";
import React from "react";

const StateCard = ({ myProps: props }: any) => {
  const state: CommonProjectState = props.state;

  switch (state) {
    case CommonProjectState.Processing:
      return (
        <div>
          <Tag
            color="processing"
            style={{
              fontSize: props.fontSizeText ?? "16px",
              padding: props.padding ?? "8px 16px",
              borderRadius: "4px",
            }}
          >
            PROCESSING
          </Tag>
        </div>
      );
    case CommonProjectState.Completed:
      return (
        <div>
          <Tag
            color="success"
            style={{
              fontSize: props.fontSizeText ?? "16px",
              padding: props.padding ??  "8px 16px",
              borderRadius: "4px",
            }}
          >
            COMPLETE
          </Tag>
        </div>
      );
    case CommonProjectState.Canceled:
      return (
        <div>
          <Tag
            color="error"
            style={{
              fontSize: props.fontSizeText ?? "16px",
              padding: props.padding ??  "8px 16px",
              borderRadius: "4px",
            }}
          >
            COMPLETE
          </Tag>
        </div>
      );
    case CommonProjectState.Pending:
      return (
        <div>
          <Tag
            color="warning"
            style={{
              fontSize: props.fontSizeText ?? "16px",
              padding: props.padding ??  "8px 16px",
              borderRadius: "4px",
            }}
          >
            COMPLETE
          </Tag>
        </div>
      );
    default:
      return (
        <div>
          <Tag
            color="default"
            style={{
              fontSize: props.fontSizeText ?? "16px",
              padding: props.padding ??  "8px 16px",
              borderRadius: "4px",
            }}
          >
            NOT YET
          </Tag>
        </div>
      );
  }
};

export default StateCard;
