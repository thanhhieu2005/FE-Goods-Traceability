import LabelContentItem from "@/components/Label/LabelContentItem";
import StateCard from "@/components/Tag/StateCard";
import { LogModel } from "@/types/project_log_model";
import { canceledColor, completedColor } from "@/utils/app_color";
import { Row } from "antd";
import moment from "moment";
import React from "react";

const FarmProjectLogInfoCard = ({ myProps: props }: any) => {
  const logModel: LogModel = props.log;

  return (
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
      <LabelContentItem
        myProps={{
          label: "FarmProject ID",
          content: logModel.modelBeforeChanged.farmProjectId,
        }}
      />
      <div style={{ fontSize: "16px", fontWeight: "400" }}>Land Info</div>
      {logModel.modelBeforeChanged.land !== null ? (
        <Row>
          <LabelContentItem
            myProps={{
              label: "Land ID",
              content: logModel.modelBeforeChanged.land,
            }}
          />
          {/* <LabelContentItem
            myProps={{
              label: "Land Name",
              content: logModel.modelBeforeChanged.land.landName,
            }}
          /> */}
        </Row>
      ) : (
        <div style={{ fontSize: "14px", fontWeight: "400" }}>Not yet</div>
      )}
      <div style={{ fontSize: "16px", fontWeight: "400" }}>Seed Info</div>
      {logModel.modelBeforeChanged.seed !== null ? (
        <Row>
          <LabelContentItem
            myProps={{
              label: "Land ID",
              content: logModel.modelBeforeChanged.seed,
            }}
          />
          {/* <LabelContentItem
            myProps={{
              label: "Land Name",
              content: logModel.modelBeforeChanged.seed.seedName,
            }}
          /> */}
        </Row>
      ) : (
        <div style={{ fontSize: "14px", fontWeight: "400" }}>Not yet</div>
      )}
      <Row>
        <LabelContentItem
          myProps={{
            label: "Total Harvest",
            content: logModel.modelBeforeChanged.totalHarvest,
          }}
        />
        <LabelContentItem
          myProps={{
            label: "Total Seeds",
            content: logModel.modelBeforeChanged.totalSeeds,
          }}
        />
      </Row>
      <Row>
        <LabelContentItem
          myProps={{
            label: "Total Fertilizers",
            content: logModel.modelBeforeChanged.totalFertilizers,
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
            label: "Pesticides",
            content: logModel.modelBeforeChanged.pesticide,
          }}
        />
        <LabelContentItem
          myProps={{
            label: "Plant Density(/ha)",
            content: logModel.modelBeforeChanged.plantDensity,
          }}
        />
      </Row>
      <Row>
        <LabelContentItem
          myProps={{
            label: "Date Harvested",
            content:
              logModel.modelBeforeChanged.dateHarvested !== null
                ? moment(logModel.modelBeforeChanged.expiredDate).format(
                    "DD/MM/YYYY"
                  )
                : "",
          }}
        />
      </Row>
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
          <LabelContentItem
            myProps={{
              label: "FarmProject ID",
              content: logModel.modelAfterChanged.farmProjectId,
            }}
          />
          <div style={{ fontSize: "16px", fontWeight: "400" }}>Land Info</div>
          {logModel.modelAfterChanged.land !== null ? (
            <Row>
              <LabelContentItem
                myProps={{
                  label: "Land ID",
                  content: logModel.modelAfterChanged.land._id,
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Land Name",
                  content: logModel.modelAfterChanged.land.landName,
                }}
              />
            </Row>
          ) : (
            <div style={{ fontSize: "14px", fontWeight: "400" }}>Not yet</div>
          )}
          <div style={{ fontSize: "16px", fontWeight: "400" }}>Seed Info</div>
          {logModel.modelAfterChanged.seed !== null ? (
            <Row>
              <LabelContentItem
                myProps={{
                  label: "Land ID",
                  content: logModel.modelAfterChanged.seed._id,
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Land Name",
                  content: logModel.modelAfterChanged.seed.seedName,
                }}
              />
            </Row>
          ) : (
            <div style={{ fontSize: "14px", fontWeight: "400" }}>Not yet</div>
          )}
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Harvest",
                content: logModel.modelAfterChanged.totalHarvest,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Total Seeds",
                content: logModel.modelAfterChanged.totalSeeds,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Total Fertilizers",
                content: logModel.modelAfterChanged.totalFertilizers,
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
                label: "Pesticides",
                content: logModel.modelAfterChanged.pesticide,
              }}
            />
            <LabelContentItem
              myProps={{
                label: "Plant Density(/ha)",
                content: logModel.modelAfterChanged.plantDensity,
              }}
            />
          </Row>
          <Row>
            <LabelContentItem
              myProps={{
                label: "Date Harvested",
                content:
                  logModel.modelAfterChanged.dateHarvested !== null
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
    </div>
  );
};

export default FarmProjectLogInfoCard;
