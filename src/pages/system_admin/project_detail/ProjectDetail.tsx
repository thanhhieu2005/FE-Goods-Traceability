import FarmManagementService from "@/api/admin_tech/farm_management_services";
import ProjectServices, {
  GetProjectDetailByID,
  UpdateProjectInfo,
} from "@/api/system_admin/project_api";
import FarmProjectInfoCard from "@/components/Card/FarmProjectInfoCard";
import HarvestInfoCard from "@/components/Card/HarvestInfoCard";
import ProduceInfoCard from "@/components/Card/ProduceInfoCard";
import TransportInfoCard from "@/components/Card/TransportInfoCard";
import WarehouseStorageInfoCard from "@/components/Card/WarehouseStorageInfoCard";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import SpinApp from "@/components/Spin/SpinApp";
import StateCard from "@/components/Tag/StateCard";
import { FarmInfoModel } from "@/types/farm_model";
import { LogEnum, LogModel } from "@/types/project_log_model";
import { CommonProjectState, ProjectDetailModel } from "@/types/project_model";
import { greyBlurColor, mainColor } from "@/utils/app_color";
import { checkCurrentStepProject } from "@/utils/check_current_step";
import {
  FileSearchOutlined,
  FormOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Col, Empty, Row, Steps } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../common.scss";
import EditProject from "./EditProject";
import "./ProjectDetail.scss";
import { checkVerifyBlockchainLog } from "@/utils/check_verify_log";
import { logoVerify } from "@/assets";

