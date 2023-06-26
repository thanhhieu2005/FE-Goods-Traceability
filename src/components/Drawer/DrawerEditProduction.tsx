import { ProductionModel, listCommonState } from "@/types/step_tracking";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";
import { ShowDrawerEdit } from "./DrawerEditItem";
import { modalUpdateContentLayout } from "@/styles/content_layout";
import moment from "moment";
import { dateFormat } from "@/utils/formatDateTime";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";
import { CommonProjectState } from "@/types/project_model";

const DrawerEditProduction = ({ myProps: props }: any) => {
  const dataProduction: ProductionModel = props.dataProduction;

  const [form] = Form.useForm();

  const { TextArea } = Input;

  const formatExpiredDate = moment(dataProduction.expiredDate).format(
    dateFormat
  );

  const onSubmitForm = (value: any) => {
    if (value.state === CommonProjectState.Completed) {
      if (
        value.totalInput === 0 ||
        value.totalInput === null ||
        value.factory === null ||
        value.dryingTemperature === null ||
        value.humidity === null ||
        value.totalProduct === null ||
        value.expiredDate === null || value.factory === ""
      ) {
        Modal.warning({
          title: "Can not Update Step!",
          content:
            "The fields have not been fully updated. Please enter the information before completing!",
        });
      } else {
        Modal.confirm({
          title: "Complete Step Inspection",
          content: (
            <p>
              <span>Once you</span>
              <span style={{ fontWeight: "700" }}> Completed </span>
              <span>the step,</span>
              <span>you will not be able to change the information</span>
            </p>
          ),
          onOk: () => props.onUpdate(value),
        });
      }
    } else if (value.state === CommonProjectState.Canceled) {
      Modal.confirm({
        title: "Complete Step Inspection",
        content: (
          <p>
            <span>Once you</span>
            <span style={{ fontWeight: "700" }}> Deleted </span>
            <span>the step,</span>
            <span>
              This check will be canceled and cannot be changed, nor updated
            </span>
          </p>
        ),
        onOk: () => props.onUpdate(value),
      });
    } else {
      props.onUpdate(value);
    }
  };

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Production Supervision Update",
          onOpen: props.showUpdate,
          onClose: props.cancelCloseUpdate,
          onSubmit: form.submit,
          content: (
            <div>
              <Form
                {...modalUpdateContentLayout}
                form={form}
                onFinish={(value) => {
                  onSubmitForm(value);
                }}
              >
                <Form.Item
                  label="Total Input (ton)"
                  name="totalInput"
                  initialValue={dataProduction.totalInput ?? "Not Update"}
                >
                  <Input placeholder="Enter total input to produce" />
                </Form.Item>
                <Form.Item
                  label="Factory Name"
                  name="factory"
                  initialValue={dataProduction.factoryName ?? "Not Update"}
                >
                  <Input placeholder="Enter factory name to produce" />
                </Form.Item>
                <Form.Item
                  label="Drying Temperature (°C)"
                  name="dryingTemperature"
                  initialValue={
                    dataProduction.dryingTemperature ?? "Not Update"
                  }
                >
                  <Input placeholder="Enter drying temperature" />
                </Form.Item>
                <Form.Item
                  label="Humidity (%)"
                  name="humidity"
                  initialValue={dataProduction.humidity ?? "Not Update"}
                >
                  <Input placeholder="Enter humidity" />
                </Form.Item>
                <Form.Item
                  label="Total Product (ton)"
                  name="totalProduct"
                  initialValue={dataProduction.totalProduct ?? "Not Update"}
                >
                  <Input placeholder="Enter humidity" />
                </Form.Item>
                <Form.Item
                  label="Expired Date"
                  name="expiredDate"
                  initialValue={
                    dataProduction.expiredDate !== null
                      ? moment(formatExpiredDate, dateFormat)
                      : null
                  }
                >
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  initialValue={dataProduction.state}
                >
                  <Select
                  // onChange={(value) => {
                  //   onChangeState(value);
                  // }}
                  >
                    {listCommonState.map((state) => (
                      <Select.Option value={state} key={state}>
                        <p
                          style={{
                            color: `${parseColorByCommonState(state)}`,
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {parseToStringCommonState(state)}
                        </p>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Note"
                  name="note"
                  initialValue={dataProduction.note}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Form>
            </div>
          ),
        }}
      />
    </>
  );
};

export default DrawerEditProduction;
