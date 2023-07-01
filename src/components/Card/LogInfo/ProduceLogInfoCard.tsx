import LabelContentItem from "@/components/Label/LabelContentItem";
import StateCard from "@/components/Tag/StateCard";
import { LogModel } from "@/types/project_log_model";
import { canceledColor, completedColor, mainColor } from "@/utils/app_color";
import { Row } from "antd";
import moment from "moment";
import React from "react";

const ProduceLogInfoCard = ({ myProps: props }: any) => {
  const logModel: LogModel = props.log;

  return (
    <>
      
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
                  label: "Production Supervision ID",
                  content: logModel.modelBeforeChanged.produceSupervisionId,
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
                  label: "Factory Name",
                  content: logModel.modelBeforeChanged.factory,
                }}
              />
            </Row>
            <Row>
              <LabelContentItem
                myProps={{
                  label: "Total Product",
                  content: logModel.modelBeforeChanged.totalProduct,
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Humidity",
                  content: logModel.modelBeforeChanged.humidity,
                }}
              />
            </Row>
            <Row>
              <LabelContentItem
                myProps={{
                  label: "Drying Temperature",
                  content: logModel.modelBeforeChanged.dryingTemperature,
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Completed Date",
                  content:
                    logModel.modelBeforeChanged.dateCompleted !== null
                      ? moment(
                          logModel.modelBeforeChanged.dateCompleted
                        ).format("DD/MM/YYYY")
                      : "",
                }}
              />
            </Row>
            <Row>
              <LabelContentItem
                myProps={{
                  label: "Expired Date",
                  content:
                    logModel.modelBeforeChanged.expiredDate !== null
                      ? moment(logModel.modelBeforeChanged.expiredDate).format(
                          "DD/MM/YYYY"
                        )
                      : "",
                }}
              />
            </Row>
          </div>
        </>
      {/* ) : (
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
      )} */}
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
                label: "Production Supervision ID",
                content: logModel.modelAfterChanged.produceSupervisionId,
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
                label: "Factory Name",
                content: logModel.modelAfterChanged.factory,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Product",
                content: logModel.modelAfterChanged.totalProduct,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Humidity",
                content: logModel.modelAfterChanged.humidity,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Drying Temperature",
                content: logModel.modelAfterChanged.dryingTemperature,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Completed Date",
                content:
                  logModel.modelAfterChanged.dateCompleted !== null
                    ? moment(logModel.modelAfterChanged.dateCompleted).format(
                        "DD/MM/YYYY"
                      )
                    : "",
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Expired Date",
                content:
                  logModel.modelAfterChanged.expiredDate !== null
                    ? moment(logModel.modelAfterChanged.expiredDate).format(
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

export default ProduceLogInfoCard;
