import { GetProjectDetailByID } from "@/api/system_admin/project_api";
import { StateInfoProject } from "@/components/Tag/StateTag";
import { CheckProjectStatus } from "@/pages/common/CheckProjectStatus";
import { ProjectDetailModel } from "@/types/project_model";
import { checkCurrentStepProject } from "@/utils/check_current_step";
import { FileSearchOutlined, FormOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Spin,
  Steps,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoHarvestModal from "../../../components/Modal/InfoHarvestModal";
import InfoProductionModal from "../../../components/Modal/InfoProductionModal";
import InfoTransportModal from "../../../components/Modal/InfoTransportModal";
import InfoWarehouseModal from "../../../components/Modal/InfoWarehouseModal";
import "../../common.scss";
import EditProject from "./EditProject";
import "./ProjectDetail.scss";
import StateCard from "@/components/Tag/StateCard";
import { greyBlurColor, mainColor, seedMainColor } from "@/utils/app_color";
import { FarmInfoModel, FarmProjectModel } from "@/types/farm_model";
import { UserDetailModel } from "@/types/user";
import UserServices from "@/api/user_api";
import FarmManagementService from "@/api/admin_tech/farm_management_services";
import LabelContentItem from "@/components/Label/LabelContentItem";
import HarvestInfoCard from "@/components/Card/HarvestInfoCard";
import TransportInfoCard from "@/components/Card/TransportInfoCard";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

// let disabled = true;

const ProjectDetail = () => {
  const navigate = useNavigate();

  const [formUpdate] = Form.useForm();

  // const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

  const [dataProject, setDataProject] = useState<ProjectDetailModel>();

  const { state: projectId } = useLocation();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    GetProjectDetailByID(projectId).then((res: any) => {
      const projectDetail = res.data as ProjectDetailModel;

      setDataProject(projectDetail);

      const currentStep = checkCurrentStepProject(projectDetail);

      setCurrentStep(currentStep);
    });
  }, [projectId]);

  console.log(dataProject);

  const [farm, setFarm] = useState<FarmInfoModel>();

  useEffect(() => {
    const fetchAPIFarm = async () => {
      try {
        if (dataProject !== null && dataProject?.farmProject !== null) {
          const res: any = await FarmManagementService.getFarmDetailService(
            dataProject?.farmProject?.farmId ?? ""
          );

          console.log(res);
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
  ];

  const showEditProjectDrawer = () => {
    setOpenModalUpdate(true);
  };

  const closeEditProjectDrawer = () => {
    formUpdate.resetFields();
    setOpenModalUpdate(false);
  };

  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  return (
    <>
      {/* {isOpenModalUpdate && (
        <EditProject
          myProps={{
            dataProject: dataProject,
            showEditProjectDrawer: showEditProjectDrawer,
            closeEditProjectDrawer: closeEditProjectDrawer,
            handleUpdateProject: handleUpdateProject,
            isLoadingUpdate: isLoadingUpdate,
            formUpdate: formUpdate,
          }}
        />
      )} */}
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
                  <div style={{ margin: "12px 0px" }}>
                    <StateCard myProps={{ state: dataProject.state }} />
                  </div>
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
                            <FileSearchOutlined style={{ fontSize: "18px" }} />
                          }
                          onClick={() => {
                            navigate("/project-log");
                          }}
                          style={{ marginRight: "16px" }}
                        >
                          View Log
                        </Button>
                      </div>
                      <Button
                        type="primary"
                        icon={<FormOutlined />}
                        size="large"
                        onClick={() => {
                          // disabled = false;
                          // setComponentDisabled(disabled);
                          setOpenModalUpdate(true);
                        }}
                        // disabled={!componentDisabled}
                      >
                        Update
                      </Button>
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
                  <Col>
                    <div style={{ paddingBottom: "24px" }}>
                      <div className="text-main-label">
                        <p>
                          <span>Farm Undertakes: </span>
                          <span
                            className="common-border-tag"
                            style={{ color: mainColor, fontSize: "20px" }}
                          >
                            {farm?.farmName}
                          </span>
                        </p>
                      </div>
                      <div style={{ padding: "12px" }} />
                      <Col>
                        <LabelContentItem
                          myProps={{
                            label: "Farm Owner",
                            content: farm?.farmOwner?.email,
                          }}
                        />
                        <div style={{ padding: "8px" }} />
                        <Row style={{ display: "flex", paddingBottom: "8px" }}>
                          <LabelContentItem
                            myProps={{
                              label: "Farm ID",
                              content: farm?.farmId,
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Farm Name",
                              content: farm?.farmName,
                            }}
                          />
                        </Row>
                        <Row style={{ display: "flex", paddingBottom: "8px" }}>
                          <LabelContentItem
                            myProps={{
                              label: "Farm Address",
                              content: farm?.farmAddress,
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Phone Number",
                              content: farm?.farmPhoneNumber,
                            }}
                          />
                        </Row>
                      </Col>
                    </div>
                    <div className="text-main-label">
                      <p>
                        <span>Farm Project: </span>
                        <span style={{ color: "#ABC4AA" }}>
                          {dataProject.farmProject.farmProjectCode}
                        </span>
                      </p>
                      <div>
                        <p>
                          <span className="sub-text">Date Created: </span>
                          <span className="content-sub-text">
                            {moment(dataProject.farmProject.dateCreated).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                        </p>
                      </div>
                      <div style={{ padding: "8px" }} />
                      {/* Information of Farm Project */}
                      <div>
                        <LabelContentItem
                          myProps={{
                            label: "Farmer in charge",
                            content:
                              dataProject.farmProject.farmer.email ??
                              "Not assigned yet",
                          }}
                        />
                      </div>
                      <div style={{ padding: "8px" }} />
                      <Col>
                        <Row style={{ display: "flex", paddingBottom: "8px" }}>
                          <LabelContentItem
                            myProps={{
                              label: "Total Harvests (ton)",
                              content:
                                dataProject.farmProject.totalHarvest ??
                                "Not update",
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Total Seeds (ton)",
                              content:
                                dataProject.farmProject.totalSeeds ??
                                "Not update",
                            }}
                          />
                        </Row>
                        <Row style={{ display: "flex", paddingBottom: "8px" }}>
                          <LabelContentItem
                            myProps={{
                              label: "Fertilizer Used",
                              content:
                                dataProject.farmProject.fertilizerUsed ??
                                "Not update",
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Total Fertilizers (ton)",
                              content:
                                dataProject.farmProject.totalFertilizers ??
                                "Not update",
                            }}
                          />
                        </Row>
                        <Row style={{ display: "flex", paddingBottom: "8px" }}>
                          <LabelContentItem
                            myProps={{
                              label: "Date Harvested",
                              content:
                                dataProject.farmProject.dateHarvested !== null
                                  ? moment(
                                      dataProject.farmProject.dateHarvested
                                    ).format("DD/MM/YYYY")
                                  : "Not update",
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Ripeness (%)",
                              content:
                                dataProject.farmProject.ripeness ??
                                "Not update",
                            }}
                          />
                        </Row>
                        <Row style={{ display: "flex", paddingBottom: "8px" }}>
                          <LabelContentItem
                            myProps={{
                              label: "Pesticides",
                              content:
                                dataProject.farmProject.pesticide ??
                                "Not update",
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Plant Density (/ha)",
                              content:
                                dataProject.farmProject.plantDensity ??
                                "Not update",
                            }}
                          />
                        </Row>
                      </Col>
                      <div>
                        <LabelContentItem
                          myProps={{
                            label: "Note",
                            content:
                              dataProject.farmProject.note ?? "Not update",
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-padding" />
                    <Row>
                      <div
                        className="common-border-tag"
                        style={{
                          width: "49%",
                          padding: "24px",
                          color: greyBlurColor,
                        }}
                      >
                        <Col>
                          <div
                            className="text-main-label"
                            style={{ color: "#ABC4AA" }}
                          >
                            <p>Land Information</p>
                          </div>
                          <div className="space-padding" />
                          <LabelContentItem
                            myProps={{
                              label: "Land Name",
                              content:
                                dataProject.farmProject.land.landName ??
                                "Not update",
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Land Area (m2)",
                              content:
                                dataProject.farmProject.land.landArea ??
                                "Not update",
                            }}
                          />
                        </Col>
                      </div>
                      <div style={{ width: "2%" }} />
                      <div
                        className="common-border-tag"
                        style={{
                          width: "49%",
                          padding: "24px",
                          color: greyBlurColor,
                        }}
                      >
                        <Col>
                          <div
                            className="text-main-label"
                            style={{ color: seedMainColor }}
                          >
                            <p>Seed Information</p>
                          </div>
                          <div className="space-padding" />
                          <LabelContentItem
                            myProps={{
                              label: "Seed Name",
                              content:
                                dataProject.farmProject.seed.seedName ??
                                "Not update",
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Seed Family",
                              content:
                                dataProject.farmProject.seed.seedFamily ??
                                "Not update",
                            }}
                          />
                        </Col>
                      </div>
                    </Row>
                  </Col>
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
                    myProps={{ dataHarvest: dataProject.harvest }}
                  />
                </Col>
                <Col style={{ display: "flex" }} span={12}>
                  <TransportInfoCard
                    myProps={{ dataTransport: dataProject.transport }}
                  />
                </Col>
              </Row>
              <div className="space-padding" />
              <Row
                gutter={16}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Col style={{ display: "flex" }} span={12}>
                  <HarvestInfoCard
                    myProps={{ dataHarvest: dataProject.harvest }}
                  />
                </Col>
                <Col style={{ display: "flex" }} span={12}>
                  <TransportInfoCard
                    myProps={{ dataTransport: dataProject.transport }}
                  />
                </Col>
              </Row>
            </Col>
          ) : (
            <>
              <Spin tip="Loading" size="large">
                <div className="content-page" style={{ padding: "64px" }} />
              </Spin>
            </>
          )}
        </div>
      </Col>
    </>
  );
};

export default ProjectDetail;
