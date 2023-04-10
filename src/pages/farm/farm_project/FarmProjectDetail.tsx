import { TagStateCommonProject } from "@/components/Tag/StateTag";
import { contentLayout } from "@/styles/content_layout";
import { FarmProjectModel } from "@/types/farm_model";
import { dateFormat } from "@/utils/formatDateTime";
import { Breadcrumb, Button, Col, DatePicker, Form, Input, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const FarmProjectDetail = () => {
  const { state: farmProject } = useLocation();

  const [dataFarmProject, setDataFarmProject] =
    useState<FarmProjectModel>(farmProject);

  const [updateInfo, setUpdateInfo] = useState<boolean>(true);

  console.log(dataFarmProject.fertilizerUsed);
  return (
    <Col>
      <div className="header-content">
        <Col>
          <Breadcrumb className="breadcrumb-style">
            <Breadcrumb.Item>Farm Project Management</Breadcrumb.Item>
            <Breadcrumb.Item>Farm Project Detail</Breadcrumb.Item>
          </Breadcrumb>
          <div className="title-header">Farm Project Information</div>
          <div className="sub-title-header">
            Display detailed information and status of the farm project
          </div>
        </Col>
      </div>
      <div className="content-page">
        <Col>
          <div style={{ paddingTop: "64px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="primary"
                onClick={() => {
                  setUpdateInfo(false);
                }}
              >
                Update Project
              </Button>
            </div>
            <div className="text-title">Overview Farm Project</div>
            <Form {...contentLayout} disabled>
              <Form.Item label="Project State" name="state">
                {TagStateCommonProject(dataFarmProject.state)}
              </Form.Item>
              <Form.Item
                label="Farm Project ID"
                name="farmProjectId"
                initialValue={dataFarmProject.farmProjectId}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Project ID"
                name="projectId"
                initialValue={
                  dataFarmProject.projectId ??
                  "Farm Project has not been assigned to the project"
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Farm ID"
                name="farmId"
                initialValue={dataFarmProject.farmId}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Farm Code"
                name="farmCode"
                initialValue={dataFarmProject.farmProjectCode}
              >
                <Input />
              </Form.Item>
            </Form>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <div className="text-title">Land Information</div>
            </Row>
            {dataFarmProject.land ? (
              <Form {...contentLayout} disabled>
                <Form.Item
                  label="Land ID"
                  name="landId"
                  initialValue={dataFarmProject.land.landId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Land Name"
                  name="landName"
                  initialValue={dataFarmProject.land.landName}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Land Area (m2)"
                  name="landArea"
                  initialValue={dataFarmProject.land.landArea}
                >
                  <Input />
                </Form.Item>
              </Form>
            ) : (
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  fontStyle: "italic",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                The land for the project has not been updated yet
              </div>
            )}
            <div className="text-title">Seed Information</div>
            {dataFarmProject.seed ? (
              <Form {...contentLayout} disabled>
                <Form.Item
                  label="Seed ID"
                  name="seedId"
                  initialValue={dataFarmProject.seed.seedId}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Seed Name"
                  name="seedName"
                  initialValue={dataFarmProject.seed.seedName}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Seed Family"
                  name="seedFamily"
                  initialValue={dataFarmProject.seed.seedFamily}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Seed Supplier"
                  name="seedSupplier"
                  initialValue={dataFarmProject.seed.supplier}
                >
                  <Input />
                </Form.Item>
              </Form>
            ) : (
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  fontStyle: "italic",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                The land for the project has not been updated yet
              </div>
            )}
            <div className="text-title">Farm Project Information</div>
            <Form {...contentLayout} disabled={updateInfo}>
              <Form.Item
                label="Date Created"
                name="dateCreate"
                initialValue={moment(dataFarmProject.dateCreated).format(
                  "DD/MM/YYYY"
                )}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Fertilizer Used"
                name="fertilizerUsed"
                initialValue={
                  dataFarmProject.fertilizerUsed ?? "No Information"
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Total Harvest"
                name="totalHarvest"
                initialValue={dataFarmProject.totalHarvest ?? "No Information"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Date Harvested"
                name="dateHarvested"
                initialValue={
                  dataFarmProject.dateHarvested != null
                    ? moment(dataFarmProject.dateHarvested).format("DD/MM/YYYY")
                    : null
                }
              >
                {updateInfo ? (
                  <Input />
                ) : (
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                )}
              </Form.Item>
            </Form>
          </div>
        </Col>
      </div>
    </Col>
  );
};

export default FarmProjectDetail;
