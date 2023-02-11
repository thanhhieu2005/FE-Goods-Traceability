import {
  GetProjectDetailByID,
  UpdateProjectState,
} from "@/api/system_admin/project_api";
import {
  CheckProjectStatus,
  StateComponent,
} from "@/pages/common/CheckProjectStatus";
import { ProjectDetailInterface } from "@/types/project_detail";
import {
  Harvest,
  Production,
  Transport,
  WarehouseStorage,
} from "@/types/step_tracking";
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
import {StateTag} from "@/components/Tag/StateTag";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";

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
      res?.data.map((element: any) => {
        var projectDetail = {} as ProjectDetailInterface;
        var harvest = {} as Harvest;
        var transport = {} as Transport;
        var warehouseStorage = {} as WarehouseStorage;
        var production = {} as Production;

        // mapping data to harvest interface
        harvest.key = element.harvest._id;
        harvest.projectId = element.harvest.projectId;
        harvest.harvestId = element.harvest._id;
        harvest.totalHarvest = element.harvest?.totalHarvest;
        harvest.ripeness = element.harvest?.ripeness;
        harvest.state = element.harvest.state;
        harvest.moisture = element.harvest?.moisture;
        harvest.dateCompleted = element.harvest?.dateCompleted;
        harvest.inspector =
          element.harvest?.inspector.lastName +
          " " +
          element.harvest?.inspector.firstName;

        // mapping data to transport interface
        transport.key = element.shipping._id;
        transport.projectId = element.shipping.projectId;
        transport.transportId = element.shipping._id;
        transport.totalInput = element.shipping?.totalInput;
        transport.transportName = element.shipping?.transport;
        transport.vehicleType = element.shipping?.vihicleType;
        transport.numberOfVehicle = element.shipping?.numberOfVehicle;
        transport.dateExpected = element.shipping?.dateExpected;
        transport.dateCompleted = element.shipping?.dateCompleted;
        transport.state = element.shipping?.state;
        transport.inspector =
          element.shipping?.inspector.lastName +
          " " +
          element.shipping?.inspector.firstName;

        // mapping data to Warehouse Storage interface
        warehouseStorage.key = element.warehouseStorage._id;
        warehouseStorage.projectId = element.warehouseStorage.projectId;
        warehouseStorage.warehouseStorageId = element.warehouseStorage._id;
        warehouseStorage.totalInput = element.warehouseStorage?.totalInput;
        warehouseStorage.totalExport = element.warehouseStorage?.totalExport;
        warehouseStorage.inputDate = element.warehouseStorage?.inputDate;
        warehouseStorage.outputDate = element.warehouseStorage?.outputDate;
        warehouseStorage.inspector =
          element.warehouseStorage?.inspector.lastName +
          " " +
          element.warehouseStorage?.inspector.firstName;
        warehouseStorage.state = element.warehouseStorage.state;
        warehouseStorage.warehouseName =
          element.warehouseStorage?.warehouseStorage;

        // mapping data to Production interface
        production.key = element.produce._id;
        production.productionId = element.produce._id;
        production.projectId = element.produce.projectId;
        production.totalInput = element.produce?.totalInput;
        production.factoryName = element.produce?.factory;
        production.totalProduct = element.produce?.totalProduct;
        production.humidity = element.produce?.humidity;
        production.dryingTemperature = element.produce?.dryingTemperature;
        production.dateCompleted = element.produce?.dateCompleted;
        production.expiredDate = element.produce?.expiredDate;
        production.inspector = warehouseStorage.inspector =
          element.produce?.inspector.lastName +
          " " +
          element.produce?.inspector.firstName;
        production.state = element.produce?.state;

        // mapping data to project detail interface
        projectDetail.key = element._id;
        projectDetail.projectId = element.projectId;
        projectDetail.projectName = element.projectName;
        projectDetail.projectCode = element.projectCode;
        projectDetail.state = element.state;
        projectDetail.dateCreated = element.dateCreated;
        projectDetail.dateCompleted = element?.dateCompleted;
        projectDetail.manager =
          element.manager.lastName + " " + element.manager.firstName;
        projectDetail.harvest = harvest;
        projectDetail.transport = transport;
        projectDetail.warehouseStorage = warehouseStorage;
        projectDetail.production = production;
        setDataProject(projectDetail);
      });
    });
  }, [projectId]);

  console.log(dataProject);

  const handleUpdateProjectState = async (projectId: string, state: number) => {
    const value = { state: state };
    const res: any = await UpdateProjectState(value, projectId);

    if (res?.status === 200) {
      return 200;
    }
    return 400;
  };

  return (
    <Col>
      <div className="header-content">Project Detail</div>
      <div className="content">
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
            <div className="main-content">
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
                  <Input disabled={componentDisabled} />
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
                  initialValue={formatDateTime(dataProject?.dateCreated)}
                >
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  label="Date Completed"
                  name="dateCompleted"
                  initialValue={
                    dataProject?.dateCompleted
                      ? formatDateTime(dataProject?.dateCompleted)
                      : "Pending"
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
                  StateComponent(dataProject?.state)
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
                          const res = await handleUpdateProjectState(
                            dataProject?.projectId,
                            3
                          );

                          if (res === 200) {
                            successMessage("Prject has been Canceled");
                          } else {
                            errorMessage("Update Failed");
                          }
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
                            dataProject.harvest.state == 1 ||
                            dataProject.transport.state == 1 ||
                            dataProject.warehouseStorage.state == 1 ||
                            dataProject.production.state == 1
                          ) {
                            errorMessage(
                              "Other steps have not been completed!"
                            );
                          } else {
                            disabled = true;
                            setComponentDisabled(disabled);
                            const res = await handleUpdateProjectState(
                              dataProject?.projectId,
                              2
                            );

                            if (res === 200) {
                              successMessage("Prject has been Completed");
                            } else {
                              errorMessage("Update Failed");
                            }
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
                  <Button
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
                  </Button>
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
