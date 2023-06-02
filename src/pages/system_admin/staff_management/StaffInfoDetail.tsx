import UserManagementService from "@/api/admin_tech/user_management_service";
import { contentLayout } from "@/styles/content_layout";
import { UserDetailModel, parseUserDetail } from "@/types/user";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Skeleton,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const StaffInfoDetail = () => {
  const { state: userId } = useLocation();

  const [dataUserDetail, setDataUserDetail] = useState<UserDetailModel>();

  useEffect(() => {
    UserManagementService.getDetailUserByIdService(userId).then((res: any) => {
      const userDetail = parseUserDetail(res.data);
      setDataUserDetail(userDetail);

      console.log(dataUserDetail);
    });
  }, []);

  // modal update role for staff
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);

  const showUpdateModal = () => {
    setUpdateIsModalOpen(true);
  }; 

  const handleOkUpdate = () => {
    setUpdateIsModalOpen(false);
  };

  const handleCancelUpdate = () => {
    setUpdateIsModalOpen  (false);
  };

  return (
   <>
    {/* Modal */}
    {isUpdateModalOpen && (
      <Modal
        title="Update Staff Role"
        open={isUpdateModalOpen}
        onCancel={handleCancelUpdate}
        onOk={handleOkUpdate}
        maskClosable={false}
      >

      </Modal>
    )}

    {/* UI screen */}
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-style">
              <Breadcrumb.Item>Staff Management </Breadcrumb.Item>
              <Breadcrumb.Item>Staff Detail</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Staff Information</div>
            <div className="sub-title-header">
              Display detailed information of the staff in the system, System
              Admin can update department or revoke the right of the staff.
            </div>
          </Col>
        </div>
        <div className="content-page">
          {dataUserDetail ? (
            <Col>
              <div style={{ paddingBottom: "64px" }}>
                <Row style={{ display: "flex", alignContent: "center" }}>
                  <Row style={{ width: "80%" }}>
                    <Avatar size={80} icon={<UserOutlined />} />
                    <div
                      style={{
                        paddingLeft: "12px",
                        fontWeight: "600",
                        fontSize: "24px",
                        display: "flex",
                        alignContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {dataUserDetail?.lastName} {dataUserDetail?.firstName}
                    </div>
                  </Row>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      flexWrap: "wrap",
                      width: "20%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button type="primary" onClick={showUpdateModal}>Update Role</Button>
                  </div>
                </Row>
              </div>
              <div>
                <Form {...contentLayout} disabled>
                  <Form.Item
                    label="User ID"
                    name="userId"
                    initialValue={dataUserDetail?.userId}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    initialValue={dataUserDetail?.email}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Wallet Address"
                    name="walletAddress"
                    initialValue={dataUserDetail?.walletAddress}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="User Role"
                    name="role"
                    initialValue={dataUserDetail?.role === 4 ? "Staff" : ""}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    initialValue={dataUserDetail?.phoneNumber ?? ""}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    name="address"
                    initialValue={dataUserDetail?.address ?? ""}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </div>
            </Col>
          ) : (
            <div>
              <Spin tip="Loading" size="large">
                <div className="content-page" />
              </Spin>
            </div>
          )}
        </div>
      </Col>
   </>
  );
};

export default StaffInfoDetail;
