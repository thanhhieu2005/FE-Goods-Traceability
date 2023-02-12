import { Badge, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { formatDateTime } from "@/utils/formatDateTime";
import { StateComponent } from "@/pages/common/CheckProjectStatus";


const InfoTransportModal = ({myProp: transport}: any) => {
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
            initialValue={transport?.transportId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Id"
            name="projectId"
            required
            initialValue={transport?.projectId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Input"
            name="totalInput"
            initialValue={transport?.totalInput || "Not update information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Transport Name"
            name="transport"
            initialValue={transport?.transportName || "Not update information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vehicle"
            name="vehicle"
            initialValue={transport?.vihicleType || "Not update information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Number of Vehicles"
            name="numberVehicle"
            initialValue={transport?.numberOfVehicle || "Not update information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Inspector"
            name="inspector"
            initialValue={transport?.inspector}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date Completed"
            name="dateCompleted"
            initialValue={transport?.dateCompleted ? formatDateTime(transport?.dateCompleted) : "Not update information"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date Expected"
            name="dateExpected"
            initialValue={transport?.dateExpected ? formatDateTime(transport?.dateExpected) : "Not update information"}
          >
            <Input />
          </Form.Item>
          {StateComponent(transport?.state)}
        </Form>
      </Modal>
    </>
  );
};

export default InfoTransportModal;
