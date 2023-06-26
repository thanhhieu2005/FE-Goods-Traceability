import UserManagementService from "@/api/admin_tech/user_management_service";
import StaffServices from "@/api/system_admin/staff_service";
import { successMessage } from "@/components/Message/MessageNoti";
import { contentLayout, tailUpdateContentLayout } from "@/styles/content_layout";
import { StaffDepartment, UserDetailModel, parseUserDetail } from "@/types/user";
import { parseToStringDepartment } from "@/utils/format_state";
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
  Select,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const StaffInfoDetail = () => {
  const { state: userId } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const [dataUserDetail, setDataUserDetail] = useState<UserDetailModel>();

  useEffect(() => {
    UserManagementService.getDetailUserByIdService(userId).then((res: any) => {
      console.log(res);
      
      const userDetail = parseUserDetail(res.data);
      
      setDataUserDetail(userDetail);

      console.log(dataUserDetail);

      setIsLoading(false);
    });
  }, []);

  // modal update role for staff
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);

  const showUpdateModal = () => {
    setUpdateIsModalOpen(true);
  };

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

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

  const handleCancelUpdate = () => {
    setUpdateIsModalOpen(false);
  };

  const listDepartments = [
    StaffDepartment.Empty,
    StaffDepartment.HarvestInspection,
    StaffDepartment.TransportSupervision,
    StaffDepartment.WarehouseSupervision,
    StaffDepartment.SupervisingProducer,
  ];


  return (
    <>
      {/* Modal */}
      {isUpdateModalOpen && (
        <Modal
          title="Update Staff Role"
          open={isUpdateModalOpen}
          maskClosable={false}
          footer={null}
        >
          <Form
            onFinish={(value) => {
              handleOkUpdate(value);
            }}
          >
            <Form.Item label="Department" name="department" initialValue={dataUserDetail?.department}>
              <Select placeholder="Select department">
                {listDepartments.map((department) => (
                  <Select.Option value={department} key={department}>
                    <span>{parseToStringDepartment(department)}</span>
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
                    <Button type="primary" onClick={showUpdateModal}>
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
                    initialValue={dataUserDetail?.role === 4 ? "Staff" : ""}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Department"
                    name="department"
                    initialValue={
                      dataUserDetail?.department != null ||
                      dataUserDetail?.department != undefined
                        ? parseToStringDepartment(dataUserDetail?.department)
                        : ""
                    }
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
