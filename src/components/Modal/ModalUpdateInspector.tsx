import StaffServices from "@/api/system_admin/staff_service";
import {
  StaffDepartment,
  UserDetailModel,
  parseUserDetail,
} from "@/types/user";
import { Button, Col, Form, Modal, Row, Select, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import LabelContentItem from "../Label/LabelContentItem";
import { mainColor } from "@/utils/app_color";

const ModalUpdateInspector = ({ myProps: props }: any) => {
  const [form] = Form.useForm();

  const department: StaffDepartment = props.department;

  const inspector: UserDetailModel = props.inspector;

  const [listInspectors, setListInspectors] = useState<UserDetailModel[]>([]);

  useEffect(() => {
    StaffServices.getAllStaffByDepartment(department).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const inspector = parseUserDetail(element);
          setListInspectors((prev) => [...prev, inspector]);
        });
      }
    });
  }, [department]);

  // const formatFormName = () => {
  //   switch (department) {
  //     case StaffDepartment.HarvestInspection:
  //       return "harvestor";
  //     case StaffDepartment.TransportSupervision:
  //       return "inspector";
  //     case StaffDepartment.WarehouseSupervision:
  //       return "inspector";
  //     case StaffDepartment.SupervisingProducer:
  //       return "inspector";
  //     default:
  //       return "";
  //   }
  // };

  const formatLabelName = () => {
    switch (department) {
      case StaffDepartment.HarvestInspection:
        return "Havestor";
      case StaffDepartment.TransportSupervision:
        return "Transport Supervisor";
      case StaffDepartment.WarehouseSupervision:
        return "Warehouse Storage Supervisor";
      case StaffDepartment.SupervisingProducer:
        return "Production Supervisor";
      default:
        return "";
    }
  };

  return (
    <>
      <Modal
        title={props.title}
        open={props.isOpen}
        footer={null}
        maskClosable={false}
        closable={false}
        bodyStyle={{
          fontWeight: "500",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <div>
          <>
            {inspector !== null ? (
              <Col>
                <p style={{ fontSize: "18px", color: mainColor }}>
                  Information of Inspector
                </p>
                <LabelContentItem
                  myProps={{
                    label: "Email",
                    content: inspector.email,
                    width: "100%",
                  }}
                />
                <LabelContentItem
                  myProps={{
                    label: "Full Name",
                    content: `${inspector.lastName} ${inspector.firstName}`,
                    width: "100%",
                  }}
                />
                <LabelContentItem
                  myProps={{
                    label: "Phone Number",
                    content: inspector.phoneNumber ?? "None",
                    width: "100%",
                  }}
                />
                <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="default"
                    size="middle"
                    style={{ borderRadius: "4px" }}
                    onClick={props.onCancel}
                  >
                    Cancel
                  </Button>
                  <div style={{ padding: "4px" }}></div>
                  <Button
                    type="primary"
                    size="middle"
                    style={{ borderRadius: "4px" }}
                    onClick={() => {
                      Modal.confirm({
                        title: (
                          <div className="title-confirm-modal">
                            Remove Inspector
                          </div>
                        ),
                        content: (
                          <Col>
                            <p style={{ padding: "0", margin: "0" }}>
                              <span>Do you want to </span>
                              <span style={{ fontWeight: "600" }}>Remove</span>
                              <span> this Inspector?</span>
                            </p>
                            <p style={{ padding: "0", margin: "0" }}>
                              <span>If you</span>
                              <span style={{ fontWeight: "600" }}>
                                {' "Confirm" '}
                              </span>
                              <span>
                                this staff will not be enable to inspect project
                              </span>
                            </p>
                          </Col>
                        ),
                        onOk: () => {
                          props.onRemoveInspector();
                        },
                        okText: "Confirm",
                      });
                    }}
                  >
                    Remove
                  </Button>
                </Row>
              </Col>
            ) : (
              <Form
                form={form}
                onFinish={(value) => {
                  form.resetFields();
                  props.onFinsh(value);
                }}
              >
                <Form.Item label={formatLabelName()} name='emailInspector'>
                  <Select placeholder="Select Inspector">
                    {listInspectors.map((inspector) => (
                      <Select.Option
                        value={inspector.email}
                        key={inspector.userId}
                      >
                        <Tooltip
                          placement="right"
                          title={
                            `${inspector.lastName} ${inspector.firstName}` ??
                            "No name"
                          }
                        >
                          {inspector.email}
                        </Tooltip>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Row>
                    <Button
                      type="default"
                      size="middle"
                      style={{ borderRadius: "4px" }}
                      onClick={() => {
                        form.resetFields();
                        props.onCancel();
                      }}
                    >
                      Cancel
                    </Button>
                    <div style={{ padding: "4px" }}></div>
                    <Button
                      type="primary"
                      size="middle"
                      style={{ borderRadius: "4px" }}
                      htmlType="submit"
                    >
                      Assign
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            )}
          </>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdateInspector;
