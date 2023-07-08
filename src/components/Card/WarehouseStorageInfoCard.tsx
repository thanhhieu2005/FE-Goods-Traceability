import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import StateCard from "../Tag/StateCard";
import { WarehouseStorageModel } from "@/types/step_tracking";
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

const WarehouseStorageInfoCard = ({ myProps: props }: any) => {
  const [dataWarehouseStorage, setDataWarehouseStorage] =
    useState<WarehouseStorageModel>(props.dataWarehouseStorage);

  useEffect(() => {
    setDataWarehouseStorage(props.dataWarehouseStorage);
  }, [props.dataWarehouseStorage]);

  const navigate = useNavigate();

  const [isModalUpdate, setIsModalUpdate] = useState(false);

  const handleOnClickUpdateInspector = () => {
    setIsModalUpdate(true);
  };

  const onCancelUpdateInspectorModal = () => {
    setIsModalUpdate(false);
  };

  const onHandleAssignInspector = async (value: any) => {
    console.log(value.emailInspector, dataWarehouseStorage.warehouseStorageId);

    const res: any = await ProjectServices.addWarehouseStorageSupervisor(
      value.emailInspector,
      dataWarehouseStorage.warehouseStorageId
    );

    if (res.status === 200) {
      setDataWarehouseStorage(res.data);
      successMessage("Assing inspector success!");
    } else {
      console.log(res);
      errorMessage(res.response.data.message);
    }

    setIsModalUpdate(false);
  };

  const onHandleRemoveInspector = async () => {
    const res: any = await ProjectServices.removeWarehouseStorageSupervisor(
      dataWarehouseStorage.warehouseStorageId
    );

    if (res.status === 200) {
      setDataWarehouseStorage(res.data);
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
          department: StaffDepartment.WarehouseSupervision,
          inspector: dataWarehouseStorage.inspector,
          title: "Update Warehouse Storage Supervision",
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
                state: dataWarehouseStorage.state,
                padding: "4px 12px",
                fontSizeText: "14px",
              }}
            />
          </div>
          <Row className="row-space-between">
            <p
              className="text-main-label"
              style={{ color: "#B31312", fontWeight: "700" }}
            >
              Warehouse Storage Supervision
            </p>
            <Row>
              <Button
                type="default"
                size="middle"
                icon={<FileSearchOutlined style={{ fontSize: "18px" }} />}
                onClick={() => {
                  navigate(
                    `/project-log/${dataWarehouseStorage.warehouseStorageId}`,
                    {
                      state: {
                        listLog: props.warehouseStorageLogList,
                        type: LogEnum.Warehouse,
                      },
                    }
                  );
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
                  label: "Warehouse Storage ID",
                  content: dataWarehouseStorage.warehouseStorageId,
                  width: "100%",
                }}
              />
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Warehosue Inspector",
                  content:
                    dataWarehouseStorage.inspector !== null
                      ? dataWarehouseStorage.inspector?.email
                      : "Not assigned yet",
                  width: "100%",
                }}
              />
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Date Imported",
                  content:
                    dataWarehouseStorage.inputDate !== null
                      ? moment(dataWarehouseStorage.inputDate).format(
                          "DD/MM/YYYY"
                        )
                      : "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Date Exported",
                  content:
                    dataWarehouseStorage.outputDate !== null
                      ? moment(dataWarehouseStorage.outputDate).format(
                          "DD/MM/YYYY"
                        )
                      : "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Warehouse Name",
                  content: dataWarehouseStorage.warehouseName ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Total Import",
                  content: dataWarehouseStorage.totalInput ?? "Not update",
                  width: "100%",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Total Export",
                  content: dataWarehouseStorage.totalExport ?? "Not update",
                  width: "100%",
                }}
              />
            </div>
            {props.isDone === true &&
            dataWarehouseStorage.state === CommonProjectState.Completed ? (
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

export default WarehouseStorageInfoCard;
