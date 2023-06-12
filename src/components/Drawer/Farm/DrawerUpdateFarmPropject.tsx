import React from "react";
import { ShowDrawerEdit } from "../DrawerEditItem";
import { Form, Input, Select } from "antd";
import { modalUpdateContentLayout } from "@/styles/content_layout";
import { FarmProjectModel } from "@/types/farm_model";
import { listCommonState } from "@/types/step_tracking";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";

const DrawerUpdateFarmPropject = ({ myProps: props }: any) => {
  const [form] = Form.useForm();

  const dataFarmProject: FarmProjectModel = props.dataFarmProject;

  const onChangeState = (state: any) => {
    console.log(state);
  }

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Farm Project Progress Update",
          onOpen: props.showProgressUpdate,
          onClose: props.cancelCloseProgressUpdate,
          onSubmit: form.submit,
          content: (
            <div>
              <Form
                {...modalUpdateContentLayout}
                form={form}
                onFinish={(value) => {
                  props.submitUpdateFarmProject(value);
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
                  <Select onChange={(value) => {
                    onChangeState(value);
                  }}>
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
                  <Input/>
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
