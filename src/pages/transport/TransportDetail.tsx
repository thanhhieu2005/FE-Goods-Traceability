import { GetTransportDetailByIdAPI, UpdateTransportAPI } from "@/api/transport_api";
import { logoVerify } from "@/assets";
import DrawerEditTransport from "@/components/Drawer/DrawerEditTransport";
import LabelContentItem from "@/components/Label/LabelContentItem";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import SpinApp from "@/components/Spin/SpinApp";
import StateCard from "@/components/Tag/StateCard";
import { CommonProjectState } from "@/types/project_model";
import { TransportModel, parseTransportData } from "@/types/step_tracking";
import { FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Modal, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TransportDetail = () => {
  const [dataTransport, setDataTransport] = useState<TransportModel>();

  const { state: transportId } = useLocation();

  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  useEffect(() => {
    GetTransportDetailByIdAPI(transportId).then((res: any) => {
      console.log(res);
      const transport = parseTransportData(res.data);
      setDataTransport(transport);
    });
  }, []);

  const handleShowDrawerUpdate = () => {
    setIsOpenModalUpdate(true);
  };

  const handleCancelDrawerUpdate = () => {
    setIsOpenModalUpdate(false);
  };

  const checkHasProject = () => {
    if (dataTransport?.projectId !== null) {
      setIsOpenModalUpdate(true);
    } else {
      Modal.warning({
        content:
          "You can't update this step because the project has not assigned yet.",
      });
    }
  };

  return (
    <>
      {isOpenModalUpdate && (
        <DrawerEditTransport
          myProps={{
            dataTransport: dataTransport,
            showUpdate: handleShowDrawerUpdate,
            cancelCloseUpdate: handleCancelDrawerUpdate,
            setDataTransport: setDataTransport,
            setIsOpenModalUpdate: setIsOpenModalUpdate,
          }}
        />
      )}
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-style">
              <Breadcrumb.Item>
                Transport Supervision Management
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Transport Supervision Project Detail
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Transport Supervision</div>
            <div className="sub-title-header">
              Display transport project information, status and details of{" "}
              {dataTransport?.projectCode}
            </div>
          </Col>
        </div>
        <div>
          {dataTransport ? (
            <Col>
              <div className="content-page">
                <Col>
                <Row
                    style={{
                      margin: "12px 0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <StateCard myProps={{ state: dataTransport.state }} />
                    {dataTransport.state === CommonProjectState.Completed ? (
                      <img src={logoVerify} height={144} />
                    ) : (
                      <></>
                    )}
                  </Row>
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
                      <span style={{ color: "#0E2954", fontWeight: "700" }}>
                        {dataTransport.projectCode}
                      </span>
                    </p>

                    {dataTransport.state === CommonProjectState.Completed ||
                    dataTransport.state === CommonProjectState.Canceled ? (
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
                          {dataTransport.projectId}
                        </span>
                      </p>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Transport ID: </span>
                        <span className="content-text">
                          {dataTransport.transportId}
                        </span>
                      </p>
                    </Row>
                  </div>
                  <div className="space-padding" />
                  <Col>
                    <p className="text-main-label">Transport Supervisor</p>
                    <Row style={{ paddingTop: "8px" }}>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Email: </span>
                        <span className="content-text">
                          {dataTransport.inspector?.email}
                        </span>
                      </p>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Full Name: </span>
                        <span className="content-text">
                          {dataTransport.inspector?.lastName}{" "}
                          {dataTransport.inspector?.firstName}
                        </span>
                      </p>
                    </Row>
                  </Col>
                </Col>
              </div>
              <div className="space-padding" />
              <div className="content-page">
                <Col>
                  <p className="text-main-label">
                    Transport Supervision Infomation
                  </p>
                  <div className="space-padding" />
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Total Input (ton)",
                        content: dataTransport.totalInput ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Transport Company",
                        content: dataTransport.transportName ?? "Not Update",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Type of Vehicle",
                        content: dataTransport.vehicleType ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Number of Vehicles",
                        content: dataTransport.numberOfVehicle ?? "Not Update",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Date Expected",
                        content:
                          dataTransport.dateExpected !== null
                            ? moment(dataTransport.dateExpected).format(
                                "DD/MM/YYYY"
                              )
                            : "Not update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Date Completed",
                        content:
                          dataTransport.dateCompleted !== null
                            ? moment(dataTransport.dateCompleted).format(
                                "DD/MM/YYYY"
                              )
                            : "Not update",
                      }}
                    />
                  </Row>
                </Col>
              </div>
            </Col>
          ) : (
            <>
              <SpinApp/>
            </>
          )}
        </div>
      </Col>
    </>
  );
};

export default TransportDetail;
