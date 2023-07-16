import { modalUpdateContentLayout } from "@/styles/content_layout";
import {
  HarvestModel,
  listCommonState,
  parseHarvestData,
} from "@/types/step_tracking";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";
import { Form, Input, Modal, Select } from "antd";
import { ShowDrawerEdit } from "./DrawerEditItem";
import { CommonProjectState } from "@/types/project_model";
import { UpdateHarvestAPI } from "@/api/harvest/harvest_api";
import { errorMessage, successMessage } from "../Message/MessageNoti";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addTrackingBlock } from "@/api/node_api/blockchain_helper";
import StepLogServices from "@/api/steplog_api";

const DrawerEditHarvestor = ({ myProps: props }: any) => {
  const dataHarvest: HarvestModel = props.dataHarvest;

  const currentMode: string = useSelector(
    (state: any) => state.mode.currentMode
  );

  const isCallUpdate: boolean = props.isCallGetLog;

  const [form] = Form.useForm();

  const { TextArea } = Input;

  const onSubmitForm = (value: any) => {
    if (value.state === CommonProjectState.Completed) {
      if (
        value.totalHarvest === 0 ||
        value.totalHarvest === null ||
        value.temperature === null ||
        value.ripeness === null ||
        value.moisture === null
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
            if (currentMode === "Current Blockchain Mode is Public Mode") {
              handlePublicBlockchain(value);
            } else {
              onUpdateHarvestProject(value);
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
        onOk: () => onUpdateHarvestProject(value),
      });
    } else {
      onUpdateHarvestProject(value);
    }
  };

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const onUpdateHarvestProject = async (value: any) => {
    setIsLoadingUpdate(true);
    
    const res: any = await UpdateHarvestAPI(value, dataHarvest.harvestId);

    if (res.status == 200) {
      console.log(res);
      const newHarvest = parseHarvestData(res.data.harvest);

      props.setDataHarvest(newHarvest);

      props.setIsOpenModalUpdate(false);

      setIsLoadingUpdate(false);

      props.setCallGetLog(!isCallUpdate);

      successMessage("Update Successfully!");
    } else if (res.response.status === 400) {
      errorMessage(res.response.data.message);
      setIsLoadingUpdate(false);
      
    } else {
      errorMessage("Update Failed!");
      setIsLoadingUpdate(false);
    }
  };

  // Handle for Public Blockchain
  const handlePublicBlockchain = async (value: any) => {
    setIsLoadingUpdate(true);

    const saveBlockchainValue = {
      ...value,
      inspector: dataHarvest.inspector?.userId,
    };

    const addBlockchain: any = await addTrackingBlock(
      dataHarvest.projectCode,
      JSON.stringify(saveBlockchainValue)
    );

    if (addBlockchain.code === 4001) {
      errorMessage(addBlockchain.message);
      setIsLoadingUpdate(false);
    } else {
      const updateHarvestProject: any = await UpdateHarvestAPI(
        value,
        dataHarvest.harvestId
      );

      if (updateHarvestProject.status === 200) {
        const updateSteplog: any =
          await StepLogServices.updateTransactionStepLog(
            updateHarvestProject.data.harvest.logId,
            addBlockchain.transactionHash
          );

        if (updateSteplog.status === 200) {
          const newHarvest = parseHarvestData(updateHarvestProject.data.harvest);
          props.setDataHarvest(newHarvest);
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
  };

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Harvest Inspection Update",
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
                  label="Total Harvest (ton)"
                  name="totalHarvest"
                  initialValue={dataHarvest.totalHarvest}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Temperature (°C)"
                  name="temperature"
                  initialValue={dataHarvest.temperature}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Ripeness (%)"
                  name="ripeness"
                  initialValue={dataHarvest.ripeness}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Moisture"
                  name="moisture"
                  initialValue={dataHarvest.moisture}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  initialValue={dataHarvest.state}
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
                  initialValue={dataHarvest.note}
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

export default DrawerEditHarvestor;
