import UserManagementService from "@/api/admin_tech/user_management_service";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";

import "../../common.scss";
import {
  parseUserDetail,
  StaffDepartment,
  UserDetailModel,
  UserRole,
} from "@/types/user";
import { contentLayout } from "@/styles/content_layout";
import { checkRole } from "@/utils/checkRole";
import StaffServices from "@/api/system_admin/staff_service";
import { successMessage } from "@/components/Message/MessageNoti";
import { parseToStringRole } from "@/utils/format_state";

const AccountDetail = () => {
  const { state: userId } = useLocation();

  const [dataUserDetail, setDataUserDetail] = useState<UserDetailModel>();

  useEffect(() => {
    UserManagementService.getDetailUserByIdService(userId).then((res: any) => {
      const userDetail = parseUserDetail(res.data);
      setDataUserDetail(userDetail);
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  // modal update role
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);

  const showUpdateModal = () => {
    setUpdateIsModalOpen(true);
  }

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const listRoles = [
    UserRole.SystemAdmin,
    UserRole.Farmer,
    UserRole.Staff,
    UserRole.TechnicalAdmin,
  ];

  const handleCancelUpdate = () => {
    setUpdateIsModalOpen(false);
  };

  const handleOkUpdate = async(value: any) => {
    setIsLoadingUpdate(true);
    setIsLoading(true);

    if(dataUserDetail?.userId != undefined) {
      const result: any = await StaffServices.updateProfileUser(value, dataUserDetail?.userId);

      console.log(result);

      if(result.status === 200) {
        const userDetail = parseUserDetail(result.data);
        setDataUserDetail(userDetail);

        successMessage("Update Department Successfully!");
      }

    }

    setUpdateIsModalOpen(false);
    setIsLoadingUpdate(false);
    setIsLoading(false);
  };

  return (
    <>
         {isUpdateModalOpen && (
        <Modal
          title="Update Staff Role"
          open={isUpdateModalOpen}
          maskClosable={false}
          footer={null}
          closable={false}
        >
          <Form
            onFinish={(value) => {
              handleOkUpdate(value);
            }}
          >
            <Form.Item label="Role" name="role" initialValue={dataUserDetail?.role}>
              <Select placeholder="Select new role">
                {listRoles.map((role) => (
                  <Select.Option value={role} key={role}>
                    <span>{parseToStringRole(role)}</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                <Row>
                <Button
                    type="default"
                    size="middle"
                    onClick={handleCancelUpdate}
                  >
                    Cancel
                  </Button>
                  <div style={{paddingRight: '8px'}}/>
                  <Button
                    type="primary"
                    size="middle"
                    htmlType="submit"
                    loading={isLoadingUpdate}
                  >
                    Update
                  </Button>
                </Row>
              </div>
            </Form.Item>
           
          </Form>
        </Modal>
      )}
        <Col>
          <div className="header-content">
            <Col>
              <Breadcrumb className="breadcrumb-style">
                <Breadcrumb.Item>Account Management </Breadcrumb.Item>
                <Breadcrumb.Item>Account Detail</Breadcrumb.Item>
              </Breadcrumb>
              <div className="title-header">User Information</div>
              <div className="sub-title-header">
                Display detailed information of the user in the system, Admin can
                update the information for the account
              </div>
            </Col>
          </div>
          <div className="content-page">
            {!isLoading && dataUserDetail ? (
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
                      <Button type="primary" style={{ borderRadius: "4px" }} onClick={showUpdateModal}>
                        Update Role
                      </Button>
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
                      initialValue={checkRole(
                        dataUserDetail?.role,
                        StaffDepartment.Empty
                      )}
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
                <Skeleton avatar paragraph={{ rows: 4 }} />
              </div>
            )}
          </div>
        </Col>
    </>
  );
};

export default AccountDetail;
