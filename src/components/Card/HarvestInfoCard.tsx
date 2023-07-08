import { HarvestModel } from "@/types/step_tracking";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import StateCard from "../Tag/StateCard";
import { FileSearchOutlined, FormOutlined } from "@ant-design/icons";
import LabelContentItem from "../Label/LabelContentItem";
import moment from "moment";
import ModalUpdateInspector from "../Modal/ModalUpdateInspector";
import { StaffDepartment } from "@/types/user";
import ProjectServices from "@/api/system_admin/project_api";
import { errorMessage, successMessage } from "../Message/MessageNoti";
import { useNavigate } from "react-router-dom";
import { LogEnum } from "@/types/project_log_model";
import { logoVerify } from "@/assets";
import { checkVerifyBlockchainLog } from "@/utils/check_verify_log";
import { CommonProjectState } from "@/types/project_model";

const HarvestInfoCard = ({ myProps: props }: any) => {
  const [dataHarvest, setDataHarvest] = useState<HarvestModel>(
    props.dataHarvest
  );

  useEffect(() => {
    setDataHarvest(props.dataHarvest);
  }, [props.dataHarvest, props.harvestLogList]);

  const navigate = useNavigate();

  // update inspector in step
  const [isModalUpdateHarvestor, setIsModalUpdateHarvestor] = useState(false);

  const handleOnClickUpdateHarvestor = () => {
    setIsModalUpdateHarvestor(true);
  };

  const onCancelUpdateHarvestorModal = () => {
    setIsModalUpdateHarvestor(false);
  };

  const onHandleAssignInspector = async (value: any) => {
    console.log(value.emailInspector, dataHarvest.harvestId);

    const res: any = await ProjectServices.addHarvestorIntoProject(
      value.harvestor,
      dataHarvest.harvestId
    );

    if (res.status === 200) {
      setDataHarvest(res.data);
      successMessage("Assing inspector success!");
    } else {
      console.log(res);
      errorMessage(res.response.data.message);
    }

    setIsModalUpdateHarvestor(false);
  };

  const onHandleRemoveHarvestor = async () => {
    const res: any = await ProjectServices.removeHarvestorInProject(
      dataHarvest.harvestId
    );

    if (res.status === 200) {
      setDataHarvest(res.data);
      successMessage("Remove Harvestor Successfully!");
    } else {
      errorMessage(res.response.data.message);
    }

    setIsModalUpdateHarvestor(false);
  };

  return (
    <>
      <ModalUpdateInspector
        myProps={{
          department: StaffDepartment.HarvestInspection,
          inspector: dataHarvest.inspector,
          title: "Update Harvestor",
          onCancel: onCancelUpdateHarvestorModal,
          isOpen: isModalUpdateHarvestor,
          onFinsh: onHandleAssignInspector,
          onRemoveInspector: onHandleRemoveHarvestor,
        }}
      />
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
            <Row>
              <Button
                type="default"
                size="middle"
                icon={<FileSearchOutlined style={{ fontSize: "18px" }} />}
                onClick={() => {
                  navigate(`/project-log/${dataHarvest.harvestId}`, {
                    state: {
                      listLog: props.harvestLogList,
                      type: LogEnum.Harvest,
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
                  handleOnClickUpdateHarvestor();
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
                  label: "Harvest ID",
                  content: dataHarvest.harvestId,
                  width: "100%",
                }}
              />
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Harvestor",
                  content:
                    dataHarvest.inspector !== null
                      ? dataHarvest.inspector?.email
                      : "Not assigned yet",
                  width: "100%",
                }}
              />
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
              <LabelContentItem
                myProps={{
                  label: "Total Harvest (ton)",
                  content: dataHarvest.totalHarvest ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Ripeness (%)",
                  content: dataHarvest.ripeness ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Moisture",
                  content: dataHarvest.moisture ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Temperature (°C)",
                  content: dataHarvest.temperature ?? "Not update",
                  width: "100%",
                }}
              />
            </div>
            {props.isDone === true &&
            dataHarvest.state === CommonProjectState.Completed ? (
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

export default HarvestInfoCard;
