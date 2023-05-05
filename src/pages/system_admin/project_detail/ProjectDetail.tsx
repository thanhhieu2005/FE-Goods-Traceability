import {
  GetProjectDetailByID,
  UpdateProjectState,
} from "@/api/system_admin/project_api";
import { CheckProjectStatus } from "@/pages/common/CheckProjectStatus";
import {  ProjectDetailModel } from "@/types/project_model";
import { formatDateTime } from "@/utils/formatDateTime";
import { FileSearchOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Form, Input, Row, Steps, Tag } from "antd";
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
      title: 'Farm',
    },
    {
      title: 'Harvest',
    },
    {
      title: 'Transport',
    },
    {
      title: 'Import/ Export Warehouse',
    },
    {
      title: 'Production',
    }
  ]

  return (
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
        {dataProject ? (
          <Col>
            <Row style={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}>
              <p className="title">
                Information of Project - {dataProject.projectName}{" "}
              </p>
              <div style={{marginLeft: '12px'}}>{StateInfoProject(dataProject.state)}</div>
            </Row>
            <div style={{padding: '24px'}}>
              <Steps current={currentStep} labelPlacement="vertical" items={stepsProject}></Steps>
            </div>
            <Row className="row-btn-layout">
              {dataProject.state === 1 ? (
                <div>
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    size="large"
                    onClick={() => {
                      // disabled = false;
                      // setComponentDisabled(disabled);
                    }}
                    disabled={!componentDisabled}
                    style={{ marginRight: "24px" }}
                  >
                    Update
                  </Button>
                </div>
              ) : (
                // <StateTag myProp={dataProject.state}></StateTag>
                <div>
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    size="large"
                    onClick={() => {
                      // disabled = false;
                      // setComponentDisabled(disabled);
                    }}
                    disabled={!componentDisabled}
                    style={{ marginRight: "24px" }}
                  >
                    Update
                  </Button>
                </div>
              )}
              <div>
                <Button
                  type="default"
                  size="large"
                  icon={<FileSearchOutlined style={{ fontSize: "18px" }} />}
                  onClick={() => {
                    navigate("/project-log");
                  }}
                >
                  View Log
                </Button>
              </div>
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
                  initialValue={dataProject?.manager}
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

                {/* <Form.Item label="Harvest Inspection" name="harvester">
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
                <Form.Item label="Warehouse Inspection" name="warehouseStorage">
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
                    {CheckProjectStatus(dataProject?.production.state)}
                    <div>
                      <InfoProductionModal myProp={dataProject?.production} />
                    </div>
                  </Row>
                </Form.Item> */}
              </Form>
            </div>
          </Col>
        ) : (
          <></>
        )}
      </div>
    </Col>
  );
};

export default ProjectDetail;
