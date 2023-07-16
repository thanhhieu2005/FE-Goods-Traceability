import HarvestServices, {
  GetHarvestDetailByIdAPI,
} from "@/api/harvest/harvest_api";
import DrawerEditHarvestor from "@/components/Drawer/DrawerEditHarvestor";
import LabelContentItem from "@/components/Label/LabelContentItem";
import SpinApp from "@/components/Spin/SpinApp";
import StateCard from "@/components/Tag/StateCard";
import { CommonProjectState } from "@/types/project_model";
import { HarvestModel, parseHarvestData } from "@/types/step_tracking";
import { FileSearchOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Modal, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../common.scss";
import { logoVerify } from "@/assets";
import { LogEnum, LogModel } from "@/types/project_log_model";
import { checkVerifyBlockchainLog } from "@/utils/check_verify_log";

const HarvestDetail = () => {
  const [dataHarvest, setDataHarvest] = useState<HarvestModel>();

  const { state: harvestId } = useLocation();

  const navigate = useNavigate();

  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  useEffect(() => {
    GetHarvestDetailByIdAPI(harvestId).then((res: any) => {
      const harvest = parseHarvestData(res.data);
      setDataHarvest(harvest);
    });
  }, [harvestId]);

  const handleShowDrawerUpdate = () => {
    setIsOpenModalUpdate(true);
  };

  const handleCancelDrawerUpdate = () => {
    setIsOpenModalUpdate(false);
  };

  const checkHasProject = () => {
    if (dataHarvest?.projectId !== null) {
      setIsOpenModalUpdate(true);
    } else {
      Modal.warning({
        content:
          "You can't update this step because the project has not assigned yet.",
      });
    }
  };

  // handle for log list
  const [harvestLogList, setHarvestLogList] = useState<LogModel[]>([]);

  const [isCallGetLog, setCallGetLog] = useState(false);

  useEffect(() => {
    setHarvestLogList([]);

    const getHarvestLogList = async () => {
      const res: any = await HarvestServices.getHarvestLogListById(harvestId);

      if (res.status === 200) {
        res.data.map((element: any) => {
          const logModel = element.log as LogModel;
          setHarvestLogList((prev) => [...prev, logModel]);
        });
      }
    };

    getHarvestLogList();
  }, [harvestId, isCallGetLog]);

  return (
    <>
      {isOpenModalUpdate && (
        <DrawerEditHarvestor
          myProps={{
            dataHarvest: dataHarvest,
            showUpdate: handleShowDrawerUpdate,
            cancelCloseUpdate: handleCancelDrawerUpdate,
            setDataHarvest: setDataHarvest,
            setIsOpenModalUpdate: setIsOpenModalUpdate,
            setCallGetLog: setCallGetLog,
            isCallGetLog: isCallGetLog
          }}
        />
      )}
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-style">
              <Breadcrumb.Item>Harvest Management</Breadcrumb.Item>
              <Breadcrumb.Item>Harvest Project Detail</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Harvest Project Detail</div>
            <div className="sub-title-header">
              Display harvest project information, status and details of{" "}
              {dataHarvest?.projectCode}
            </div>
          </Col>
        </div>
        <div>
          {dataHarvest ? (
            <Col>
              <div className="content-page">
                <Col>
                  {checkVerifyBlockchainLog(harvestLogList) === true &&
                  dataHarvest.state === CommonProjectState.Completed ? (
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
                    <StateCard myProps={{ state: dataHarvest.state }} />
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
                      <span style={{ color: "#1B9C85", fontWeight: "700" }}>
                        {dataHarvest.projectCode}
                      </span>
                    </p>
                    <Row style={{ alignItems: 'center' }}>
                      <Button
                        type="default"
                        size="middle"
                        icon={<FileSearchOutlined style={{ fontSize: "18px" }} />}
                        onClick={() => {
                          navigate(`/project-log/${harvestId}`, {
                            state: {
                              listLog: harvestLogList,
                              type: LogEnum.Harvest,
                            },
                          });
                        }}
                        style={{ borderRadius: "4px", marginRight: "12px" }}
                      >
                        View Log
                      </Button>
                      {dataHarvest.state === CommonProjectState.Completed ||
                      dataHarvest.state === CommonProjectState.Canceled ? (
                        <></>
                      ) : (
                        <div>
                          <Button
                            type="primary"
                            icon={<FormOutlined />}
                            size="middle"
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
                          {dataHarvest.projectId}
                        </span>
                      </p>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Harvest ID: </span>
                        <span className="content-text">
                          {dataHarvest.harvestId}
                        </span>
                      </p>
                    </Row>
                  </div>
                  <div className="space-padding" />
                  <Col>
                    <p className="text-main-label">Harvestor</p>
                    <Row style={{ paddingTop: "8px" }}>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Email: </span>
                        <span className="content-text">
                          {dataHarvest.inspector?.email}
                        </span>
                      </p>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Full Name: </span>
                        <span className="content-text">
                          {dataHarvest.inspector?.lastName}{" "}
                          {dataHarvest.inspector?.firstName}
                        </span>
                      </p>
                    </Row>
                  </Col>
                </Col>
              </div>
              <div className="space-padding" />
              <div className="content-page">
                <Col>
                  <p className="text-main-label">Harvest Information</p>
                  <div className="space-padding" />
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Total Harvest (ton)",
                        content: dataHarvest.totalHarvest ?? "Not Updat",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Temperature (°C)",
                        content: dataHarvest.temperature ?? "Not Updat",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Ripeness (%)",
                        content: dataHarvest.ripeness ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Moisture",
                        content: dataHarvest.moisture ?? "Not Update",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Date Completed",
                        content:
                          dataHarvest.dateCompleted !== null
                            ? moment(dataHarvest.dateCompleted).format(
                                "DD/MM/YYYY"
                              )
                            : "Not update",
                        width: "100%",
                      }}
                    />
                  </Row>
                  <LabelContentItem
                    myProps={{
                      label: "Note",
                      content: dataHarvest.note ?? "Not Update",
                      width: "100%",
                    }}
                  />
                </Col>
              </div>
            </Col>
          ) : (
            <>
              <SpinApp />
            </>
          )}
        </div>
      </Col>
    </>
  );
};

export default HarvestDetail;
