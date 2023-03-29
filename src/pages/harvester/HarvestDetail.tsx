import { FormOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Form, Input, Row } from "antd";
import "../common.scss";
import { useLocation } from "react-router-dom";
import { formatDateTime } from "@/utils/formatDateTime";
import { StateComponent } from "@/pages/common/CheckProjectStatus";
import { StateTagStep } from "@/components/Tag/StateTag";
import {
  GetHarvestDetailByIdAPI,
  UpdateHarvestAPI,
} from "@/api/harvest/harvest_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { Harvest } from "@/types/step_tracking";
import { parseHarvestData } from "@/utils/models/parseData";
import {
  addTrackingBlock,
  getTrackingBlock,
} from "@/api/node_api/blockchain_helper";
import moment from "moment";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

let disabled = true;

const HarvestDetail = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

  const [dataHarvest, setDataHarvest] = useState<Harvest>();

  const { state: harvestId } = useLocation();

  useEffect(() => {
    GetHarvestDetailByIdAPI(harvestId).then((res: any) => {
      console.log("bb", res);
      const harvest = parseHarvestData(res.data);

      setDataHarvest(harvest);
    });
  }, []);

  const handleUpdateHarvestState = async (harvestId: string, state: number) => {
    const valueState = { state: state };

    const res: any = await UpdateHarvestAPI(valueState, harvestId);

    return res;
  };

  const checkCanbeCompleted = (harvest: Harvest) => {
    if (
      harvest.totalHarvest === 0 ||
      harvest.ripeness === 0 ||
      harvest.moisture === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitForm = async (value: any, harvestId: string) => {
    const finalValue = { ...value };

    console.log(finalValue);

    const result: any = await UpdateHarvestAPI(finalValue, harvestId);

    if (result.status === 200) {
      const newHarvest: Harvest = parseHarvestData(result.data.harvestPop);

      setDataHarvest(newHarvest);

      successMessage("Update new information successfully!");
    } else {
      errorMessage("Update new information failed!");
    }
  };

  return (
    <Col>
      <div className="header-content">Harvest Detail</div>
      <div className="main-content">
        {dataHarvest ? (
          <Col>
            <p className="title">Harvest Information</p>
            {dataHarvest.state === 1 ? (
              <div className="btn-update">
                <Button
                  type="primary"
                  icon={<FormOutlined />}
                  onClick={() => {
                    disabled = false;
                    setComponentDisabled(disabled);
                  }}
                >
                  Update
                </Button>
              </div>
            ) : (
              <StateTagStep myProp={dataHarvest.state}></StateTagStep>
            )}
            <div className="main-content">
              <Form {...layout} disabled={true}>
                <Form.Item
                  label="Harvest ID"
                  name="harvestId"
                  initialValue={dataHarvest.harvestId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Project ID"
                  name="projectId"
                  initialValue={dataHarvest.projectId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Project Code"
                  name="projectCode"
                  initialValue={dataHarvest.projectCode}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Date Completed"
                  name="dateCompleted"
                  initialValue={
                    dataHarvest?.dateCompleted
                      ? moment(dataHarvest?.dateCompleted)
                      : "Not update information"
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Inspector"
                  name="inspector"
                  initialValue={dataHarvest.inspector}
                >
                  <Input />
                </Form.Item>
              </Form>
              <Form
                {...layout}
                disabled={componentDisabled}
                onFinish={(value) => {
                  handleSubmitForm(value, dataHarvest.harvestId);
                  disabled = true;
                  setComponentDisabled(disabled);
                }}
              >
                <Form.Item
                  label="Total Harvest"
                  name="totalHarvest"
                  initialValue={dataHarvest?.totalHarvest}
                >
                  <Input type={componentDisabled ? "text" : "number"} />
                </Form.Item>
                <Form.Item
                  label="Ripeness"
                  name="ripeness"
                  initialValue={dataHarvest?.ripeness}
                >
                  <Input type={componentDisabled ? "text" : "number"} />
                </Form.Item>
                <Form.Item
                  label="Temperature"
                  name="temperature"
                  initialValue={dataHarvest?.temperature}
                >
                  <Input type={componentDisabled ? "text" : "number"} />
                </Form.Item>
                <Form.Item
                  label="Moisture"
                  name="moisture"
                  initialValue={dataHarvest?.moisture}
                >
                  <Input type={componentDisabled ? "text" : "number"} />
                </Form.Item>
                {componentDisabled ? (
                  StateComponent(dataHarvest.state)
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
                          const res = await handleUpdateHarvestState(
                            dataHarvest?.harvestId,
                            3
                          );

                          const harvest = parseHarvestData(res.data.harvest);

                          setDataHarvest(harvest);

                          console.log(dataHarvest);

                          if (res?.status === 200) {
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
                          const check = checkCanbeCompleted(dataHarvest);
                          console.log(check);

                          if (check) {
                            disabled = true;
                            setComponentDisabled(disabled);
                            const res = await handleUpdateHarvestState(
                              dataHarvest?.harvestId,
                              2
                            );

                            const harvest = parseHarvestData(res.data.harvest);

                            setDataHarvest(harvest);

                            if (res?.status === 200) {
                              successMessage("Prject has been Completed");
                              const a = addTrackingBlock("test1", "content123"); // test1
                              console.log(a);
                            } else {
                              errorMessage("Update Failed");
                            }
                          } else {
                            errorMessage(
                              "The information in the step must be entered completely!"
                            );
                          }
                        }}
                      >
                        Completed
                      </Button>
                    </Row>
                  </Form.Item>
                )}
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
                      htmlType="submit"
                      hidden={disabled}
                      size={"large"}
                    >
                      Save
                    </Button>
                  </Row>
                </div>
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

export default HarvestDetail;
