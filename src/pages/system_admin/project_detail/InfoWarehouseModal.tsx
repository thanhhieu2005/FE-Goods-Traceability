import { Modal, Input, Form, Badge } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

const InfoWarehouseModal = () => {
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
          title="Warehouse Inspection Information"
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
              label="Warehouse ID"
              name="warehouseStorageId"
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
              label="Warehouse Name"
              name="warehouse"
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
              label="Input Date"
              name="inputDate"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Output Date"
              name="outputDate"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Total Export"
              name="totalExport"
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
}

export default InfoWarehouseModal