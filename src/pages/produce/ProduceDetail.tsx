import { GetProduceDetailByIdAPI, UpdateProduceAPI } from "@/api/produce_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { Production } from "@/types/step_tracking";
import { dateFormat, formatDateTime } from "@/utils/formatDateTime";
import { parseProductionData } from "@/utils/parseData";
import { FormOutlined } from "@ant-design/icons";
import { Badge, Button, Col, DatePicker, Form, Input, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StateComponent } from "../common/CheckProjectStatus";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

let disabled = true;

function ProduceDetail() {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

  const [dataProduction, setDataProduction] = useState<Production>();

  const { state: productionId } = useLocation();

  useEffect(() => {
    GetProduceDetailByIdAPI(productionId).then((res: any) => {
      const production = parseProductionData(res.data);

      setDataProduction(production);
    });
  }, []);

  console.log(dataProduction);

  const handleUpdateState = async (productionId: string, state: number) => {
    const valueState = { state: state };

    const res: any = await UpdateProduceAPI(valueState, productionId);

    const newProduction = parseProductionData(res.data.produceSupervision);

    setDataProduction(newProduction);

    if (res?.status === 200) {
      state === 2
        ? successMessage("This Step has been Completed")
        : successMessage("This Step has been Canceled");
    } else {
      errorMessage("Upload Failed");
    }
  };

  const handleSubmitForm = async (value: any, productionId: string) => {
    const finalValue = { ...value };

    console.log(finalValue);

    const result: any = await UpdateProduceAPI(finalValue, productionId);

    console.log(result);

    if (result.status === 200) {
      const newProduction: Production = parseProductionData(
        result.data.produceSupervision
      );

      setDataProduction(newProduction);

      successMessage("Update new information successfully!");
    } else {
      errorMessage("Update new information failed!");
    }
  };

  const checkCanBeCompleted = (production: Production) => {
    if (
      production.totalInput === 0 ||
      production.totalProduct === 0 ||
      production.factoryName === "" ||
      production.expiredDate === undefined
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Col>
      <div className="header-content">Transport Detail</div>
      <div className="content">
        {dataProduction ? (
          <Col>
            <p className="title">Transport Information</p>
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
            <div className="main-content">
              <Form {...layout} disabled={true}>
                <Form.Item
                  label="Production ID"
                  name="productionId"
                  initialValue={dataProduction.productionId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Project ID"
                  name="projectId"
                  initialValue={dataProduction.productionId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Project Code"
                  name="projectCode"
                  initialValue={dataProduction.projectCode}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Inspector"
                  name="inspector"
                  initialValue={dataProduction.inspector}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="dateCompleted"
                  name="dateCompleted"
                  initialValue={dataProduction.dateCompleted}
                >
                  <Input />
                </Form.Item>
              </Form>
              <Form
                {...layout}
                disabled={componentDisabled}
                onFinish={(value) => {
                  console.log("On Submit");
                  handleSubmitForm(value, dataProduction.productionId);
                  disabled = true;
                  setComponentDisabled(disabled);
                }}
              >
                <Form.Item
                  label="Total Input"
                  name="totalInput"
                  initialValue={dataProduction.totalInput}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Factory Company"
                  name="factory"
                  initialValue={dataProduction.factoryName}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Product Name"
                  name="productName"
                  initialValue={dataProduction.productName}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total Product"
                  name="totalProduct"
                  initialValue={dataProduction.totalProduct}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Humidity"
                  name="humidity"
                  initialValue={dataProduction.humidity}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Drying Temperature"
                  name="dryingTeperature"
                  initialValue={dataProduction.dryingTemperature}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Expired Date"
                  name="expiredDate"
                  initialValue={moment(dataProduction.expiredDate)}
                >
                  <DatePicker style={{ width: "70%" }} format={dateFormat} />
                </Form.Item>
                {componentDisabled ? (
                  StateComponent(dataProduction.state)
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
                        onClick={async () =>
                          handleUpdateState(dataProduction.productionId, 3)
                        }
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
                          const check = checkCanBeCompleted(dataProduction);
                          if (check) {
                            await handleUpdateState(
                              dataProduction.productionId,
                              2
                            );
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
}

export default ProduceDetail;
