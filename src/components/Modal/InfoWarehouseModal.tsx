import { Modal, Input, Form, Badge } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { StateComponent } from "@/pages/common/CheckProjectStatus";
import { formatDateTime } from "@/utils/formatDateTime";

const InfoWarehouseModal = ({ myProp: warehouseStorage }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <InfoCircleOutlined onClick={showModal} />
      <Modal
        title="Warehouse Inspection Information"
        open={isModalOpen}
        onOk={handleClose}
        okText={"Close"}
        cancelButtonProps={{ style: { display: "none" } }}
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
            initialValue={warehouseStorage.warehouseStorageId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Id"
            name="projectId"
            required
            initialValue={warehouseStorage.projectId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Input"
            name="totalInput"
            initialValue={
              warehouseStorage?.totalInput || "Not update information"
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Warehouse Name"
            name="warehouse"
            initialValue={
              warehouseStorage?.warehouseName || "Not update information"
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Inspector"
            name="inspector"
            initialValue={warehouseStorage?.inspector}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Input Date"
            name="inputDate"
            initialValue={
              warehouseStorage?.inputDate
                ? formatDateTime(warehouseStorage?.inputDate)
                : "Not update information"
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Output Date"
            name="outputDate"
            initialValue={
              warehouseStorage?.outputDate
                ? formatDateTime(warehouseStorage?.outputDate)
                : "Not update information"
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Export"
            name="totalExport"
            initialValue={
              warehouseStorage?.totalExport || "Not update information"
            }
          >
            <Input />
          </Form.Item>
          {StateComponent(warehouseStorage.state)}
        </Form>
      </Modal>
    </>
  );
};

export default InfoWarehouseModal;
