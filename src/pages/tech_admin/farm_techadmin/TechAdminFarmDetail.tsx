import { AuditOutlined, TeamOutlined } from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";

import FarmManagementService from "@/api/admin_tech/farm_management_services";
import CardCustom from "@/components/Card/Card";
import { contentLayout } from "@/styles/content_layout";
import { FarmInfoModel } from "@/types/farm_model";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { Badge, Breadcrumb, Button, Card, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { icLand, icSeed } from "@/assets";

const TechAdminFarmDetail = () => {
  const { state: farmId } = useLocation();

  const [dataFarm, setDataFarm] = useState<FarmInfoModel>();

  useEffect(() => {
    FarmManagementService.getFarmDetailService(farmId).then((res: any) => {
      if (res.status === 200) {
        console.log(res.data);
        setDataFarm(res.data);
      }
    });
  }, []);

  console.log(dataFarm);

  const farmCardProps = {
    title: "Famers",
    content: "10",
    onClick: () => {
      {
        console.log("Watch Detail");
      }
    },
    icon: <TeamOutlined style={{ fontSize: "36px" }} />,
    contentColor: "#1F8A70",
  };

  const farmProjectProps = {
    title: "Projects",
    content: "20",
    onClick: () => {
      {
        console.log("Watch Detail");
      }
    },
    icon: <AuditOutlined style={{ fontSize: "36px" }} />,
    contentColor: "#002766",
  };

  const landProjectProps = {
    title: "Lands",
    content: "30",
    onClick: () => {
      {
        console.log("Watch Detail");
      }
    },
    contentColor: "#A75D5D",
    icon: <img src={icLand} width="36px" height="36px" />,
  };

  const seedProjectProps = {
    title: "Seeds",
    content: "30",
    onClick: () => {
      {
        console.log("Watch Detail");
      }
    },
    contentColor: "#227C70",
    icon: <img src={icSeed} width="36px" height="36px" />,
  };

  return (
    <Col>
      <div className="header-content">
        <Col>
          <Breadcrumb className="breadcrumb-sytle">
            <Breadcrumb.Item>Farm Management</Breadcrumb.Item>
            <Breadcrumb.Item>Farm Detail</Breadcrumb.Item>
          </Breadcrumb>
          <div className="title-header">Farm Information</div>
          <div className="sub-title-header">
            Display detailed information and update status information for the
            farm
          </div>
        </Col>
      </div>
      {dataFarm ? (
        <>
          <div className="content-page">
            <Col>
              {/* background image of farm */}
              {/* <div style={{minWidth: '100%', minHeight: '120px', backgroundColor:'grey', marginBottom: "32px", marginTop: "16px"}}/> */}
              <div style={{ padding: "24px 36px" }}>
                <Row
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CardCustom myProp={farmCardProps} />
                  <CardCustom myProp={farmProjectProps} />
                  <CardCustom myProp={landProjectProps} />
                  <CardCustom myProp={seedProjectProps} />
                </Row>
              </div>
              <div>
                <Row
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="text-title">Farm Information</p>
                  <Button type="primary">Update Status</Button>
                </Row>
              </div>
              <div>
                <Form {...contentLayout}>
                  <Form.Item label="Farm Status" name="status">
                    <Row
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        alignItems: "center",
                      }}
                    >
                      <Badge status="success" style={{ paddingRight: "8px" }} />
                      <div
                        style={{
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#52c41a",
                        }}
                      >
                        Actived
                      </div>
                    </Row>
                  </Form.Item>
                </Form>
                <Form {...contentLayout} disabled>
                  <Form.Item
                    label="Farm ID"
                    name="farmId"
                    required
                    initialValue={dataFarm.farmId}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Farm Code"
                    name="farmCode"
                    required
                    initialValue={dataFarm.farmCode}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Farm Name"
                    name="farmName"
                    required
                    initialValue={dataFarm.farmName}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Farm Address"
                    name="farmAddress"
                    initialValue={dataFarm.farmAddress}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Farm Phone Number"
                    name="farmPhoneNumber"
                    initialValue={dataFarm.farmPhoneNumber}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Date Created"
                    name="dateCreated"
                    initialValue={dataFarm.dateCreated}
                  >
                    <Input />
                  </Form.Item>
                </Form>
                <div>
                  <Row
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="text-title">Owner Information</p>
                    <Button type="primary">Update Owner</Button>
                  </Row>
                </div>
                <Form {...contentLayout} disabled>
                  <Form.Item
                    label="Owner ID"
                    name="ownerId"
                    initialValue={
                      dataFarm.farmOwner !== null
                        ? dataFarm.farmOwner?.userId
                        : ""
                    }
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Owner Email" name="ownerEmail" initialValue={
                      dataFarm.farmOwner !== null
                        ? dataFarm.farmOwner?.email
                        : ""
                    }>
                    <Input />
                  </Form.Item>
                  {/* <Form.Item label="Owner Name" name="ownerName" >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Owner Name" name="ownerName">
                    <Input />
                  </Form.Item> */}
                </Form>
              </div>
            </Col>
          </div>
        </>
      ) : (
        <></>
      )}
    </Col>
  );
};

export default TechAdminFarmDetail;
