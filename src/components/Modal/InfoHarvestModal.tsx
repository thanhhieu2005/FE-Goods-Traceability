import { Modal, Input, Form, Badge } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { formatDateTime } from "@/utils/formatDateTime";
import { StateComponent } from "@/pages/common/CheckProjectStatus";

const InfoHarvestModal = ({myProp: harvest} : any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <InfoCircleOutlined onClick={showModal}/>
      <Modal
        title="Harvest Inspection Information"
        open={isModalOpen}
        onOk={handleClose}
        okText={"Close"}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        width={640}
        maskClosable={false}
        destroyOnClose={true}
        bodyStyle={{
          fontWeight: "500",
          justifyItems: "center",
          justifyContent: "center",
        }}
        
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} disabled={true}>
          <Form.Item
            label="Harvest ID"
            name="harvestId"
            required
            initialValue={harvest.harvestId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project ID"
            name="projectId"
            required
            initialValue={harvest.projectId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Harvest"
            name="totalHarvest"
            initialValue={harvest?.totalHarvest || "Not updated information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ripeness"
            name="ripeness"
            initialValue={harvest?.ripeness || "Not updated information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Temperature"
            name="temperature"
            initialValue={harvest?.temperature || "Not updated information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Moisure"
            name="moisure"
            initialValue={harvest?.moisture || "Not updated information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Inspector"
            name="inspector"
            initialValue={harvest?.inspector}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date Completed"
            name="dateCompleted"
            initialValue={harvest?.dateCompleted ? formatDateTime(harvest?.dateCompleted) : "Not updated information"}
          >
            <Input />
          </Form.Item>
          {StateComponent(harvest?.state)}
        </Form>
      </Modal>
    </>
  );
};

export default InfoHarvestModal;
