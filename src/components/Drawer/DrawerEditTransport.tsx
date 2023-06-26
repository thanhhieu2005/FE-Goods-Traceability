import { DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";
import { ShowDrawerEdit } from "./DrawerEditItem";
import { modalUpdateContentLayout } from "@/styles/content_layout";
import { TransportModel, listCommonState } from "@/types/step_tracking";
import moment from "moment";
import { dateFormat } from "@/utils/formatDateTime";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";
import { CommonProjectState } from "@/types/project_model";

const DrawerEditTransport = ({ myProps: props }: any) => {
  const dataTransport: TransportModel = props.dataTransport;

  const [form] = Form.useForm();

  const { TextArea } = Input;

  const onSubmitForm = (value: any) => {
    if (value.state === CommonProjectState.Completed) {
      const finalValue = {
        ...value,
        dateCompleted: Date.now(),
      };
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
        onOk: () => props.onUpdate(finalValue),
      });
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

  const formatDateExpected = moment(dataTransport.dateExpected).format("DD/MM/YYYY");

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Transport Supervision Update",
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
                  initialValue={dataTransport.totalInput}
                >
                  <Input type="number" />
                </Form.Item>
                {/* <Form.Item
                  label="Transport Company"
                  name="transportCompany"
                  initialValue={dataTransport.transportName}
                >
                  <Input />
                </Form.Item> */}
                <Form.Item
                  label="Type of Vehicle"
                  name="vehicle"
                  initialValue={dataTransport.vehicleType}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Number of Vehicles"
                  name="numberOfVehicle"
                  initialValue={dataTransport.numberOfVehicle}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Date Expected"
                  name="dateExpected"
                  initialValue={
                    dataTransport.dateExpected !== null
                      ? moment(formatDateExpected, dateFormat)
                      : null
                  }
                >
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  initialValue={dataTransport.state}
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
                  initialValue={dataTransport.note}
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

export default DrawerEditTransport;
