import { ProductionModel, listCommonState, parseProductionData } from "@/types/step_tracking";
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
import { UpdateProduceAPI } from "@/api/produce_api";
import { errorMessage, successMessage } from "../Message/MessageNoti";
import { addTrackingBlock } from "@/api/node_api/blockchain_helper";
import StepLogServices from "@/api/steplog_api";
import { useSelector } from "react-redux";

const DrawerEditProduction = ({ myProps: props }: any) => {
  const dataProduction: ProductionModel = props.dataProduction;

  const [form] = Form.useForm();

  const currentMode: string = useSelector(
    (state: any) => state.mode.currentMode
  );

  const isCallUpdate: boolean = props.isCallGetLog;

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
          onOk: () => {
            if(currentMode === "Current Blockchain Mode is Public Mode") {
              handlePublicBlockchain(value);
            } else {
              onUpdateProductionSupervision(value)
            }
          },
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
        onOk: () => onUpdateProductionSupervision(value),
      });
    } else {
      onUpdateProductionSupervision(value);
    }
  };

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const onUpdateProductionSupervision = async (value: any) => {
    setIsLoadingUpdate(true);

    const res: any = await UpdateProduceAPI(value, dataProduction.produceSupervisionId);

    console.log(res);

    if (res.status === 200) {
      const newUpdate = parseProductionData(res.data.produce);

      props.setDataProduction(newUpdate);

      props.setIsOpenModalUpdate(false);

      setIsLoadingUpdate(false);
      props.setCallGetLog(!isCallUpdate);
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

  const handlePublicBlockchain = async (value: any) => {
    setIsLoadingUpdate(true);

    const saveBlockchainValue = {
      ...value,
      inspector: dataProduction.inspector?.userId,
    };

    const addBlockchain: any = await addTrackingBlock(
      dataProduction.projectCode,
      JSON.stringify(saveBlockchainValue)
    );

    if (addBlockchain.code === 4001) {
      errorMessage(addBlockchain.message);
      setIsLoadingUpdate(false);
    } else {
      const updateProductionProject: any = await UpdateProduceAPI(value, dataProduction.produceSupervisionId);

      if(updateProductionProject.status === 200) {
        const updateSteplog: any =
          await StepLogServices.updateTransactionStepLog(
            updateProductionProject.data.produce.logId,
            addBlockchain.transactionHash
          );

          if(updateSteplog.status === 200) {
            const newUpdate = parseProductionData(updateProductionProject.data.produce);

            props.setDataProduction(newUpdate);
            props.setIsOpenModalUpdate(false);
            setIsLoadingUpdate(false);
            props.setCallGetLog(!isCallUpdate);
            successMessage("Update Successfully!");
          } else {
            errorMessage("Update Info Failed!");
          }
      } else {
        errorMessage("Update Project Failed!");
        setIsLoadingUpdate(false);
      }
    }
  }

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Production Supervision Update",
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
                  onSubmitForm(value);
                }}
              >
                <Form.Item
                  label="Total Input (ton)"
                  name="totalInput"
                  initialValue={dataProduction.totalInput }
                >
                  <Input placeholder="Enter total input to produce" />
                </Form.Item>
                <Form.Item
                  label="Factory Name"
                  name="factory"
                  initialValue={dataProduction.factoryName }
                >
                  <Input placeholder="Enter factory name to produce" />
                </Form.Item>
                <Form.Item
                  label="Drying Temperature (°C)"
                  name="dryingTemperature"
                  initialValue={
                    dataProduction.dryingTemperature 
                  }
                >
                  <Input placeholder="Enter drying temperature" />
                </Form.Item>
                <Form.Item
                  label="Humidity (%)"
                  name="humidity"
                  initialValue={dataProduction.humidity }
                >
                  <Input placeholder="Enter humidity" />
                </Form.Item>
                <Form.Item
                  label="Total Product (ton)"
                  name="totalProduct"
                  initialValue={dataProduction.totalProduct }
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
