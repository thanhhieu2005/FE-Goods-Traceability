import { modalUpdateContentLayout } from "@/styles/content_layout";
import { HarvestModel, listCommonState } from "@/types/step_tracking";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";
import { Form, Input, Modal, Select } from "antd";
import { ShowDrawerEdit } from "./DrawerEditItem";
import { CommonProjectState } from "@/types/project_model";

const DrawerEditHarvestor = ({ myProps: props }: any) => {
  const dataHarvest: HarvestModel = props.dataHarvest;

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
          onOk: () => props.submitUpdate(value),
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
        onOk: () => props.submitUpdate(value),
      });
    } else {
      props.submitUpdate(value);
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
