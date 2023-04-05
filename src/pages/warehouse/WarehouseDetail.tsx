import { addTrackingBlock } from "@/api/node_api/blockchain_helper";
import {
  GetWarehouseDetailByIdAPI,
  UpdateWarehouseDetailByIdAPI,
} from "@/api/warehouse_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { StateTagStep } from "@/components/Tag/StateTag";
import { parseWarehouseStorageData, WarehouseStorage } from "@/types/step_tracking";
import { dateFormat } from "@/utils/formatDateTime";
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

function WarehouseDetail() {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

  const [dataWarehouseStorage, setDataWarehouseStorage] =
    useState<WarehouseStorage>();

  const { state: warehouseStorageId } = useLocation();

  useEffect(() => {
    GetWarehouseDetailByIdAPI(warehouseStorageId).then((res: any) => {
      const warehouseStorage = parseWarehouseStorageData(res.data);

      setDataWarehouseStorage(warehouseStorage);
    });
  }, []);

  const handleUpdateState = async (
    warehouseStorageId: string,
    state: number
  ) => {
    const newState = { state: state };

    disabled = true;
    setComponentDisabled(disabled);

    const res: any = await UpdateWarehouseDetailByIdAPI(
      newState,
      warehouseStorageId
    );

    const newWarehouseStorage = parseWarehouseStorageData(res.data.warehouse);

    setDataWarehouseStorage(newWarehouseStorage);

    if (res?.status === 200) {
      state === 2
        ? successMessage("This Step has been Completed")
        : successMessage("This Step has been Canceled");
      state === 2 ? addTrackingBlock("test3", "content") : null; // test 3
    } else {
      errorMessage("Upload Failed");
    }
  };

  const handleSubmitForm = async (value: any, warehouseStorageId: string) => {
    const finalValue = { ...value };

    console.log(finalValue);

    const result: any = await UpdateWarehouseDetailByIdAPI(
      finalValue,
      warehouseStorageId
    );

    if (result.status === 200) {
      const newWarehouseStorage: WarehouseStorage = parseWarehouseStorageData(
        result.data.warehouse
      );

      setDataWarehouseStorage(newWarehouseStorage);

      successMessage("Update new information successfully!");
    } else {
      errorMessage("Update new information failed!");
    }
  };

  const checkCanBeCompleted = (warehouseStorage: WarehouseStorage) => {
    if (
      warehouseStorage.inputDate === undefined ||
      warehouseStorage.outputDate === undefined ||
      warehouseStorage.totalInput === 0 ||
      warehouseStorage.totalExport === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Col>
      <div className="header-content">Production Detail </div>
      <div className="main-content">
        {dataWarehouseStorage ? (
          <Col>
            <p className="title">Production Information</p>
            {dataWarehouseStorage.state === 1 ? (
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
              <StateTagStep myProp={dataWarehouseStorage.state}></StateTagStep>
            )}
            <div>
              <Form {...layout} disabled={true}>
                <Form.Item
                  label="Warehouse Storage ID"
                  name="warehouseStorageId"
                  initialValue={dataWarehouseStorage.warehouseStorageId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Project ID"
                  name="projectId"
                  initialValue={dataWarehouseStorage.projectId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Project Code"
                  name="projectCode"
                  initialValue={dataWarehouseStorage.projectCode}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Inspector"
                  name="inspector"
                  initialValue={dataWarehouseStorage.inspector}
                >
                  <Input />
                </Form.Item>
              </Form>
              <Form
                {...layout}
                disabled={componentDisabled}
                onFinish={(value) => {
                  console.log("On Submit");
                  handleSubmitForm(
                    value,
                    dataWarehouseStorage.warehouseStorageId
                  );
                  disabled = true;
                  setComponentDisabled(disabled);
                }}
              >
                <Form.Item
                  label="Warehouse Company"
                  name="warehouse"
                  initialValue={dataWarehouseStorage.warehouseName}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total Input"
                  name="totalInput"
                  initialValue={dataWarehouseStorage.totalInput}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Total Export"
                  name="totalExport"
                  initialValue={dataWarehouseStorage.totalExport}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Input Date"
                  name="inputDate"
                  initialValue={
                    dataWarehouseStorage.inputDate !== undefined
                      ? moment(dataWarehouseStorage.inputDate)
                      : null
                  }
                >
                  <DatePicker style={{ width: "70%" }} format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="Output Date"
                  name="outputDate"
                  initialValue={
                    dataWarehouseStorage?.outputDate !== undefined
                      ? moment(dataWarehouseStorage.outputDate)
                      : null
                  }
                >
                  <DatePicker style={{ width: "70%" }} format={dateFormat} />
                </Form.Item>
                {componentDisabled ? (
                  StateComponent(dataWarehouseStorage.state)
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
                          handleUpdateState(
                            dataWarehouseStorage.warehouseStorageId,
                            3
                          );
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
                          const check =
                            checkCanBeCompleted(dataWarehouseStorage);
                          if (check) {
                            disabled = true;
                            setComponentDisabled(disabled);
                            await handleUpdateState(
                              dataWarehouseStorage.warehouseStorageId,
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
                      // onClick={() => {
                      //   disabled = true;
                      //   setComponentDisabled(disabled);
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
}

export default WarehouseDetail;
