import {
  GetProjectDetailByID,
  UpdateProjectState,
} from "@/api/system_admin/project_api";
import { CheckProjectStatus } from "@/pages/common/CheckProjectStatus";
import { CommonProjectState, ProjectDetailModel } from "@/types/project_model";
import { formatDateTime } from "@/utils/formatDateTime";
import { FileSearchOutlined, FormOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Steps,
  Tag,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../common.scss";
import InfoHarvestModal from "../../../components/Modal/InfoHarvestModal";
import InfoProductionModal from "../../../components/Modal/InfoProductionModal";
import InfoTransportModal from "../../../components/Modal/InfoTransportModal";
import InfoWarehouseModal from "../../../components/Modal/InfoWarehouseModal";
import "./ProjectDetail.scss";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import moment from "moment";
import { StateInfoProject } from "@/components/Tag/StateTag";
import { checkCurrentStepProject } from "@/utils/check_current_step";
import { FarmInfoModel, FarmProjectModel } from "@/types/farm_model";
import FarmManagementService from "@/api/admin_tech/farm_management_services";
import {
  modalUpdateContentLayout,
  tailContentLayout,
  tailUpdateContentLayout,
} from "@/styles/content_layout";
import FarmServices from "@/api/farm/farm_api";
import { ShowDrawerEdit } from "@/components/Drawer/DrawerEditItem";
import { UserDetailModel, parseUserDetail } from "@/types/user";
import StaffServices from "@/api/system_admin/staff_service";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

let disabled = true;

const ProjectDetail = () => {
  const navigate = useNavigate();

  const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

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

  const handleUpdateProjectState = async (projectId: string, state: number) => {
    const value = { state: state };

    disabled = true;
    setComponentDisabled(disabled);

    const res: any = await UpdateProjectState(value, projectId);

    const newInfoProject = res.data.project as ProjectDetailModel;

    if (res.status === 200) {
      state == 2
        ? successMessage("Project has been Completed")
        : successMessage("Project has been Canceled");

      setDataProject(newInfoProject);

      // addTrackingBlock("test", "testProject"); // test
    } else {
      errorMessage("Update Failed");
    }
  };

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

  // update project
  const [selectedFarmId, setSelectedFarmId] = useState<string>();

  const [listFarms, setListFarms] = useState<FarmInfoModel[]>([]);

  const handleOnChangeFarm = (newFarmId: string) => {
    setSelectedFarmId(newFarmId);
  };

  const [listFarmProjects, setListFarmProjects] = useState<FarmProjectModel[]>(
    []
  );

  useEffect(() => {
    FarmManagementService.getAllFarmService().then((res: any) => {
      if (res?.status == 200) {
        res.data.map((element: any) => {
          const farm = element as FarmInfoModel;
          setListFarms((prevFarm) => [...prevFarm, farm]);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (selectedFarmId !== undefined) {
      setListFarmProjects([]);
      FarmServices.getAllFarmProjectsService(selectedFarmId).then(
        (res: any) => {
          if (res?.status === 200) {
            res.data.map((element: any) => {
              const farm = element as FarmProjectModel;
              if (farm.projectId === null) {
                setListFarmProjects((prevFarmProject) => [
                  ...prevFarmProject,
                  farm,
                ]);
              }
            });
          }
        }
      );
    }
  }, [selectedFarmId]);

  // update status project
  const [listHavesters, setListHavesters] = useState<UserDetailModel[]>([]);

  const [listWarehouseInspectors, setListWarehouseInspectors] = useState<
    UserDetailModel[]
  >([]);

  const [listTransporters, setListTransporters] = useState<UserDetailModel[]>(
    []
  );

  const [listProduceInspectors, setListProduceInspectors] = useState<
    UserDetailModel[]
  >([]);

  const showEditProjectDrawer = () => {
    setOpenModalUpdate(true);
  };

  const closeEditProjectDrawer = () => {
    setOpenModalUpdate(false);
  };

  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);

  // get all staff department Harvester
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(2).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const harvester = parseUserDetail(element);
          setListHavesters((prev) => [...prev, harvester]);
        });
      }
    });
  }, []);

  // get all staff Transport Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(3).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const transporter = parseUserDetail(element);
          setListTransporters((prev) => [...prev, transporter]);
        });
      }
    });
  }, []);

  // get all staff Warehouse Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(4).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const warehouse = parseUserDetail(element);
          setListWarehouseInspectors((prev) => [...prev, warehouse]);
        });
      }
    });
  }, []);

  // get all staff Produce Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(5).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const produce = parseUserDetail(element);
          setListProduceInspectors((prev) => [...prev, produce]);
        });
      }
    });
  }, []);

  const listState = [
    CommonProjectState.Processing,
    CommonProjectState.Completed,
    CommonProjectState.Pending,
    CommonProjectState.Canceled,
  ];

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleOkUpdateSuccess = () => {
    setIsLoading(false);
  }

  const handleUpdateProject = async (value: any) => {
    setIsLoadingUpdate(true);

    if (dataProject !== undefined) {
      const result: any = await UpdateProjectState(
        value,
        dataProject?.projectId
      );

      if (result.status === 200) {    
        setIsLoading(true);

        setOpenModalUpdate(false);

        Modal.success({
          content: "Update project successfully!",
          onOk: handleOkUpdateSuccess
        });

        setDataProject(result.data.project);

        setIsLoadingUpdate(false); 
      }
    }
  };

  return (
    <>
      {isOpenModalUpdate && (
        <ShowDrawerEdit
          myProps={{
            title: "Edit Information of Project",
            onOpen: showEditProjectDrawer,
            onClose: closeEditProjectDrawer,
            content: (
              <Col>
                <Form
                  {...modalUpdateContentLayout}
                  onFinish={(value) => {
                    handleUpdateProject(value);
                  }}
                >
                  <Form.Item
                    label="Project Name"
                    name="projectName"
                    initialValue={dataProject?.projectName}
                  >
                    <Input />
                  </Form.Item>
                  {dataProject?.farmProject === null ? (
                    <Col>
                      <Form.Item label="Farm in Charge" name="farmId">
                        <Select
                          placeholder="Select farm in charge"
                          onChange={handleOnChangeFarm}
                        >
                          {listFarms.map((farm) => (
                            <Select.Option
                              value={farm.farmId}
                              key={farm.farmId}
                            >
                              <Tooltip
                                placement="right"
                                title={`${farm.farmName}` ?? "No name"}
                              >
                                {" "}
                                {farm.farmCode}
                              </Tooltip>
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Farm Project" name="farmProjectId">
                        <Select placeholder="Select farm project in charge">
                          {listFarmProjects.map((farmProject) => (
                            <Select.Option
                              value={farmProject.farmProjectId}
                              key={farmProject.farmProjectId}
                            >
                              {farmProject.farmProjectCode}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  ) : (
                    <></>
                  )}
                  <Form.Item
                    label="Havestor"
                    name="havestor"
                    initialValue={dataProject?.harvest.inspector?.email}
                  >
                    <Select placeholder="Select harvestor in Harvest Inspection">
                      {listHavesters.map((harvester) => (
                        <Select.Option
                          value={harvester.userId}
                          key={harvester.userId}
                        >
                          <Tooltip
                            placement="right"
                            title={
                              `${harvester.lastName} ${harvester.firstName}` ??
                              "No name"
                            }
                          >
                            {harvester.email}
                          </Tooltip>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Transport Inspector"
                    name="transportInspector"
                    initialValue={dataProject?.transport.inspector?.email}
                  >
                    <Select placeholder="Select Transport Inspector">
                      {listTransporters.map((transporter) => (
                        <Select.Option
                          value={transporter.userId}
                          key={transporter.userId}
                        >
                          <Tooltip
                            placement="right"
                            title={
                              `${transporter.lastName} ${transporter.firstName}` ??
                              "No name"
                            }
                          >
                            {transporter.email}
                          </Tooltip>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Warehouse Inspector"
                    name="warehouseInspector"
                    initialValue={dataProject?.warehouseStorage.inspector?.email}
                  >
                    <Select placeholder="Select Warehouse Inspector">
                      {listWarehouseInspectors.map((warehouse) => (
                        <Select.Option
                          value={warehouse.userId}
                          key={warehouse.userId}
                        >
                          <Tooltip
                            placement="right"
                            title={
                              `${warehouse.lastName} ${warehouse.firstName}` ??
                              "No name"
                            }
                          >
                            {warehouse.email}
                          </Tooltip>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item 
                    label="Produce Inspector" 
                    name="produceInspector"
                    initialValue={dataProject?.produce.inspector?.email}
                  >
                    <Select placeholder="Select Produce Inspector">
                      {listProduceInspectors.map((produce) => (
                        <Select.Option
                          value={produce.userId}
                          key={produce.userId}
                        >
                          <Tooltip
                            placement="right"
                            title={
                              `${produce.lastName} ${produce.firstName}` ??
                              "No name"
                            }
                          >
                            {produce.email}
                          </Tooltip>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="State"
                    name="state"
                    initialValue={dataProject?.state}
                  >
                    <Select
                      placeholder="Select new State"
                      // onChange={onChangeState}
                    >
                      {listState.map((state) => (
                        <Select.Option value={state} key={state}>
                          <span
                            style={{
                              color: `${parseColorByCommonState(state)}`,
                            }}
                          >
                            {parseToStringCommonState(state)}
                          </span>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item wrapperCol={tailUpdateContentLayout}>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      style={{ marginRight: "12px" }}
                      loading={isLoadingUpdate}
                    >
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            ),
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
        <div className="content-page">
          {dataProject && !isLoading ? (
            <Col>
              <Row
                style={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <p className="title">
                  Information of Project - {dataProject.projectName}{" "}
                </p>
                <div style={{ marginLeft: "12px" }}>
                  {StateInfoProject(dataProject.state)}
                </div>
              </Row>
              <div style={{ padding: "24px" }}>
                <Steps
                  current={currentStep}
                  labelPlacement="vertical"
                  items={stepsProject}
                ></Steps>
              </div>
              <Row className="row-btn-layout">
                <div>
                  <Button
                    type="default"
                    size="large"
                    icon={<FileSearchOutlined style={{ fontSize: "18px" }} />}
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
                  disabled={!componentDisabled}
                >
                  Update
                </Button>
              </Row>
              <div>
                <Form {...layout}>
                  <Form.Item
                    label="Project Id"
                    name="projectId"
                    initialValue={dataProject?.projectId}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                  <Form.Item
                    label="Project Code"
                    name="projectCode"
                    initialValue={dataProject?.projectCode}
                  >
                    <Input disabled={true} />
                  </Form.Item>

                  <Form.Item
                    label="Project Name"
                    name="projectName"
                    initialValue={dataProject?.projectName}
                  >
                    <Input disabled={true} />
                  </Form.Item>

                  <Form.Item
                    label="Manager"
                    name="manager"
                    initialValue={dataProject?.manager.email}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                  <Form.Item
                    label="Farm Project"
                    name="farmProject"
                    initialValue={
                      dataProject.farmProject == null
                        ? "No farm project yet"
                        : dataProject.farmProject.farmProjectCode
                    }
                  >
                    <Input disabled={true} />
                  </Form.Item>
                  <Form.Item
                    label="Date Created"
                    name="dateCreated"
                    initialValue={moment(dataProject?.dateCreated)}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                  <Form.Item
                    label="Date Completed"
                    name="dateCompleted"
                    initialValue={
                      dataProject?.dateCompleted
                        ? moment(dataProject?.dateCompleted)
                        : null
                    }
                  >
                    <Input disabled={true} />
                  </Form.Item>

                  <Form.Item label="Harvest Inspection" name="harvester">
                    <Row>
                      {CheckProjectStatus(dataProject?.harvest.state)}
                      <div>
                        <InfoHarvestModal myProp={dataProject?.harvest} />
                      </div>
                    </Row>
                  </Form.Item>
                  <Form.Item label="Transport Inspection" name="transport">
                    <Row>
                      {CheckProjectStatus(dataProject?.transport.state)}
                      <div>
                        <InfoTransportModal myProp={dataProject?.transport} />
                      </div>
                    </Row>
                  </Form.Item>
                  <Form.Item
                    label="Warehouse Inspection"
                    name="warehouseStorage"
                  >
                    <Row>
                      {CheckProjectStatus(dataProject?.warehouseStorage.state)}
                      <div>
                        <InfoWarehouseModal
                          myProp={dataProject?.warehouseStorage}
                        />
                      </div>
                    </Row>
                  </Form.Item>
                  <Form.Item label="Supervising Producer" name="produce">
                    <Row>
                      {CheckProjectStatus(dataProject?.produce.state)}
                      <div>
                        <InfoProductionModal myProp={dataProject?.produce} />
                      </div>
                    </Row>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          ) : (
            <>
              <Spin tip="Loading" size="large">
                <div className="content-page" />
              </Spin>
            </>
          )}
        </div>
      </Col>
    </>
  );
};

export default ProjectDetail;
