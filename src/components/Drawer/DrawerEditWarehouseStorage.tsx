import { WarehouseStorageModel, listCommonState, parseWarehouseStorageData } from "@/types/step_tracking";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { ShowDrawerEdit } from "./DrawerEditItem";
import { modalUpdateContentLayout } from "@/styles/content_layout";
import moment from "moment";
import { dateFormat } from "@/utils/formatDateTime";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";
import { CommonProjectState } from "@/types/project_model";
import { UpdateWarehouseDetailByIdAPI } from "@/api/warehouse_api";
import { errorMessage, successMessage } from "../Message/MessageNoti";

const DrawerEditWarehouseStorage = ({ myProps: props }: any) => {
  const dataWarehouseStorage: WarehouseStorageModel =
    props.dataWarehouseStorage;

  const [form] = Form.useForm();

  const { TextArea } = Input;

  const formatImportedDate = moment(dataWarehouseStorage.inputDate).format(
    dateFormat
  );

  const formatExportedDate = moment(dataWarehouseStorage.outputDate).format(
    dateFormat
  );

  const onSubmitForm = (value: any) => {
    if (value.state === CommonProjectState.Completed) {
      if (
        value.warehouseName === null ||
        value.totalInput === 0 ||
        value.totalInput === null ||
        value.inputDate === null ||
        value.totalExport == null ||
        value.totalExport === 0 ||
        value.exportDate === null
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
          onOk: () => onUpdateWarehouseStorageSupervision(value),
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
        onOk: () => onUpdateWarehouseStorageSupervision(value),
      });
    } else {
      onUpdateWarehouseStorageSupervision(value);
    }
  };

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const onUpdateWarehouseStorageSupervision = async (value: any) => {
    setIsLoadingUpdate(true);

    const res: any = await UpdateWarehouseDetailByIdAPI(
      value,
      dataWarehouseStorage.warehouseStorageId
    );

    if (res.status === 200) {
      const newUpdate = parseWarehouseStorageData(res.data.warehouse);

      props.setDataWarehouseStorage(newUpdate);

      props.setIsOpenModalUpdate(false);

      setIsLoadingUpdate(false);
      successMessage("Update Successfully!");
    } else if (res.response.status === 400) {
      errorMessage(res.response.data.message);
      setIsLoadingUpdate(false);
    } else {
      console.log(res);
      errorMessage("Update Failed!");
      setIsLoadingUpdate(false);
    }
  };

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Warehouse Storage Supervision Update",
          onOpen: props.showUpdate,
          onClose: props.cancelCloseUpdate,
          onSubmit: form.submit,
          loading: isLoadingUpdate,
          content: (
            <div>
              <Form
                {...modalUpdateContentLayout}
                form={form}
                onFinish={(value) => {
                  if (value.totalExport > value.totalInput) {
                    Modal.warning({
                      title: "Wrong Information!",
                      content:
                        "Total Export can not more than Total Import",
                    });
                  } else {
                    onSubmitForm(value);
                  }
                }}
              >
                <Form.Item
                  label="Warehouse Name"
                  name="warehouse"
                  initialValue={dataWarehouseStorage.warehouseName}
                >
                  <Input placeholder="Enter name of warehouse" />
                </Form.Item>
                <Form.Item
                  label="Total Import (ton)"
                  name="totalInput"
                  initialValue={dataWarehouseStorage.totalInput}
                >
                  <Input
                    type="number"
                    placeholder="Enter the quantity of goods to be imported "
                  />
                </Form.Item>
                <Form.Item
                  label="Imported Date"
                  name="inputDate"
                  initialValue={
                    dataWarehouseStorage.inputDate !== null
                      ? moment(formatImportedDate, dateFormat)
                      : null
                  }
                >
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="Total Export (ton)"
                  name="totalExport"
                  initialValue={dataWarehouseStorage.totalExport}
                >
                  <Input
                    type="number"
                    placeholder="Enter the quantity of goods to be exported "
                  />
                </Form.Item>
                <Form.Item
                  label="Exported Date"
                  name="outputDate"
                  initialValue={
                    dataWarehouseStorage.outputDate !== null
                      ? moment(formatExportedDate, dateFormat)
                      : null
                  }
                >
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  initialValue={dataWarehouseStorage.state}
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
                  initialValue={dataWarehouseStorage.note}
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

export default DrawerEditWarehouseStorage;
