import {
  GetTransportDetailByIdAPI,
  UpdateTransportAPI,
} from "@/api/transport_api";
import { StateTagStep } from "@/components/Tag/StateTag";
import { Transport } from "@/types/step_tracking";
import { dateFormat, formatDateTime } from "@/utils/formatDateTime";
import { parseTransportData } from "@/utils/models/parseData";
import { FormOutlined } from "@ant-design/icons";
import { Badge, Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StateComponent } from "@/pages/common/CheckProjectStatus";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import moment from "moment";
import { addTrackingBlock } from "@/api/node_api/blockchain_helper";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

let disabled = true;

// const dateFormat = "YYYY/MM/DD";

const TransportDetail = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

  const [dataTransport, setDataTransport] = useState<Transport>();

  const { state: transportId } = useLocation();

  useEffect(() => {
    GetTransportDetailByIdAPI(transportId).then((res: any) => {
      const transport = parseTransportData(res.data);

      setDataTransport(transport);
    });
  }, []);

  const handleUpdateTransportState = async (
    transportId: string,
    state: number
  ) => {
    const valueState = { state: state };

    const res: any = await UpdateTransportAPI(valueState, transportId);

    return res;
  };

  const handleSubmitForm = async (value: any, transportId: string) => {
    const finalValue = { ...value };

    console.log(finalValue);

    const result: any = await UpdateTransportAPI(finalValue, transportId);

    if (result.status === 200) {
      const newTransport: Transport = parseTransportData(
        result.data.shippingPop
      );

      setDataTransport(newTransport);

      successMessage("Update new information successfully!");
    } else {
      errorMessage("Update new information failed!");
    }
  };

  const checkCanBeCompleted = (transport: Transport) => {
    if (
      transport.dateExpected === undefined ||
      transport.numberOfVehicle === 0 ||
      transport.transportName === "" ||
      transport.vehicleType === undefined ||
      transport.totalInput === 0
    ) {
      return false;
    }
    return true;
  };

  return (
    <Col>
      <div className="header-content">Transport Detail</div>
      <div className="main-content">
        {dataTransport ? (
          <Col>
            <p className="title">Transport Information</p>
            {dataTransport.state === 1 ? (
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
              <StateTagStep myProp={dataTransport.state}></StateTagStep>
            )}
            <div className="main-content">
              <Form {...layout} disabled={true}>
                <Form.Item
                  label="Transport ID"
                  name="transportId"
                  initialValue={dataTransport.transportId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Project ID"
                  name="projectId"
                  initialValue={dataTransport.projectId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Project Code"
                  name="projectCode"
                  initialValue={dataTransport.projectCode}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Inspector"
                  name="inspector"
                  initialValue={dataTransport.inspector}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="dateCompleted"
                  name="dateCompleted"
                  initialValue={
                    dataTransport?.dateCompleted
                      ? moment(dataTransport?.dateCompleted)
                      : ""
                  }
                >
                  <Input />
                </Form.Item>
              </Form>
              <Form
                {...layout}
                disabled={componentDisabled}
                onFinish={(value) => {
                  console.log("On Submit");
                  handleSubmitForm(value, dataTransport.transportId);
                  disabled = true;
                  setComponentDisabled(disabled);
                }}
              >
                <Form.Item
                  label="Total Input"
                  name="totalInput"
                  initialValue={dataTransport.totalInput}
                  rules={[
                    { required: true, message: "Please enter Total Input" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Transport Company"
                  name="transport"
                  initialValue={dataTransport.transportName}
                  rules={[
                    { required: true, message: "Please enter Transport" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Vehicle"
                  name="vehicleType"
                  initialValue={dataTransport.vehicleType}
                  rules={[{ required: true, message: "Please enter Vehicle" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Number of Vehicles"
                  name="numberOfVehicle"
                  initialValue={dataTransport.numberOfVehicle}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Number of Vehicle",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Date Expected"
                  name="dateExpected"
                  initialValue={
                    dataTransport.dateExpected !== undefined
                      ? moment(dataTransport.dateExpected)
                      : null
                  }
                >
                  {componentDisabled ? (
                    <Input />
                  ) : (
                    <DatePicker style={{ width: "70%" }} format={dateFormat} />
                  )}
                </Form.Item>
                {componentDisabled ? (
                  StateComponent(dataTransport.state)
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
                          const res = await handleUpdateTransportState(
                            dataTransport?.transportId,
                            3
                          );

                          const transport = parseTransportData(
                            res.data.shipping
                          );

                          setDataTransport(transport);

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
                          const check = await checkCanBeCompleted(
                            dataTransport
                          );
                          if (check) {
                            disabled = true;
                            setComponentDisabled(disabled);
                            const res = await handleUpdateTransportState(
                              dataTransport?.transportId,
                              2
                            );

                            const transport = parseTransportData(
                              res.data.shipping
                            );

                            setDataTransport(transport);

                            if (res?.status === 200) {
                              successMessage("This Step has been Completed");
                              addTrackingBlock("test2", "contentTransport"); // test2
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
                      // icon={<FormOutlined />}
                      // onClick={() => {

                      // }}
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

export default TransportDetail;
