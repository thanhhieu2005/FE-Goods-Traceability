import LabelContentItem from "@/components/Label/LabelContentItem";
import StateCard from "@/components/Tag/StateCard";
import { LogModel } from "@/types/project_log_model";
import { canceledColor, completedColor, mainColor } from "@/utils/app_color";
import { Row } from "antd";
import moment from "moment";
import React from "react";

const WarehouseLogInfoCard = ({ myProps: props }: any) => {
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
                label: "Warehouse Storage ID",
                content: logModel.modelBeforeChanged.warehouseStorageId,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Inspector ID",
                content: logModel.modelBeforeChanged.inspector,
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
                label: "Warehouse Name",
                content: logModel.modelBeforeChanged.warehouse,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Import",
                content: logModel.modelBeforeChanged.totalInput,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Import Date",
                content:
                  logModel.modelBeforeChanged.inputDate !== null
                    ? moment(logModel.modelBeforeChanged.inputDate).format(
                        "DD/MM/YYYY"
                      )
                    : "",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Export",
                content: logModel.modelBeforeChanged.totalInput,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Export Date",
                content:
                  logModel.modelBeforeChanged.outputDate !== null
                    ? moment(logModel.modelBeforeChanged.outputDate).format(
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
                color: completedColor,
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
                label: "Warehouse Storage ID",
                content: logModel.modelAfterChanged.warehouseStorageId,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Inspector ID",
                content: logModel.modelAfterChanged.inspector,
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
                label: "Warehouse Name",
                content: logModel.modelAfterChanged.warehouse,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Import",
                content: logModel.modelAfterChanged.totalInput,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Import Date",
                content:
                  logModel.modelAfterChanged.inputDate !== null
                    ? moment(logModel.modelAfterChanged.inputDate).format(
                        "DD/MM/YYYY"
                      )
                    : "",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Export",
                content: logModel.modelAfterChanged.totalInput,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Export Date",
                content:
                  logModel.modelAfterChanged.outputDate !== null
                    ? moment(logModel.modelAfterChanged.outputDate).format(
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

export default WarehouseLogInfoCard;
