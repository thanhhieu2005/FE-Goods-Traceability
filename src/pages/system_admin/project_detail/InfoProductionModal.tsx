import { Modal, Input, Form, Badge } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

const InfoProductionModal = () => {
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
          title="Supervising Producer Information"
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
              label="Produce ID"
              name="produceId"
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
              label="Factory Name"
              name="factory"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Name"
              name="productName"
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
              name="inspector"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Total Product"
              name="total Product"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Humidity"
              name="humidity"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Drying Temperature"
              name="dryingTemperature"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Expired Date"
              name="expiredDate"
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
  )
}

export default InfoProductionModal