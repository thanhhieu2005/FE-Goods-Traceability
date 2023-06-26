import {
  GetHarvestDetailByIdAPI,
  UpdateHarvestAPI,
} from "@/api/harvest/harvest_api";
import DrawerEditHarvestor from "@/components/Drawer/DrawerEditHarvestor";
import LabelContentItem from "@/components/Label/LabelContentItem";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import StateCard from "@/components/Tag/StateCard";
import { CommonProjectState } from "@/types/project_model";
import { HarvestModel, parseHarvestData } from "@/types/step_tracking";
import { FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Modal, Row, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../common.scss";

const HarvestDetail = () => {
  const [dataHarvest, setDataHarvest] = useState<HarvestModel>();

  const { state: harvestId } = useLocation();

  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  useEffect(() => {
    GetHarvestDetailByIdAPI(harvestId).then((res: any) => {
      const harvest = parseHarvestData(res.data);
      setDataHarvest(harvest);
    });
  }, [harvestId]);

  const handleShowDrawerUpdate = () => {
    setIsOpenModalUpdate(true);
  };

  const handleCancelDrawerUpdate = () => {
    setIsOpenModalUpdate(false);
  };

  const onUpdateHarvestProject = async (value: any) => {

    const res: any = await UpdateHarvestAPI(value, harvestId);

    if (res.status == 200) {
      console.log(res);
      const newHarvest = parseHarvestData(res.data.harvest);

      setDataHarvest(newHarvest);

      setIsOpenModalUpdate(false);

      successMessage("Update Successfully!");
    } else if(res.response.status === 400) {
      errorMessage(res.response.data.message);
    } 
    else {
      errorMessage("Update Failed!");
    }
  };

  const checkHasProject = () => {
    if(dataHarvest?.projectId !== null) {
      setIsOpenModalUpdate(true);
    } else {
      Modal.warning({
        content: "You can't update this step because the project has not assigned yet."
      });
    }
  }

  return (
    <>
      {isOpenModalUpdate && (
        <DrawerEditHarvestor
          myProps={{
            dataHarvest: dataHarvest,
            showUpdate: handleShowDrawerUpdate,
            cancelCloseUpdate: handleCancelDrawerUpdate,
            submitUpdate: onUpdateHarvestProject,
          }}
        />
      )}
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-style">
              <Breadcrumb.Item>Harvest Management</Breadcrumb.Item>
              <Breadcrumb.Item>Harvest Project Detail</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Harvest Project Detail</div>
            <div className="sub-title-header">
              Display harvest project information, status and details of{" "}
              {dataHarvest?.projectCode}
            </div>
          </Col>
        </div>
        <div>
          {dataHarvest ? (
            <Col>
              <div className="content-page">
                <Col>
                  <div style={{ margin: "12px 0px" }}>
                    <StateCard myProps={{ state: dataHarvest?.state }} />
                  </div>
                  <Row
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="text-main-label">
                      Project:{" "}
                      <span style={{ color: "#1B9C85", fontWeight: "700" }}>
                        {dataHarvest.projectCode}
                      </span>
                    </p>

                    {dataHarvest.state === CommonProjectState.Completed ||
                    dataHarvest.state === CommonProjectState.Canceled ? (
                      <></>
                    ) : (
                      <div>
                        <Button
                          type="primary"
                          icon={<FormOutlined />}
                          size="large"
                          style={{ borderRadius: "4px" }}
                          onClick={() => {
                            checkHasProject();
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    )}
                  </Row>
                  <div style={{ padding: "8px 0px" }}>
                    <Row
                      style={{
                        display: "flex",
                        // justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Project ID: </span>
                        <span className="content-text">
                          {dataHarvest.projectId}
                        </span>
                      </p>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Harvest ID: </span>
                        <span className="content-text">
                          {dataHarvest.harvestId}
                        </span>
                      </p>
                    </Row>
                  </div>
                  <div className="space-padding" />
                  <Col>
                    <p className="text-main-label">Harvestor</p>
                    <Row style={{ paddingTop: "8px" }}>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Email: </span>
                        <span className="content-text">
                          {dataHarvest.inspector?.email}
                        </span>
                      </p>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Full Name: </span>
                        <span className="content-text">
                          {dataHarvest.inspector?.lastName}{" "}
                          {dataHarvest.inspector?.firstName}
                        </span>
                      </p>
                    </Row>
                  </Col>
                </Col>
              </div>
              <div className="space-padding" />
              <div className="content-page">
                <Col>
                  <p className="text-main-label">Harvest Information</p>
                  <div className="space-padding" />
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Total Harvest (ton)",
                        content: dataHarvest.totalHarvest ?? "Not Updat",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Temperature (°C)",
                        content: dataHarvest.totalHarvest ?? "Not Updat",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Ripeness (%)",
                        content: dataHarvest.ripeness ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Moisture",
                        content: dataHarvest.moisture ?? "Not Update",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Date Completed",
                        content:
                          dataHarvest.dateCompleted !== null
                            ? moment(dataHarvest.dateCompleted).format(
                                "DD/MM/YYYY"
                              )
                            : "Not update",
                        width: "100%",
                      }}
                    />
                  </Row>
                  <LabelContentItem
                    myProps={{
                      label: "Note",
                      content: dataHarvest.note ?? "Not Update",
                      width: "100%",
                    }}
                  />
                </Col>
              </div>
            </Col>
          ) : (
            <>
              <Spin tip="Loading" size="large">
                <div className="content-page" style={{ padding: "64px" }} />
              </Spin>
            </>
          )}
        </div>
      </Col>
    </>
  );
};

export default HarvestDetail;
