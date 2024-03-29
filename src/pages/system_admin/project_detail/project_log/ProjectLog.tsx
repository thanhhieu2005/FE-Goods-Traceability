import { Breadcrumb, Col, Empty, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import HarvestLogInfoCard from "@/components/Card/LogInfo/HarvestLogInfoCard";
import ProduceLogInfoCard from "@/components/Card/LogInfo/ProduceLogInfoCard";
import ProjectLogInfoCard from "@/components/Card/LogInfo/ProjectLogInfoCard";
import TransportLogInfoCard from "@/components/Card/LogInfo/TransportLogInfoCard";
import WarehouseLogInfoCard from "@/components/Card/LogInfo/WarehouseLogInfoCard";
import LabelContentItem from "@/components/Label/LabelContentItem";
import SpinApp from "@/components/Spin/SpinApp";
import { LogEnum, LogModel } from "@/types/project_log_model";
import moment from "moment";
import "./log.scss";
import FarmProjectLogInfoCard from "@/components/Card/LogInfo/FarmProjectLogInfoCard";
import { useSelector } from "react-redux";
import { checkIsModePublic } from "@/utils/validation/check_wallet_address";

const ProjectLog = () => {
  const { state: modelLog } = useLocation();

  const currentMode: string = useSelector(
    (state: any) => state.mode.currentMode
  );

  console.log(modelLog);

  const [isLoading, setIsLoading] = useState(true);

  const parseJson = (json: string) => {
    const obj: any = JSON.parse(json);

    return obj;
  };

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    // Scroll to Top window
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    modelLog.listLog.map((e: any) => {
      e.modelAfterChanged = parseJson(e.modelAfterChanged);
      e.modelBeforeChanged = parseJson(e.modelBeforeChanged);
    });

    setTitle(renderTitle(modelLog.type));

    setIsLoading(false);
  }, [modelLog.listLog, modelLog.type]);

  const renderTitle = (type: LogEnum) => {
    switch (type) {
      case LogEnum.Project:
        return "Project";
      case LogEnum.Harvest:
        return "Harvest Inspection";
      case LogEnum.Transport:
        return "Transport Supervision";
      case LogEnum.Warehouse:
        return "Warehouse Supervision";
      case LogEnum.Produce:
        return "Production Supervision";
      case LogEnum.Farm:
        return "Farm Project";
      default:
        return "";
    }
  };

  return (
    <>
      {!isLoading ? (
        <>
          <Col>
            <div className="header-content">
              <Col>
                <Breadcrumb className="breadcrumb-style">
                  <Breadcrumb.Item>Project Detail</Breadcrumb.Item>
                  <Breadcrumb.Item>{title} Log</Breadcrumb.Item>
                </Breadcrumb>
                <div className="title-header">{title} Logs</div>
                <div className="sub-title-header">
                  Information about the status update changes of the shipment is
                  described in the form of tracking information
                </div>
              </Col>
            </div>
            <div className="content-page">
              <Col>
                <p className="log-title-text">List Logs of {title}</p>
                <div className="space-padding" />{" "}
                {modelLog.listLog.length !== 0 ? (
                  modelLog.listLog.map((log: LogModel, key: number) => (
                    <div key={key} className="log-container">
                      <Col>
                        <div className="card-border-title">
                          <p>
                            <span
                              style={{ fontSize: "16px", fontWeight: "600" }}
                            >
                              Log:{" "}
                            </span>
                            <span
                              style={{ fontSize: "20px", fontWeight: "600" }}
                            >
                              {key}
                            </span>
                          </p>
                        </div>
                        <div style={{ padding: "4px" }} />
                        <Row>
                          <LabelContentItem
                            myProps={{
                              label: "ID",
                              content: log._id,
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Actor ID",
                              content: log.actor,
                            }}
                          />
                        </Row>
                        <Row>
                          <LabelContentItem
                            myProps={{
                              label: "Date Created",
                              content: moment(log.createdAt).format(
                                "DD/MM/yyyy"
                              ),
                            }}
                          />
                          <LabelContentItem
                            myProps={{
                              label: "Date Updated",
                              content: moment(log.updatedAt).format(
                                "DD/MM/yyyy"
                              ),
                            }}
                          />
                        </Row>
                        {checkIsModePublic(currentMode) ? (
                          <Col>
                            <Row>
                              <LabelContentItem
                                myProps={{
                                  label: "Transaction Hash",
                                  content: log.transactionHash ?? "Not yet",
                                }}
                              />
                            </Row>
                            <LabelContentItem
                              myProps={{
                                label: "Transaction Uri",
                                content:
                                  log.transactionUrl !== null ? (
                                    <a
                                      href={log.transactionUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ textDecoration: 'underline' }}
                                    >
                                      Visit Mumbai Polygon Scan
                                    </a>
                                  ) : (
                                    "Not yet"
                                  ),
                              }}
                            />
                          </Col>
                        ) : (
                          <Row>
                            <LabelContentItem
                              myProps={{
                                label: "Transaction Hash",
                                content: log.transactionHash ?? "Not yet",
                              }}
                            />
                          </Row>
                        )}
                        <LabelContentItem
                          myProps={{
                            label: "Actions",
                            content: log.action.replace("Modified field: ", ""),
                            width: "100%",
                          }}
                        />

                        <div style={{ padding: "8px" }} />
                        {modelLog.type === LogEnum.Project ? (
                          <ProjectLogInfoCard
                            myProps={{ log: log, key: key }}
                          />
                        ) : modelLog.type === LogEnum.Harvest ? (
                          <HarvestLogInfoCard
                            myProps={{ log: log, key: key }}
                          />
                        ) : modelLog.type === LogEnum.Transport ? (
                          <TransportLogInfoCard
                            myProps={{ log: log, key: key }}
                          />
                        ) : modelLog.type === LogEnum.Warehouse ? (
                          <WarehouseLogInfoCard
                            myProps={{ log: log, key: key }}
                          />
                        ) : modelLog.type === LogEnum.Produce ? (
                          <ProduceLogInfoCard
                            myProps={{ log: log, key: key }}
                          />
                        ) : modelLog.type === LogEnum.Farm ? (
                          <FarmProjectLogInfoCard
                            myProps={{ log: log, key: key }}
                          />
                        ) : (
                          <></>
                        )}
                      </Col>
                    </div>
                  ))
                ) : (
                  <div>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </Col>
            </div>
          </Col>
        </>
      ) : (
        <SpinApp></SpinApp>
      )}
    </>
  );
};

export default ProjectLog;
