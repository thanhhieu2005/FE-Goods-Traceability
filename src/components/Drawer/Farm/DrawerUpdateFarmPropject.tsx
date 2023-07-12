import React, { useState } from "react";
import { ShowDrawerEdit } from "../DrawerEditItem";
import { Form, Input, Modal, Select } from "antd";
import { modalUpdateContentLayout } from "@/styles/content_layout";
import { FarmProjectModel } from "@/types/farm_model";
import { listCommonState } from "@/types/step_tracking";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";
import { CommonProjectState } from "@/types/project_model";
import FarmServices from "@/api/farm/farm_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { useSelector } from "react-redux";
import { addTrackingBlock } from "@/api/node_api/blockchain_helper";
import StepLogServices from "@/api/steplog_api";

const DrawerUpdateFarmPropject = ({ myProps: props }: any) => {
  const [form] = Form.useForm();

  const currentMode: string = useSelector(
    (state: any) => state.mode.currentMode
  );

  const dataFarmProject: FarmProjectModel = props.dataFarmProject;

  const onChangeState = (state: any) => {
    console.log(state);
  };

  const { TextArea } = Input;

  // Handle for Public Blockchain
  const handlePublicBlockchain = async (value: any) => {
    setIsLoadingUpdate(true);

    const saveBlockchainValue = {
      ...value,
      manager: dataFarmProject.farmer.userId,
      projectId: dataFarmProject.projectId,
    };

    const res: any = await addTrackingBlock(
      dataFarmProject.farmProjectCode,
      JSON.stringify(saveBlockchainValue)
    );

    console.log(res);

    if (res.code === 4001) {
      errorMessage(res.message);
      setIsLoadingUpdate(false);
    } else {
      const updateFarmProject: any = await FarmServices.updateFarmProject(
        dataFarmProject.farmProjectId,
        value
      );

      if (updateFarmProject.status === 200) {
        const updateSteplog: any =
          await StepLogServices.updateTransactionStepLog(
            updateFarmProject.data.logId,
            res.transactionHash
          );
        if (updateSteplog.status === 200) {
          props.setDataFarmProject(updateFarmProject.data);
          successMessage("Update Successfully!");
          setIsLoadingUpdate(false);
          props.setIsUpdateFarmProjectProgress(false);
        } else {
          errorMessage("Update Info Failed!");
        }
      } else {
        errorMessage("Update Farm Project Failed!");
        setIsLoadingUpdate(false);
      }
      setIsLoadingUpdate(false);
    }
  };

  const handleUpdateFarmProjectProgress = async (value: any) => {
    console.log(value);

    if (value.state === CommonProjectState.Completed) {
      Modal.confirm({
        content: `When you confirm "Completed", you will not be able to change the project information!`,
        onOk: () => {
          if (currentMode === "Current Blockchain Mode is Public Mode") {
            handlePublicBlockchain(value);
          } else {
            updateFarmProjectProgress(value);
          }
        },
      });
    } else if (value.state === CommonProjectState.Canceled) {
      Modal.confirm({
        content: `When you confirm "Canceled", you will not be able to change the project information!`,
        onOk: () => {
          updateFarmProjectProgress(value);
        },
      });
    } else {
      updateFarmProjectProgress(value);
    }
  };

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const updateFarmProjectProgress = async (value: any) => {
    setIsLoadingUpdate(true);

    const res: any = await FarmServices.updateFarmProject(
      dataFarmProject.farmProjectId,
      value
    );

    if (res.status === 200) {
      props.setIsLoading(true);
      successMessage("Update successfully!");
      props.setDataFarmProject(res.data);

      props.setIsUpdateFarmProjectProgress(false);
      props.setIsLoading(false);

      setIsLoadingUpdate(false);
    } else {
      console.log(res);
      errorMessage(res.response.data.message);
      props.setIsLoading(false);

      setIsLoadingUpdate(false);
    }
  };

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Farm Project Progress Update",
          onOpen: props.showProgressUpdate,
          onClose: props.cancelCloseProgressUpdate,
          onSubmit: form.submit,
          loading: isLoadingUpdate,
          content: (
            <div>
              <Form
                {...modalUpdateContentLayout}
                form={form}
                onFinish={(value) => {
                  handleUpdateFarmProjectProgress(value);
                }}
              >
                <Form.Item
                  label="Total Harvest (ton)"
                  name="totalHarvest"
                  initialValue={dataFarmProject.totalHarvest}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Total Seeds (ton)"
                  name="totalSeeds"
                  initialValue={dataFarmProject.totalSeeds}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Fertilizer Used"
                  name="fertilizerUsed"
                  initialValue={dataFarmProject.fertilizerUsed}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total Fertilizers (ton)"
                  name="totalFertilizers"
                  initialValue={dataFarmProject.totalFertilizers}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Ripeness (%)"
                  name="ripeness"
                  initialValue={dataFarmProject.ripeness}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Pesticides"
                  name="pesticide"
                  initialValue={dataFarmProject.pesticide}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Plant Density (/ha)"
                  name="plantDensity"
                  initialValue={dataFarmProject.plantDensity}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  initialValue={dataFarmProject.state}
                >
                  <Select
                    onChange={(value) => {
                      onChangeState(value);
                    }}
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
                  initialValue={dataFarmProject.note}
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

export default DrawerUpdateFarmPropject;
