import FarmServices from "@/api/farm/farm_api";
import DrawerUpdateFarmProjectInfo from "@/components/Drawer/Farm/DrawerUpdateFarmProjectInfo";
import DrawerUpdateFarmPropject from "@/components/Drawer/Farm/DrawerUpdateFarmPropject";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import SpinApp from "@/components/Spin/SpinApp";
import StateCard from "@/components/Tag/StateCard";
import { FarmProjectModel, LandState } from "@/types/farm_model";
import { CommonProjectState } from "@/types/project_model";
import { UserDetailModel } from "@/types/user";
import { mainColor, whiteColor } from "@/utils/app_color";
import { EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Modal, Progress, Row, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const FarmProjectDetail = () => {
  const { state: farmProject } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const isOwner = useSelector(
    (state: any) => state.authen.currentUserInfo.isOwner
  );

  const currentUser : UserDetailModel = useSelector((state: any) => state.authen.currentUserInfo);

  useEffect(() => {
    const getFarmProjectDetail = async () => {
      try {
        const res: any = await FarmServices.getFarmProjectDetail(
          farmProject.farmProjectId
        );

        console.log(res);

        if (res.status === 200) {
          setDataFarmProject(res.data);
        }
      } catch (error) {
        //handle
      }
    };
    getFarmProjectDetail();
  }, [farmProject.farmProjectId]);

  const [dataFarmProject, setDataFarmProject] =
    useState<FarmProjectModel>(farmProject);

  // update farm project info

  const [isDrawerEditFarmProject, setIsDrawerEditFarmProject] = useState(false);

  const showEditFarmProject = () => {
    setIsDrawerEditFarmProject(true);
  };

  const cancelCloseEditFarmProject = () => {
    setIsDrawerEditFarmProject(false);
  };

  const handleOkUpdateSuccess = () => {
    setIsLoading(false);
  };

  const submitEditProject = async (value: any) => {
    if (value.farmer === "Not Assigned yet") {
      value.farmer = null;
    }

    if (value.seed === dataFarmProject.seed.seedName) {
      value.seed = dataFarmProject.seed.seedId;
    }

    if (value.land === dataFarmProject.land.landName) {
      value.land = dataFarmProject.land.landId;
    }

    const result: any = await FarmServices.updateFarmProject(
      dataFarmProject.farmProjectId,
      value
    );

    console.log(result);

    if (result.status == 200) {
      setIsLoading(true);
      Modal.success({
        content: "Update project successfully!",
        onOk: handleOkUpdateSuccess,
      });

      setDataFarmProject(result.data);
    }
    setIsDrawerEditFarmProject(false);
  };

  // update farm project progress
  const [isUpdateFarmProjectProgress, setIsUpdateFarmProjectProgress] =
    useState(false);

  const cancelUpdateFarmProjectProgress = () => {
    setIsUpdateFarmProjectProgress(false);
  };

  const showUpdateFarmProjectProgress = () => {
    setIsUpdateFarmProjectProgress(true);
  };

  const handleUpdateFarmProjectProgress = async (value: any) => {
    console.log(value);

    if (value.state === CommonProjectState.Completed) {
      Modal.confirm({
        content: `When you confirm "Completed", you will not be able to change the project information!`,
        onOk: () => {
          updateFarmProjectProgress(value);
        },
      });
    } else if (value.state === CommonProjectState.Canceled) {
      Modal.confirm({
        content: `When you confirm "Canceled", you will not be able to change the project information!`,
        onOk: () => {
          updateFarmProjectProgress(value);
        },
      });
    } else {
      updateFarmProjectProgress(value);
    }
  };

  const updateFarmProjectProgress = async (value: any) => {
    console.log(value);

    const res: any = await FarmServices.updateFarmProject(
      dataFarmProject.farmProjectId,
      value
    );

    if (res.status === 200) {
      setIsLoading(true);
      console.log(res);
      successMessage("Update successfully!");
      setDataFarmProject(res.data);

      setIsUpdateFarmProjectProgress(false);
      setIsLoading(false);
    } else {
      console.log(res);
      errorMessage(res.response.data.message);
      setIsLoading(false);
    }
  };

  const checkPermissionToUpdateProject = () => {
    if(dataFarmProject.farmer !== null) {
      if(dataFarmProject.farmer.userId === currentUser.userId) {
        setIsUpdateFarmProjectProgress(true);
      } else {
        Modal.warning({
          content: 'You are not a farmer in this project!',
        })
      }
    } else {
      Modal.warning({
        content: "Farm Project has not been implemented by farmer yet!",
        onOk: () => {setIsDrawerEditFarmProject(true)},
      })
    }
  }

  return (
    <>
      {isUpdateFarmProjectProgress && (
        <DrawerUpdateFarmPropject
          myProps={{
            dataFarmProject: dataFarmProject,
            showProgressUpdate: showUpdateFarmProjectProgress,
            cancelCloseProgressUpdate: cancelUpdateFarmProjectProgress,
            submitUpdateFarmProject: handleUpdateFarmProjectProgress,
          }}
        />
      )}
      {isDrawerEditFarmProject && (
        <DrawerUpdateFarmProjectInfo
          myProps={{
            dataFarmProject: dataFarmProject,
            showEditFarmProject: showEditFarmProject,
            cancelCloseEditFarmProject: cancelCloseEditFarmProject,
            submitEditProject: submitEditProject,
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
        {isLoading === false ? (
          <>
            <div className="content-page">
              <Col>
                <div style={{ paddingTop: "24px" }}>
                  <Row
                    style={{
                      paddingBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <StateCard
                      myProps={{
                        state: dataFarmProject.state,
                      }}
                    />
                  </Row>
                  <Row
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                        {dataFarmProject?.farmProjectCode}
                      </span>
                    </p>
                    <Row>
                      {dataFarmProject.state === CommonProjectState.Canceled ||
                      dataFarmProject.state === CommonProjectState.Completed ? (
                        <></>
                      ) : (
                        <>
                          <Button
                            type="primary"
                            onClick={() => {
                              // setIsUpdateFarmProjectProgress(true);
                              checkPermissionToUpdateProject();
                            }}
                            icon={<EditOutlined key="edit" />}
                            style={{
                              borderRadius: "4px",
                              color: whiteColor,
                              backgroundColor: mainColor,
                              borderColor: mainColor,
                            }}
                          >
                            Update Project
                          </Button>
                        </>
                      )}
                      <div style={{ padding: "12px" }}></div>
                      {isOwner ? (
                        <Button
                          type="primary"
                          onClick={() => {
                            setIsDrawerEditFarmProject(true);
                          }}
                          icon={<EditOutlined key="edit" />}
                          style={{ borderRadius: "4px" }}
                        >
                          Update Info
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Row>
                  </Row>
                  {/* Main Content */}
                  <Col>
                    <div>
                      <p>
                        <span className="sub-text">Date Created: </span>
                        <span className="content-sub-text">
                          {moment(dataFarmProject.dateCreated).format(
                            "DD/MM/YYYY"
                          )}
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
                            <div
                              style={{
                                marginLeft: "8px",
                                padding: "4px",
                                borderStyle: "solid",
                                borderWidth: "1px",
                                borderRadius: "8px",
                                color: mainColor,
                              }}
                            >
                              <p
                                style={{ fontSize: "18px", fontWeight: "700" }}
                              >
                                {dataFarmProject.farmer.email}
                              </p>
                            </div>
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
                              <p
                                style={{ fontSize: "18px", fontWeight: "700" }}
                              >
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
                              width: "15%",
                            }}
                          >
                            <p className="title-text">Total seeds:</p>
                            <div style={{ padding: "4px" }}></div>
                            <p className="content-text">
                              {dataFarmProject.totalSeeds ?? "Not update"}
                            </p>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "35%",
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
                            <p className="content-text">
                              {dataFarmProject.totalFertilizers ?? "Not update"}
                            </p>
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
                              width: "15%",
                            }}
                          >
                            <p className="title-text">Ripeness(%):</p>
                            <div style={{ padding: "4px" }}></div>
                            <p className="content-text">
                              {dataFarmProject.ripeness ?? "Not update"}
                            </p>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "35%",
                            }}
                          >
                            <p className="title-text">Pesticides:</p>
                            <div style={{ padding: "4px" }}></div>
                            <p className="content-text">
                              {dataFarmProject.pesticide ?? "Not update"}
                            </p>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "25%",
                            }}
                          >
                            <p className="title-text">Plant Density(/ha):</p>
                            <div style={{ padding: "4px" }}></div>
                            <p className="content-text">
                              {dataFarmProject.plantDensity ?? "Not update"}
                            </p>
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
                          <p className="content-text">{ dataFarmProject.note }</p>
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
                          {dataFarmProject.seed.seedFamily}
                        </p>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </>
        ) : (
          <SpinApp/>
        )}
      </Col>
    </>
  );
};

export default FarmProjectDetail;