const ProjectDetail = () => {
  const navigate = useNavigate();

  const [dataProject, setDataProject] = useState<ProjectDetailModel>();

  const { state: projectId } = useLocation();

  const [currentStep, setCurrentStep] = useState(0);

  // Logs of Project

  const [projectLogList, setProjectLogList] = useState<LogModel[]>([]);

  const [harvestLogList, setHarvestLogList] = useState<LogModel[]>([]);

  const [transportLogList, setTransportLogList] = useState<LogModel[]>([]);

  const [warehouseStorageLogList, setWarehouseStorageLogList] = useState<
    LogModel[]
  >([]);

  const [produceLogList, setProduceLogList] = useState<LogModel[]>([]);

  useEffect(() => {
    GetProjectDetailByID(projectId).then((res: any) => {
      const projectDetail = res.data as ProjectDetailModel;

      console.log(res.data);

      setDataProject(projectDetail);

      const currentStep = checkCurrentStepProject(projectDetail);

      setCurrentStep(currentStep);
    });

    const getProjectLogsById = async () => {
      const res: any = await ProjectServices.getProjectLogList(projectId);

      // setProjectLogList(res.data.projectLogList);
      if (res.status === 200) {
        res.data.projectLogList.map((element: any) => {
          const logModel = element.projectLog as LogModel;
          setProjectLogList((prev) => [...prev, logModel]);
        });

        res.data.harvestLogList.map((element: any) => {
          const harvestLogModel = element.log as LogModel;
          setHarvestLogList((prev) => [...prev, harvestLogModel]);
        });

        res.data.transportLogList.map((element: any) => {
          const transportLogList = element.log as LogModel;
          setTransportLogList((prev) => [...prev, transportLogList]);
        });

        res.data.warehouseStorageLogList.map((element: any) => {
          const warehouseLogList = element.log as LogModel;
          setWarehouseStorageLogList((prev) => [...prev, warehouseLogList]);
        });

        res.data.produceLogList.map((element: any) => {
          const produceLog = element.log as LogModel;
          setProduceLogList((prev) => [...prev, produceLog]);
        });
      }
    };

    getProjectLogsById();
  }, [projectId]);

  const [farm, setFarm] = useState<FarmInfoModel>();

  console.log(harvestLogList);

  useEffect(() => {
    const fetchAPIFarm = async () => {
      try {
        if (dataProject !== null && dataProject?.farmProject !== null) {
          const res: any = await FarmManagementService.getFarmDetailService(
            dataProject?.farmProject?.farmId ?? ""
          );

          if (res.status === 200) {
            setFarm(res.data);
          }
        }
      } catch (err) {
        return err;
      }
    };

    fetchAPIFarm();
  }, [dataProject]);

  // Steps project
  const stepsProject = [
    {
      title: "Farm",
    },
    {
      title: "Harvest",
    },
    {
      title: "Transport",
    },
    {
      title: "Import/ Export Warehouse",
    },
    {
      title: "Production",
    },
    {
      title: "Complete Project",
    },
  ];

  const showEditProjectDrawer = () => {
    setOpenModalUpdate(true);
  };

  const closeEditProjectDrawer = () => {
    setOpenModalUpdate(false);
  };

  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const onUpdateInfoProject = async (value: any) => {
    console.log(value);

    const res: any = await UpdateProjectInfo(value, projectId);

    if (res.status === 200) {

      setDataProject(res.data.project);

      setOpenModalUpdate(false);

      successMessage("Update Successfully!");
    } else {
      errorMessage("Update Failed!");
    }
  };

  return (
    <>
      {isOpenModalUpdate && (
        <EditProject
          myProps={{
            dataProject: dataProject,
            showEditProjectDrawer: showEditProjectDrawer,
            closeEditProjectDrawer: closeEditProjectDrawer,
            isLoadingUpdate: isLoadingUpdate,
            handleUpdateInfoProject: onUpdateInfoProject,
          }}
        />
      )}
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-style">
              <Breadcrumb.Item>Project Management</Breadcrumb.Item>
              <Breadcrumb.Item>Project Detail</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Project Detail</div>
            <div className="sub-title-header">
              Display project information, status and details of{" "}
              {dataProject?.projectName}
            </div>
          </Col>
        </div>
        <div>
          {dataProject && !isLoading ? (
            <Col>
              <div className="content-page">
                <Col>
                  <Row style={{ margin: "12px 0px", display: 'flex', alignItems: 'center' }}>
                    <StateCard myProps={{ state: dataProject.state }} />
                    {checkVerifyBlockchainLog(projectLogList) === true &&
                    dataProject.state === CommonProjectState.Completed ? (
                      <img src={logoVerify} height={144} />
                    ) : (
                      <></>
                    )}
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  >
                    <p className="text-main-label">
                      Project:{" "}
                      <span style={{ color: mainColor, fontWeight: "700" }}>
                        {dataProject.projectName}
                      </span>
                    </p>
                    <Row className="row-btn-layout">
                      <div>
                        <Button
                          type="default"
                          size="large"
                          icon={
                            <ShoppingCartOutlined
                              style={{ fontSize: "18px" }}
                            />
                          }
                          onClick={() => {
                            navigate(
                              `/project/product/${dataProject.projectId}`,
                              { state: dataProject.projectId }
                            );
                          }}
                          style={{ marginRight: "16px", borderRadius: "4px" }}
                        >
                          View Products
                        </Button>
                      </div>
                      <div>
                        <Button
                          type="default"
                          size="large"
                          icon={
                            <FileSearchOutlined style={{ fontSize: "18px" }} />
                          }
                          onClick={() => {
                            navigate(`/project-log/${projectId}`, {
                              state: {
                                listLog: projectLogList,
                                type: LogEnum.Project,
                              },
                            });
                          }}
                          style={{ marginRight: "16px", borderRadius: "4px" }}
                        >
                          View Log
                        </Button>
                      </div>
                      {dataProject.state === CommonProjectState.Completed ||
                      dataProject.state === CommonProjectState.Canceled ? (
                        <></>
                      ) : (
                        <Button
                          type="primary"
                          icon={<FormOutlined />}
                          size="large"
                          style={{ borderRadius: "4px" }}
                          onClick={() => {
                            // disabled = false;
                            // setComponentDisabled(disabled);
                            setOpenModalUpdate(true);
                          }}
                          // disabled={!componentDisabled}
                        >
                          Update
                        </Button>
                      )}
                    </Row>
                  </Row>
                  <div style={{ padding: "24px" }}>
                    <Steps
                      current={currentStep}
                      labelPlacement="vertical"
                      items={stepsProject}
                    ></Steps>
                  </div>
                  <div>
                    <p>
                      <span className="sub-text">Date Created: </span>
                      <span className="content-sub-text">
                        {moment(dataProject.dateCreated).format("DD/MM/YYYY")}
                      </span>
                    </p>
                  </div>
                  <div style={{ marginTop: "24px" }}>
                    <Row
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <p
                          className="title-text"
                          style={{ padding: "0", margin: "0" }}
                        >
                          Project ID:
                        </p>
                        <div style={{ padding: "4px" }}></div>
                        <div className="outlined-border-box">
                          <p>{dataProject.projectId}</p>
                        </div>
                      </Row>
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <p
                          className="title-text"
                          style={{ padding: "0", margin: "0" }}
                        >
                          Project Code:
                        </p>
                        <div style={{ padding: "4px" }}></div>
                        <div className="outlined-border-box">
                          <p>{dataProject.projectCode}</p>
                        </div>
                      </Row>
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <p
                          className="title-text"
                          style={{ padding: "0", margin: "0" }}
                        >
                          Project Name:
                        </p>
                        <div style={{ padding: "4px" }}></div>
                        <div className="outlined-border-box">
                          <p>{dataProject.projectName}</p>
                        </div>
                      </Row>
                    </Row>
                  </div>
                  <div className="divided" />
                  {/* Project Manager */}
                  <div>
                    <Col>
                      <p
                        className="text-main-label"
                        style={{ fontWeight: 500 }}
                      >
                        Project Manager
                      </p>
                      <div style={{ padding: "12px" }} />
                      <Row style={{ display: "flex", paddingBottom: "12px" }}>
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "50%",
                          }}
                        >
                          <p className="title-text">ID: </p>
                          <div style={{ padding: "4px" }}></div>
                          <p className="content-text">
                            {dataProject.manager.userId}
                          </p>
                        </Row>
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "50%",
                          }}
                        >
                          <p className="title-text">Wallet ID: </p>
                          <div style={{ padding: "4px" }}></div>
                          <p className="content-text">
                            {dataProject.manager.walletAddress}
                          </p>
                        </Row>
                      </Row>
                      <Row style={{ display: "flex", paddingBottom: "12px" }}>
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "50%",
                          }}
                        >
                          <p className="title-text">Email: </p>
                          <div style={{ padding: "4px" }}></div>
                          <p className="content-text">
                            {dataProject.manager.email}
                          </p>
                        </Row>
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "25%",
                          }}
                        >
                          <p className="title-text">First Name: </p>
                          <div style={{ padding: "4px" }}></div>
                          <p className="content-text">
                            {dataProject.manager.firstName}
                          </p>
                        </Row>
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "25%",
                          }}
                        >
                          <p className="title-text">Last Name: </p>
                          <div style={{ padding: "4px" }}></div>
                          <p className="content-text">
                            {dataProject.manager.lastName}
                          </p>
                        </Row>
                      </Row>
                    </Col>
                  </div>
                </Col>
              </div>
              <div style={{ padding: "12px" }} />
              <div className="content-page">
                {dataProject.farmProject !== null ? (
                  <FarmProjectInfoCard
                    myProps={{
                      farm: farm,
                      dataProject: dataProject,
                    }}
                  />
                ) : (
                  <>
                    <Col>
                      <div>
                        <div className="text-main-label">
                          <p>
                            <span>Farm Undertakes: </span>
                            <span
                              className="common-border-tag"
                              style={{ color: greyBlurColor, fontSize: "20px" }}
                            >
                              Not Assigned Yet
                            </span>
                          </p>
                        </div>
                      </div>
                      <Empty />
                    </Col>
                  </>
                )}
              </div>
              <div className="space-padding" />
              <Row
                gutter={16}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Col style={{ display: "flex" }} span={12}>
                  <HarvestInfoCard
                    myProps={{
                      dataHarvest: dataProject.harvest,
                      harvestLogList: harvestLogList,
                      isDone: checkVerifyBlockchainLog(harvestLogList),
                    }}
                  />
                </Col>
                <Col style={{ display: "flex" }} span={12}>
                  <TransportInfoCard
                    myProps={{
                      dataTransport: dataProject.transport,
                      transportLogList: transportLogList,
                      isDone: checkVerifyBlockchainLog(transportLogList),
                    }}
                  />
                </Col>
              </Row>
              <div className="space-padding" />
              <Row
                gutter={16}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Col style={{ display: "flex" }} span={12}>
                  <WarehouseStorageInfoCard
                    myProps={{
                      dataWarehouseStorage: dataProject.warehouseStorage,
                      warehouseStorageLogList: warehouseStorageLogList,
                      isDone: checkVerifyBlockchainLog(warehouseStorageLogList),
                    }}
                  />
                </Col>
                <Col style={{ display: "flex" }} span={12}>
                  <ProduceInfoCard
                    myProps={{
                      dataProduce: dataProject.produce,
                      produceLogList: produceLogList,
                      isDone: checkVerifyBlockchainLog(produceLogList),
                    }}
                  />
                </Col>
              </Row>
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

export default ProjectDetail;
