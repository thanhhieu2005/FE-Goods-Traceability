import LabelContentItem from "@/components/Label/LabelContentItem";
import StateCard from "@/components/Tag/StateCard";
import { LogModel } from "@/types/project_log_model";
import { canceledColor, completedColor, mainColor } from "@/utils/app_color";
import { Row } from "antd";
import React from "react";

const ProjectLogInfoCard = ({ myProps: props }: any) => {
  const logModel: LogModel = props.log;

  return (
    <>
      {props.key !== 0 ? (
        <div>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: canceledColor,
                paddingRight: "12px",
              }}
            >
              Modal Before Changed
            </p>
            <StateCard
              myProps={{
                state: logModel.modelBeforeChanged.state,
                fontSizeText: "12px",
                padding: "4px 8px",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Farm Project ID",
                content: logModel.modelBeforeChanged.farmProject,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Project Code",
                content: logModel.modelBeforeChanged.projectCode,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Project Name",
                content: logModel.modelBeforeChanged.projectName,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Harvest Inspection ID",
                content: logModel.modelBeforeChanged.harvest,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Transport Supervision ID",
                content: logModel.modelBeforeChanged.transport,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Warehouse Storage Supervision ID",
                content: logModel.modelBeforeChanged.warehouseStorage,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Production Supervision ID",
                content: logModel.modelBeforeChanged.produce,
              }}
            />
          </Row>
        </div>
      ) : (
        <p
          className="log-container"
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: mainColor,
            display: "inline-flex",
            padding: "8px",
          }}
        >
          Initial Project
        </p>
      )}
      <div style={{ padding: "8px" }} />
      {logModel.modelAfterChanged !== null ? (
        <div>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: completedColor,
                paddingRight: "12px",
              }}
            >
              Modal After Changed
            </p>
            <StateCard
              myProps={{
                state: logModel.modelBeforeChanged.state,
                fontSizeText: "12px",
                padding: "4px 8px",
              }}
            />
          </Row>

          <Row>
            <LabelContentItem
              myProps={{
                label: "Farm Project ID",
                content: logModel.modelAfterChanged.farmProject ?? "",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Project Code",
                content: logModel.modelAfterChanged.projectCode,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Project Name",
                content: logModel.modelAfterChanged.projectName,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Harvest Inspection ID",
                content: logModel.modelAfterChanged.harvest,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Transport Supervision ID",
                content: logModel.modelAfterChanged.transport,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Warehouse Storage Supervision ID",
                content: logModel.modelAfterChanged.warehouseStorage,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Production Supervision ID",
                content: logModel.modelAfterChanged.produce,
              }}
            />
          </Row>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProjectLogInfoCard;
