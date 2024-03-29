import { ProductionModel } from "@/types/step_tracking";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import StateCard from "../Tag/StateCard";
import { FileSearchOutlined, FormOutlined } from "@ant-design/icons";
import LabelContentItem from "../Label/LabelContentItem";
import moment from "moment";
import ProjectServices from "@/api/system_admin/project_api";
import { errorMessage, successMessage } from "../Message/MessageNoti";
import ModalUpdateInspector from "../Modal/ModalUpdateInspector";
import { StaffDepartment } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { LogEnum } from "@/types/project_log_model";
import { logoVerify } from "@/assets";
import { CommonProjectState } from "@/types/project_model";

const ProduceInfoCard = ({ myProps: props }: any) => {
  const [dataProduce, setDataProduce] = useState<ProductionModel>(
    props.dataProduce
  );

  useEffect(() => {
    setDataProduce(props.dataProduce);
  }, [props.dataProduce]);

  const navigate = useNavigate();

  const [isModalUpdate, setIsModalUpdate] = useState(false);

  const handleOnClickUpdateInspector = () => {
    setIsModalUpdate(true);
  };

  const onCancelUpdateInspectorModal = () => {
    setIsModalUpdate(false);
  };

  const onHandleAssignInspector = async (value: any) => {
    console.log(value.emailInspector, dataProduce.produceSupervisionId);

    const res: any = await ProjectServices.addProduceSupervisor(
      value.emailInspector,
      dataProduce.produceSupervisionId
    );

    if (res.status === 200) {
      setDataProduce(res.data);
      successMessage("Assing inspector success!");
    } else {
      console.log(res);
      errorMessage(res.response.data.message);
    }

    setIsModalUpdate(false);
  };

  const onHandleRemoveInspector = async () => {
    const res: any = await ProjectServices.removeProduceSupervisor(
      dataProduce.produceSupervisionId
    );

    if (res.status === 200) {
      setDataProduce(res.data);
      successMessage("Remove Inspector Successfully!");
    } else {
      errorMessage(res.response.data.message);
    }

    setIsModalUpdate(false);
  };

  return (
    <>
      <ModalUpdateInspector
        myProps={{
          department: StaffDepartment.SupervisingProducer,
          inspector: dataProduce.inspector,
          title: "Update Production Supervision",
          onCancel: onCancelUpdateInspectorModal,
          isOpen: isModalUpdate,
          onFinsh: onHandleAssignInspector,
          onRemoveInspector: onHandleRemoveInspector,
        }}
      />
      <div className="content-page">
        <Col>
          <div style={{ margin: "12px 0px" }}>
            <StateCard
              myProps={{
                state: dataProduce.state,
                padding: "4px 12px",
                fontSizeText: "14px",
              }}
            />
          </div>
          <Row className="row-space-between">
            <p
              className="text-main-label"
              style={{ color: "#46458C", fontWeight: "700" }}
            >
              Supervising Production
            </p>
            <Row>
              <Button
                type="default"
                size="middle"
                icon={<FileSearchOutlined style={{ fontSize: "18px" }} />}
                onClick={() => {
                  navigate(`/project-log/${dataProduce.produceSupervisionId}`, {
                    state: {
                      listLog: props.produceLogList,
                      type: LogEnum.Produce,
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
                  handleOnClickUpdateInspector();
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
                  label: "Production ID",
                  content: dataProduce.produceSupervisionId,
                  width: "100%",
                }}
              />
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Production Inspector",
                  content:
                    dataProduce.inspector !== null
                      ? dataProduce.inspector?.email
                      : "Not assigned yet",
                  width: "100%",
                }}
              />
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Date Completed",
                  content:
                    dataProduce.dateCompleted !== null
                      ? moment(dataProduce.dateCompleted).format("DD/MM/YYYY")
                      : "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Total Input",
                  content: dataProduce.totalInput ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Factory Name",
                  content: dataProduce.factoryName ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Humidity (%)",
                  content: dataProduce.humidity ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Drying Temperature (°C)",
                  content: dataProduce.dryingTemperature ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Product Name",
                  content: dataProduce.productName ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Expiration Date",
                  content:
                    dataProduce.expiredDate !== null
                      ? moment(dataProduce.expiredDate).format("DD/MM/YYYY")
                      : "Not update",
                  width: "100%",
                }}
              />
            </div>
            {props.isDone === true &&
            dataProduce.state === CommonProjectState.Completed ? (
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

export default ProduceInfoCard;
