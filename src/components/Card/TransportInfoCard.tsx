import { Transport } from "@/types/step_tracking";
import { Button, Col, Row } from "antd";
import React from "react";
import StateCard from "../Tag/StateCard";
import { FormOutlined } from "@ant-design/icons";
import LabelContentItem from "../Label/LabelContentItem";
import moment from "moment";

const TransportInfoCard = ({ myProps: props }: any) => {
  const dataTransport: Transport = props.dataTransport;

  return (
    <>
      <div className="content-page">
        <Col>
          <div style={{ margin: "12px 0px" }}>
            <StateCard
              myProps={{
                state: dataTransport.state,
                padding: "4px 12px",
                fontSizeText: "14px",
              }}
            />
          </div>
          <Row className="row-space-between">
            <p
              className="text-main-label"
              style={{ color: "#0E2954", fontWeight: "700" }}
            >
              Transport Inspection
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
                label: 'Transport ID',
                content: dataTransport.transportId,
                width: '100%'
            }}
          />
          <div className="space-padding" />
          <LabelContentItem myProps={{
            label: "Transport Inspector",
            content: dataTransport.inspector !== null ? dataTransport.inspector?.email : "Not assigned yet", 
            width: "100%",
          }}/>
          <div className="space-padding" />
          <LabelContentItem
            myProps={{
                label: 'Date Completed',
                content: dataTransport.dateCompleted !== null
                ? moment(dataTransport.dateCompleted).format("DD/MM/YYYY")
                : "Not update",
                width: '100%',
            }}
          />
          <LabelContentItem 
            myProps={{
                label: 'Total Input (ton)',
                content: dataTransport.totalInput ?? "Not update",
                width: '100%',
            }}
          />
          <LabelContentItem 
            myProps={{
                label: 'Transport Name',
                content: dataTransport.transportName ?? "Not update",
                width: '100%',
            }}
          />
          <LabelContentItem 
            myProps={{
                label: 'Vehicle Type',
                content: dataTransport.vehicleType ?? "Not update",
                width: '100%',
            }}
          />  
          <LabelContentItem 
            myProps={{
                label: 'Number of Vehicles',
                content: dataTransport.numberOfVehicle ?? "Not update",
                width: '100%',
            }}
          />
          <LabelContentItem 
            myProps={{
                label: 'Date Expected',
                content: dataTransport.dateExpected !== null
                ? moment(dataTransport.dateExpected).format("DD/MM/YYYY")
                : "Not update",
                width: '100%',
            }}
          />
        </Col>
      </div>
    </>
  );
};

export default TransportInfoCard;
