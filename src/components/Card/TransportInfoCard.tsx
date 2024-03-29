import { TransportModel } from "@/types/step_tracking";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import StateCard from "../Tag/StateCard";
import { FileSearchOutlined, FormOutlined } from "@ant-design/icons";
import LabelContentItem from "../Label/LabelContentItem";
import moment from "moment";
import { errorMessage, successMessage } from "../Message/MessageNoti";
import ProjectServices from "@/api/system_admin/project_api";
import ModalUpdateInspector from "../Modal/ModalUpdateInspector";
import { StaffDepartment } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { LogEnum } from "@/types/project_log_model";
import { logoVerify } from "@/assets";
import { CommonProjectState } from "@/types/project_model";

const TransportInfoCard = ({ myProps: props }: any) => {
  const [dataTransport, setDatTransport] = useState<TransportModel>(
    props.dataTransport
  );

  useEffect(() => {
    setDatTransport(props.dataTransport);
  }, [props.dataTransport]);

  const navigate = useNavigate();

  const [
    isModalUpdateTransportSupervision,
    setIsModalUpdateTransportSupervision,
  ] = useState(false);

  const hanleOnClickUpdateInspector = () => {
    setIsModalUpdateTransportSupervision(true);
  };

  const onCancelUpdateInspectorModal = () => {
    console.log("test");
    setIsModalUpdateTransportSupervision(false);
  };

  const onHandleAssignInspector = async (value: any) => {
    console.log(value.emailInspector, dataTransport.transportId);

    const res: any = await ProjectServices.addTransportSupervisor(
      value.emailInspector,
      dataTransport.transportId
    );

    if (res.status === 200) {
      setDatTransport(res.data);
      successMessage("Assing inspector success!");
    } else {
      console.log(res);
      errorMessage(res.response.data.message);
    }

    setIsModalUpdateTransportSupervision(false);
  };

  const onHandleRemoveInspector = async () => {
    const res: any = await ProjectServices.removeTransportSupervisor(
      dataTransport.transportId
    );

    if (res.status === 200) {
      setDatTransport(res.data);
      successMessage("Remove Inspector Successfully!");
    } else {
      errorMessage(res.response.data.message);
    }

    setIsModalUpdateTransportSupervision(false);
  };

  return (
    <>
      <ModalUpdateInspector
        myProps={{
          department: StaffDepartment.TransportSupervision,
          inspector: dataTransport.inspector,
          title: "Update Transport Supervision",
          onCancel: onCancelUpdateInspectorModal,
          isOpen: isModalUpdateTransportSupervision,
          onFinsh: onHandleAssignInspector,
          onRemoveInspector: onHandleRemoveInspector,
        }}
      />
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
              Transport Supervision
            </p>
            <Row>
              <Button
                type="default"
                size="middle"
                icon={<FileSearchOutlined style={{ fontSize: "18px" }} />}
                onClick={() => {
                  navigate(`/project-log/${dataTransport.transportId}`, {
                    state: {
                      listLog: props.transportLogList,
                      type: LogEnum.Transport,
                    },
                  });
                }}
              >
                View log
              </Button>
              <div style={{ padding: "4px" }} />
              <Button
                type="primary"
                icon={<FormOutlined />}
                size="middle"
                style={{ borderRadius: "4px" }}
                onClick={() => {
                  hanleOnClickUpdateInspector();
                }}
              >
                Edit Inspector
              </Button>
            </Row>
          </Row>
          <div className="space-padding" />
          <Row
            style={{
              margin: "12px 0px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <LabelContentItem
                myProps={{
                  label: "Transport ID",
                  content: dataTransport.transportId,
                  width: "100%",
                }}
              />
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Transport Inspector",
                  content:
                    dataTransport.inspector !== null
                      ? dataTransport.inspector?.email
                      : "Not assigned yet",
                  width: "100%",
                }}
              />
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Date Completed",
                  content:
                    dataTransport.dateCompleted !== null
                      ? moment(dataTransport.dateCompleted).format("DD/MM/YYYY")
                      : "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Total Input (ton)",
                  content: dataTransport.totalInput ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Transport Name",
                  content: dataTransport.transportName ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Vehicle Type",
                  content: dataTransport.vehicleType ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Number of Vehicles",
                  content: dataTransport.numberOfVehicle ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Date Expected",
                  content:
                    dataTransport.dateExpected !== null
                      ? moment(dataTransport.dateExpected).format("DD/MM/YYYY")
                      : "Not update",
                  width: "100%",
                }}
              />
            </div>
            {props.isDone === true &&
            dataTransport.state === CommonProjectState.Completed ? (
              <img src={logoVerify} height={144} />
            ) : (
              <></>
            )}
          </Row>
        </Col>
      </div>
    </>
  );
};

export default TransportInfoCard;
