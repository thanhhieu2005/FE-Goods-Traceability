import { Modal, Input, Form, Badge } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

const InfoHarvestModal = () => {
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
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Code"
            name="projectCode"
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Harvest"
            name="totalHarvest"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ripeness"
            name="ripeness"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Temperature"
            name="temperature"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Moisure"
            name="moisure"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Inspector"
            name="inspector"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date Completed"
            name="dateCompleted"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
             <Badge status="success" style={{ paddingRight: "4px" }} />
                Completed
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InfoHarvestModal;
