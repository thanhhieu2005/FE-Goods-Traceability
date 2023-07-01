import LabelContentItem from "@/components/Label/LabelContentItem";
import StateCard from "@/components/Tag/StateCard";
import { LogModel } from "@/types/project_log_model";
import { canceledColor, completedColor, mainColor } from "@/utils/app_color";
import { Row } from "antd";
import moment from "moment";
import React from "react";

const TransportLogInfoCard = ({ myProps: props }: any) => {
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
                label: "Transport Supervision ID",
                content: logModel.modelBeforeChanged.transportId,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Inspector ID",
                content: logModel.modelBeforeChanged.inspector ?? "",
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Project Code",
                content: logModel.modelBeforeChanged.projectCode,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Input",
                content: logModel.modelBeforeChanged.totalInput,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Transport Company",
                content: logModel.modelBeforeChanged.transportCompany ?? "",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Vehicle",
                content: logModel.modelBeforeChanged.vehicle,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Number of Vehicles",
                content: logModel.modelBeforeChanged.numberOfVehicle ?? "",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Date Completed",
                content:
                  logModel.modelBeforeChanged.dateCompleted !== null
                    ? moment(logModel.modelBeforeChanged.dateCompleted).format(
                        "DD/MM/YYYY"
                      )
                    : "",
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Date Expected",
                content:
                  logModel.modelBeforeChanged.dateExpected !== null
                    ? moment(logModel.modelBeforeChanged.dateExpected).format(
                        "DD/MM/YYYY"
                      )
                    : "",
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
                color: canceledColor,
                paddingRight: "12px",
              }}
            >
              Modal After Changed
            </p>
            <StateCard
              myProps={{
                state: logModel.modelAfterChanged.state,
                fontSizeText: "12px",
                padding: "4px 8px",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Transport Supervision ID",
                content: logModel.modelAfterChanged.transportId,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Inspector ID",
                content: logModel.modelAfterChanged.inspector ?? "",
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Project Code",
                content: logModel.modelAfterChanged.projectCode,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Input",
                content: logModel.modelAfterChanged.totalInput,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Transport Company",
                content: logModel.modelAfterChanged.transportCompany ?? "",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Vehicle",
                content: logModel.modelAfterChanged.vehicle,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Number of Vehicles",
                content: logModel.modelAfterChanged.numberOfVehicle ?? "",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Date Completed",
                content:
                  logModel.modelAfterChanged.dateCompleted !== null
                    ? moment(logModel.modelAfterChanged.dateCompleted).format(
                        "DD/MM/YYYY"
                      )
                    : "",
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Date Expected",
                content:
                  logModel.modelAfterChanged.dateExpected !== null
                    ? moment(logModel.modelAfterChanged.dateExpected).format(
                        "DD/MM/YYYY"
                      )
                    : "",
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

export default TransportLogInfoCard;
