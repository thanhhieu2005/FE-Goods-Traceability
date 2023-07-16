import LabelContentItem from "@/components/Label/LabelContentItem";
import StateCard from "@/components/Tag/StateCard";
import { LogModel } from "@/types/project_log_model";
import { canceledColor, completedColor, mainColor } from "@/utils/app_color";
import { Row } from "antd";
import React from "react";

const HarvestLogInfoCard = ({ myProps: props }: any) => {
  const logModel: LogModel = props.log;

  return (
    <>
      {props.key !== 0 ? (
        <>
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
                  label: "Harvest ID",
                  content: logModel.modelBeforeChanged.harvestId,
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
                  label: "Total Harvest",
                  content: logModel.modelBeforeChanged.totalHarvest,
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Ripeness",
                  content: logModel.modelBeforeChanged.ripeness,
                }}
              />
            </Row>
            <Row>
              <LabelContentItem
                myProps={{
                  label: "Moisture",
                  content: logModel.modelBeforeChanged.moisture,
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Temperature",
                  content: logModel.modelBeforeChanged.temperature,
                }}
              />
            </Row>
          </div>
        </>
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
                label: "Harvest ID",
                content: logModel.modelAfterChanged.harvestId,
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
                label: "Total Harvest",
                content: logModel.modelAfterChanged.totalHarvest,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Ripeness",
                content: logModel.modelAfterChanged.ripeness,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Moisture",
                content: logModel.modelAfterChanged.moisture,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Temperature",
                content: logModel.modelAfterChanged.temperature,
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

export default HarvestLogInfoCard;
