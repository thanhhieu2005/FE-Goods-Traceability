import { Harvest } from "@/types/step_tracking";
import { Button, Col, Row } from "antd";
import React from "react";
import StateCard from "../Tag/StateCard";
import { FormOutlined } from "@ant-design/icons";
import LabelContentItem from "../Label/LabelContentItem";
import moment from "moment";

const HarvestInfoCard = ({ myProps: props }: any) => {
  const dataHarvest: Harvest = props.dataHarvest;

  return (
    <>
      <div className="content-page">
        <Col>
          <div style={{ margin: "12px 0px" }}>
            <StateCard
              myProps={{
                state: dataHarvest.state,
                padding: "4px 12px",
                fontSizeText: "14px",
              }}
            />
          </div>
          <Row className="row-space-between">
            <p
              className="text-main-label"
              style={{ color: "#1B9C85", fontWeight: "700" }}
            >
              Harvest Inspection
            </p>
            <Button
              type="primary"
              icon={<FormOutlined />}
              size="middle"
              style={{ borderRadius: "4px" }}
            >
              Edit Inspector
            </Button>
          </Row>
          <div className="space-padding" />
          <LabelContentItem
            myProps={{
              label: "Harvest ID",
              content: dataHarvest.harvestId,
              width: "100%",
            }}
          />
          <div className="space-padding" />
          <LabelContentItem myProps={{
            label: "Harvestor",
            content: dataHarvest.inspector !== null ? dataHarvest.inspector?.email : "Not assigned yet", 
            width: "100%",
          }}/>
          <div className="space-padding" />
          <LabelContentItem
            myProps={{
              label: "Date Completed",
              content:
                dataHarvest.dateCompleted !== null
                  ? moment(dataHarvest.dateCompleted).format("DD/MM/YYYY")
                  : "Not update",
              width: "100%",
            }}
          />
          <LabelContentItem myProps={{
            label: 'Total Harvest (ton)',
            content: dataHarvest.totalHarvest ?? "Not update",
            width: '100%',
          }}/>
          <LabelContentItem myProps={{
            label: 'Ripeness (%)',
            content: dataHarvest.ripeness ?? "Not update",
            width: '100%',
          }}/>
          <LabelContentItem myProps={{
            label: 'Moisture',
            content: dataHarvest.moisture ?? "Not update",
            width: '100%',
          }}/>
          <LabelContentItem myProps={{
            label: 'Temperature (°C)',
            content: dataHarvest.temperature ?? "Not update",
            width: '100%',
          }}/>
        </Col>
      </div>
    </>
  );
};

export default HarvestInfoCard;
