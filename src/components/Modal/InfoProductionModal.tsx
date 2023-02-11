import { Modal, Input, Form, Badge } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { StateComponent } from "@/pages/common/CheckProjectStatus";
import { formatDateTime } from "@/utils/formatDateTime";

const InfoProductionModal = ({myProp: production}: any) => {
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
              initialValue={production.productionId}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Project Id"
              name="projectId"
              required
              initialValue={production.projectId}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Total Input"
              name="totalInput"
              initialValue={production.totalInput || "Not update information"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Factory Name"
              name="factory"
              initialValue={production?.factoryName || "Not update information"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Name"
              name="productName"
              initialValue={production?.productName || "Not update information"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Inspector"
              name="inspector"
              initialValue={production?.inspector}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date Completed"
              name="dateCompleted"
              initialValue={production?.dateCompleted ? formatDateTime(production?.dateCompleted) : "Not update information"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Total Product"
              name="total Product"
              initialValue={production?.totalProduct || "Not update information"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Humidity"
              name="humidity"
              initialValue={production?.humidity || "Not update information"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Drying Temperature"
              name="dryingTemperature"
              initialValue={production?.dryingTemperature || "Not update information"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Expired Date"
              name="expiredDate"
              initialValue={production?.expiredDate ? formatDateTime(production?.expiredDate) : "Not update information"}
            >
              <Input />
            </Form.Item>
            {StateComponent(production?.state)}
          </Form>
        </Modal>
      </>
  )
}

export default InfoProductionModal