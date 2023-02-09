import { Badge, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";


const InfoTransportModal = () => {
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
        title="Transport Inspection Information"
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
            label="Transport ID"
            name="shippingId"
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
            label="Total Input"
            name="totalInput"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Transport Name"
            name="transport"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vehicle"
            name="vehicle"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Number of Vehicles"
            name="numberVehicle"
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
            label="Date Expected"
            name="dateExpected"
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

export default InfoTransportModal;
