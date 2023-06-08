import { ShowDrawerEdit } from "@/components/Drawer/DrawerEditItem";
import { TagStateCommonProject } from "@/components/Tag/StateTag";
import { contentLayout } from "@/styles/content_layout";
import { FarmProjectModel, LandState } from "@/types/farm_model";
import { mainColor } from "@/utils/app_color";
import { dateFormat } from "@/utils/formatDateTime";
import { EditOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Progress,
  Row,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const FarmProjectDetail = () => {
  const { state: farmProject } = useLocation();

  const [dataFarmProject, setDataFarmProject] =
    useState<FarmProjectModel>(farmProject);

  const [updateInfo, setUpdateInfo] = useState<boolean>(true);

  // update farm project

  const [isDrawerEditFarmProject, setIsDrawerEditFarmProject] = useState(false);

  const showEditFarmProject = () => {
    setIsDrawerEditFarmProject(true);
  };

  const cancelCloseEditFarmProject = () => {
    setIsDrawerEditFarmProject(false);
  };

  const submitEditLand = () => {
    setIsDrawerEditFarmProject(false);
  };

  console.log(dataFarmProject.farmer);

  return (
    <>
      {isDrawerEditFarmProject && (
        <ShowDrawerEdit
          myProps={{
            title: "Edit Farm Project",
            onOpen: showEditFarmProject,
            onClose: cancelCloseEditFarmProject,
            onsubmit: submitEditLand,
            content: (
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  Update new information for the farm project
                </div>
                <Form layout="vertical">
                  <Col></Col>
                </Form>
              </div>
            ),
          }}
        />
      )}
      {/* UI */}
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
            <div style={{ paddingTop: "24px" }}>
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                  <span style={{ fontSize: "24px", fontWeight: "500" }}>
                    Farm Project:{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: mainColor,
                    }}
                  >
                    {dataFarmProject.farmProjectCode}
                  </span>
                </p>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsDrawerEditFarmProject(true);
                  }}
                  icon={<EditOutlined key="edit" />}
                  style={{ borderRadius: "4px" }}
                >
                  Update Project
                </Button>
              </Row>
              {/* Main Content */}
              <Col>
                <div>
                  <p>
                    <span className="sub-text">Date Created: </span>
                    <span className="content-sub-text">
                      {moment(dataFarmProject.dateCreated).format("DD/MM/YYYY")}
                    </span>
                  </p>
                </div>
                <div style={{ marginTop: "24px" }}>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Row style={{ display: "flex", alignItems: "center" }}>
                      <p
                        className="title-text"
                        style={{ padding: "0", margin: "0" }}
                      >
                        Farm Project ID:
                      </p>
                      <div style={{ padding: "4px" }}></div>
                      <div className="outlined-border-box">
                        <p>{dataFarmProject.farmProjectId}</p>
                      </div>
                    </Row>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                      <p
                        className="title-text"
                        style={{ padding: "0", margin: "0" }}
                      >
                        Farm Project Code:
                      </p>
                      <div style={{ padding: "4px" }}></div>
                      <div className="outlined-border-box">
                        <p>{dataFarmProject.farmProjectCode}</p>
                      </div>
                    </Row>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                      <p
                        className="title-text"
                        style={{ padding: "0", margin: "0" }}
                      >
                        Farm ID:
                      </p>
                      <div style={{ padding: "4px" }}></div>
                      <div className="outlined-border-box">
                        <p>{dataFarmProject.farmId}</p>
                      </div>
                    </Row>
                  </Row>
                </div>
                <div className="divided" />
                {/* Farmer */}
                <div>
                  <Col>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                      <p
                        className="text-main-label"
                        style={{ fontWeight: 500 }}
                      >
                        Farmer in charge:{" "}
                      </p>
                      {dataFarmProject.farmer !== null ? (
                        <p>{dataFarmProject.farmer.email}</p>
                      ) : (
                        <div
                          style={{
                            marginLeft: "8px",
                            padding: "4px",
                            borderStyle: "solid",
                            borderWidth: "1px",
                            borderRadius: "8px",
                            color: "#D9DDDC",
                          }}
                        >
                          <p style={{ fontSize: "18px", fontWeight: "700" }}>
                            Not Assigned Yet
                          </p>
                        </div>
                      )}
                    </Row>
                  </Col>
                </div>
                <div style={{ padding: "24px" }} />
                {/* Farm Project Info */}
                <div>
                  <Col>
                    <p
                      className="text-main-label"
                      style={{ fontWeight: 500, paddingBottom: "24px" }}
                    >
                      Information
                    </p>
                    <Row style={{ display: "flex", paddingBottom: "12px" }}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Total Harvest: </p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">
                          {dataFarmProject.totalHarvest ?? "Not update"}
                        </p>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Total seeds:</p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">{"Not update"}</p>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Fertilizer Used:</p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">
                          {dataFarmProject.fertilizerUsed ?? "Not update"}
                        </p>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Total Fertilizers:</p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">{"Not update"}</p>
                      </Row>
                    </Row>
                    <Row style={{ display: "flex", paddingBottom: "12px" }}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Date Harvested </p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">
                          {dataFarmProject.dateHarvested !== null
                            ? moment(dataFarmProject.dateHarvested).format(
                                "DD/MM/YYYY"
                              )
                            : "Not update"}
                        </p>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Ripeness(%):</p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">{"Not update"}</p>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Pesticides:</p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">{"Not update"}</p>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Plant Density:</p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">{dataFarmProject.note ??"Not update"}</p>
                      </Row>
                    </Row>
                    <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25%",
                        }}
                      >
                        <p className="title-text">Note:</p>
                        <div style={{ padding: "4px" }}></div>
                        <p className="content-text">{"Not update"}</p>
                      </Row>
                  </Col>
                </div>
              </Col>
            </div>
          </Col>
        </div>
        <div style={{ padding: "12px" }}></div>
        <Row>
          <div className="content-page" style={{ width: "49%" }}>
            <Col>
              <div className="text-main-label" style={{ color: "#ABC4AA" }}>
                <p>Land Information</p>
              </div>
              <div style={{ padding: "12px" }} />
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Col>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <p className="title-text">Land ID:</p>
                    <div style={{ padding: "4px" }}></div>
                    <p className="content-text">
                      {dataFarmProject.land.landId}
                    </p>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <p className="title-text">Land Name:</p>
                    <div style={{ padding: "4px" }}></div>
                    <p className="content-text">
                      {dataFarmProject.land.landName}
                    </p>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <p className="title-text">Land Area:</p>
                    <div style={{ padding: "4px" }}></div>
                    <p className="content-text">
                      {dataFarmProject.land.landArea} (m2)
                    </p>
                  </Row>
                </Col>
                <Col style={{ marginRight: "24px" }}>
                  <p
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      marginBottom: "4px",
                    }}
                    className="content-text"
                  >
                    State
                  </p>
                  {dataFarmProject.land.state === LandState.Cultivating ? (
                    <Progress
                      percent={70}
                      format={() => (
                        <p style={{ fontSize: "16px", color: "#87d068" }}>
                          Cultivating
                        </p>
                      )}
                      type="circle"
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                    />
                  ) : (
                    <Progress
                      percent={0}
                      format={() => (
                        <p style={{ fontSize: "16px", color: "#999DA0" }}>
                          Unfulfilled
                        </p>
                      )}
                      type="circle"
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </div>
          <div style={{ width: "2%" }}></div>
          <div className="content-page" style={{ width: "49%" }}>
            <Col>
              <div className="text-main-label" style={{ color: "#675D50" }}>
                <p>Seed Information</p>
              </div>
              <div style={{ padding: "12px" }} />
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Col>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <p className="title-text">Seed ID:</p>
                    <div style={{ padding: "4px" }}></div>
                    <p className="content-text">
                      {dataFarmProject.seed.seedId}
                    </p>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <p className="title-text">Seed Name:</p>
                    <div style={{ padding: "4px" }}></div>
                    <p className="content-text">
                      {dataFarmProject.seed.seedName}
                    </p>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <p className="title-text">Seed Family:</p>
                    <div style={{ padding: "4px" }}></div>
                    <p className="content-text">
                      {dataFarmProject.seed.seedFamily} (m2)
                    </p>
                  </Row>
                </Col>
              </Row>
            </Col>
          </div>
        </Row>
      </Col>
    </>
  );
};

export default FarmProjectDetail;
