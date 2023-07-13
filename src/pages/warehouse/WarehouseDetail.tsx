import WarehouseStorageServices, {
  GetWarehouseDetailByIdAPI,
  UpdateWarehouseDetailByIdAPI,
} from "@/api/warehouse_api";
import { logoVerify } from "@/assets";
import DrawerEditWarehouseStorage from "@/components/Drawer/DrawerEditWarehouseStorage";
import LabelContentItem from "@/components/Label/LabelContentItem";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import SpinApp from "@/components/Spin/SpinApp";
import StateCard from "@/components/Tag/StateCard";
import { LogEnum, LogModel } from "@/types/project_log_model";
import { CommonProjectState } from "@/types/project_model";
import {
  WarehouseStorageModel,
  parseWarehouseStorageData,
} from "@/types/step_tracking";
import { checkVerifyBlockchainLog } from "@/utils/check_verify_log";
import { dateFormat } from "@/utils/formatDateTime";
import { FileSearchOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Modal, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function WarehouseDetail() {
  const [dataWarehouseStorage, setDataWarehouseStorage] =
    useState<WarehouseStorageModel>();

  const { state: warehouseStorageId } = useLocation();

  const navigate = useNavigate();

  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  useEffect(() => {
    GetWarehouseDetailByIdAPI(warehouseStorageId).then((res: any) => {
      const warehouseStorage = parseWarehouseStorageData(res.data);

      setDataWarehouseStorage(warehouseStorage);
    });
  }, [warehouseStorageId]);

  const handleShowDrawerUpdate = () => {
    setIsOpenModalUpdate(true);
  };

  const handleCancelDrawerUpdate = () => {
    setIsOpenModalUpdate(false);
  };

  const checkHasProject = () => {
    if (dataWarehouseStorage?.projectId !== null) {
      setIsOpenModalUpdate(true);
    } else {
      Modal.warning({
        content:
          "You can't update this step because the project has not assigned yet.",
      });
    }
  };

  // handle for log list
  const [warehouseLogList, setWarehouseLogList] = useState<LogModel[]>([]);

  const [isCallGetLog, setCallGetLog] = useState(false);

  useEffect(() => {
    setWarehouseLogList([]);

    const getHarvestLogList = async () => {
      const res: any = await WarehouseStorageServices.getWarehouseLogListById(
        warehouseStorageId
      );

      if (res.status === 200) {
        res.data.map((element: any) => {
          const logModel = element.log as LogModel;
          setWarehouseLogList((prev) => [...prev, logModel]);
        });
      }
    };

    getHarvestLogList();
  }, [warehouseStorageId, isCallGetLog]);

  return (
    <>
      {isOpenModalUpdate && (
        <DrawerEditWarehouseStorage
          myProps={{
            dataWarehouseStorage: dataWarehouseStorage,
            showUpdate: handleShowDrawerUpdate,
            cancelCloseUpdate: handleCancelDrawerUpdate,
            setDataWarehouseStorage: setDataWarehouseStorage,
            setIsOpenModalUpdate: setIsOpenModalUpdate,
            setCallGetLog: setCallGetLog,
          }}
        />
      )}
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-style">
              <Breadcrumb.Item>
                Warehouse Supervision Management
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Warehouse Supervision Project Detail
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Warehouse Supervision</div>
            <div className="sub-title-header">
              Display warehouse storage project information, status and details
              of {dataWarehouseStorage?.projectCode}
            </div>
          </Col>
        </div>
        <div>
          {dataWarehouseStorage ? (
            <Col>
              <div className="content-page">
                {checkVerifyBlockchainLog(warehouseLogList) === true && dataWarehouseStorage.state === CommonProjectState.Completed ? (
                  <img src={logoVerify} height={144} />
                ) : (
                  <></>
                )}
                <Row
                  style={{
                    margin: "12px 0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <StateCard myProps={{ state: dataWarehouseStorage.state }} />
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="text-main-label">
                    Project:{" "}
                    <span style={{ color: "#B31312", fontWeight: "700" }}>
                      {dataWarehouseStorage.projectCode}
                    </span>
                  </p>
                  <Button
                      type="default"
                      size="middle"
                      icon={<FileSearchOutlined style={{ fontSize: "18px" }} />}
                      onClick={() => {
                        navigate(`/project-log/${warehouseStorageId}`, {
                          state: {
                            listLog: warehouseLogList,
                            type: LogEnum.Warehouse,
                          },
                        });
                      }}
                      style={{ borderRadius: "4px", marginRight: "12px" }}
                    >
                      View Log
                    </Button>
                  {dataWarehouseStorage.state ===
                    CommonProjectState.Completed ||
                  dataWarehouseStorage.state === CommonProjectState.Canceled ? (
                    <></>
                  ) : (
                    <div>
                      <Button
                        type="primary"
                        icon={<FormOutlined />}
                        size="large"
                        style={{ borderRadius: "4px" }}
                        onClick={() => {
                          checkHasProject();
                        }}
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </Row>
                <div style={{ padding: "8px 0px" }}>
                  <Row
                    style={{
                      display: "flex",
                      // justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ width: "50%" }}>
                      <span className="title-text">Project ID: </span>
                      <span className="content-text">
                        {dataWarehouseStorage.projectId}
                      </span>
                    </p>
                    <p style={{ width: "50%" }}>
                      <span className="title-text">Warehose Storage ID: </span>
                      <span className="content-text">
                        {dataWarehouseStorage.warehouseStorageId}
                      </span>
                    </p>
                  </Row>
                </div>
                <div className="space-padding" />
                <Col>
                  <p className="text-main-label">Warehose Storage Supervisor</p>
                  <Row style={{ paddingTop: "8px" }}>
                    <p style={{ width: "50%" }}>
                      <span className="title-text">Email: </span>
                      <span className="content-text">
                        {dataWarehouseStorage.inspector?.email}
                      </span>
                    </p>
                    <p style={{ width: "50%" }}>
                      <span className="title-text">Full Name: </span>
                      <span className="content-text">
                        {dataWarehouseStorage.inspector?.lastName}{" "}
                        {dataWarehouseStorage.inspector?.firstName}
                      </span>
                    </p>
                  </Row>
                </Col>
              </div>
              <div className="space-padding" />
              <div className="content-page">
                <Col>
                  <p className="text-main-label">
                    Warehouse Supervision Information
                  </p>
                  <div className="space-padding" />
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Total Import (ton)",
                        content:
                          dataWarehouseStorage.totalInput ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Input Date",
                        content:
                          dataWarehouseStorage.inputDate !== null
                            ? moment(dataWarehouseStorage.inputDate).format(
                                dateFormat
                              )
                            : "Not update",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Total Export (ton)",
                        content:
                          dataWarehouseStorage.totalExport ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Output Date",
                        content:
                          dataWarehouseStorage.outputDate !== null
                            ? moment(dataWarehouseStorage.outputDate).format(
                                dateFormat
                              )
                            : "Not update",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Warehouse Name",
                        content:
                          dataWarehouseStorage.warehouseName ?? "Not Update",
                        width: "100%",
                      }}
                    />
                  </Row>
                  <LabelContentItem
                    myProps={{
                      label: "Note",
                      content: dataWarehouseStorage.note ?? "Not update",
                      width: "100%",
                    }}
                  />
                </Col>
              </div>
            </Col>
          ) : (
            <>
              <SpinApp></SpinApp>
            </>
          )}
        </div>
      </Col>
    </>
  );
}

export default WarehouseDetail;
