import {
  GetProjectDetailByID,
  UpdateProjectState,
} from "@/api/system_admin/project_api";
import {
  CheckProjectStatus,
  StateComponent,
} from "@/pages/common/CheckProjectStatus";
import { ProjectDetailInterface } from "@/types/project_detail";
import { formatDateTime } from "@/utils/formatDateTime";
import { FormOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../common.scss";
import InfoHarvestModal from "../../../components/Modal/InfoHarvestModal";
import InfoProductionModal from "../../../components/Modal/InfoProductionModal";
import InfoTransportModal from "../../../components/Modal/InfoTransportModal";
import InfoWarehouseModal from "../../../components/Modal/InfoWarehouseModal";
import "./ProjectDetail.scss";
import { StateTag } from "@/components/Tag/StateTag";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import moment from "moment";
import { addTrackingBlock } from "@/api/node_api/blockchain_helper";
import { parseProjectData } from "@/utils/parseData";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

let disabled = true;

const ProjectDetail = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

  const [dataProject, setDataProject] = useState<ProjectDetailInterface>();

  const { state: projectId } = useLocation();

  // console.log("project ID", projectId);

  useEffect(() => {
    GetProjectDetailByID(projectId).then((res: any) => {
      const projectDetail = parseProjectData(res.data);

      setDataProject(projectDetail);
    });
  }, [projectId]);

  console.log(dataProject);

  const handleUpdateProjectState = async (projectId: string, state: number) => {
    const value = { state: state };

    disabled = true;
    setComponentDisabled(disabled);

    const res: any = await UpdateProjectState(value, projectId);

    console.log(res);

    const newInfoProject = parseProjectData(res.data.project);

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

  return (
    <Col>
      <div className="header-content">Project Detail</div>
      <div className="main-content">
        {dataProject ? (
          <Col>
            <p className="title"> Project Information </p>
            {dataProject.state === 1 ? (
              <div className="btn-update">
                <Button
                  type="primary"
                  icon={<FormOutlined />}
                  size="large"
                  onClick={() => {
                    disabled = false;
                    setComponentDisabled(disabled);
                  }}
                  disabled={!componentDisabled}
                >
                  Update
                </Button>
              </div>
            ) : (
              <StateTag myProp={dataProject.state}></StateTag>
            )}
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
                </Form.Item>
                {componentDisabled ? (
                  StateComponent(dataProject.state)
                ) : (
                  <Form.Item label="Update new State" name="newState">
                    <Row>
                      <Button
                        type="primary"
                        style={{
                          marginRight: "24px",
                          width: "100px",
                          borderRadius: "6px",
                        }}
                        danger
                        onClick={async () => {
                          disabled = true;
                          setComponentDisabled(disabled);
                          handleUpdateProjectState(dataProject?.projectId, 3);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{
                          width: "100px",
                          background: "#87d068",
                          borderColor: "#87d068",
                          color: "white",
                          borderRadius: "6px",
                        }}
                        onClick={async () => {
                          if (
                            dataProject.harvest.state === 1 ||
                            dataProject.transport.state === 1 ||
                            dataProject.warehouseStorage.state === 1 ||
                            dataProject.production.state === 1
                          ) {
                            errorMessage(
                              "Other steps have not been completed!"
                            );
                          } else {
                            disabled = true;
                            setComponentDisabled(disabled);
                            handleUpdateProjectState(dataProject.projectId, 2);
                          }
                        }}
                      >
                        Completed
                      </Button>
                    </Row>
                  </Form.Item>
                )}
              </Form>
              <div className="layout-btn-save">
                <Row>
                  <Button
                    className="btn-cancel"
                    type="primary"
                    // icon={<FormOutlined />}
                    onClick={() => {
                      disabled = true;
                      setComponentDisabled(disabled);
                    }}
                    hidden={disabled}
                    size={"large"}
                    style={{ marginRight: "12px" }}
                    danger
                  >
                    Cancel
                  </Button>
                  {/* <Button
                    className="btn-save"
                    type="primary"
                    // icon={<FormOutlined />}
                    onClick={() => {
                      disabled = true;
                      setComponentDisabled(disabled);
                    }}
                    hidden={disabled}
                    size={"large"}
                  >
                    Save
                  </Button> */}
                </Row>
              </div>
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
