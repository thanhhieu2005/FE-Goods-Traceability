import FarmServices from "@/api/farm/farm_api";
import { icLand, icSeed } from "@/assets";
import { FarmStateBadge } from "@/components/Badge/StateBadge";
import CardCustom from "@/components/Card/Card";
import { FarmDetailInfoModel, parseFarmDetail } from "@/types/farm_model";
import { AuditOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FarmerManagement from "./FarmerManagement";

const FarmInfo = () => {
  const userName = useSelector((state: any) => state.authen.currentUserInfo);

  console.log(userName);

  const [dataFarmInfo, setDataFarmInfo] = useState<FarmDetailInfoModel>();

  useEffect(() => {
    FarmServices.getFarmDetailService(userName.farmId).then((res: any) => {
      console.log(res);
      if (res.status === 200) {
        const farmInfo = parseFarmDetail(res.data);
        setDataFarmInfo(farmInfo);
      }
    });
  }, [userName.farmId]);

  const farmCardProps = {
    title: "Famers",
    content: dataFarmInfo?.farmerList?.length,
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
    content: dataFarmInfo?.farmProjectList.length ?? "0",
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
    content: dataFarmInfo?.landList.length ?? "0",
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
    content: dataFarmInfo?.seedList.length ?? "0",
    onClick: () => {
      {
        console.log("Watch Detail");
      }
    },
    contentColor: "#227C70",
    icon: <img src={icSeed} width="36px" height="36px" />,
  };

  const isOwner = userName.isOwner ? "visible" : "hiden";

  return (
    <Col>
      <div className="header-content">
        <div className="title-header">Farm Information</div>
        <div className="sub-title-header">Farm overview</div>
      </div>
      {dataFarmInfo ? (
        <div className="content-page">
          {/* display thumbnail/ background image farm */}
          <div
            style={{
              minWidth: "100%",
              minHeight: "120px",
              backgroundColor: "grey",
              marginBottom: "32px",
              marginTop: "16px",
            }}
          ></div>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: "Farm Info",
                key: "1",
                children: (
                  <Col>
                    <div style={{ padding: "24px 36px" }}>
                      <div>
                        <Row
                          style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "36px",
                              fontWeight: "700",
                              color: "#1F8A70",
                            }}
                          >
                            {dataFarmInfo.farmName}
                          </p>
                          {isOwner ? (
                            <Button type="primary">Update Farm Info</Button>
                          ) : (
                            <></>
                          )}
                        </Row>
                      </div>
                      <div style={{ paddingBottom: "24px" }}>
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "20px",
                              fontWeight: "500",
                              marginRight: "12px",
                              alignContent: "center",
                            }}
                          >
                            {" "}
                            Farm Status:{" "}
                          </div>
                          {FarmStateBadge(dataFarmInfo.statusFarm)}
                        </Row>
                      </div>
                      <div className="info-row">
                        <Row>
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "50%",
                            }}
                          >
                            <p className="row-label-item">Farm Code:</p>
                            <p className="row-title-item">
                              {" "}
                              {dataFarmInfo.farmCode}{" "}
                            </p>
                          </Row>
                          <Row
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <p className="row-label-item">Farm Owner:</p>
                            <p className="row-title-item">
                              {" "}
                              {dataFarmInfo.farmOwner?.email}{" "}
                            </p>
                          </Row>
                        </Row>
                      </div>
                      <div className="info-row">
                        <Row>
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "50%",
                            }}
                          >
                            <p className="row-label-item">Farm Address:</p>
                            <p className="row-title-item">
                              {" "}
                              {dataFarmInfo.farmAddress ?? "-"}{" "}
                            </p>
                          </Row>
                          <Row
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <p className="row-label-item">Farm Phone Number:</p>
                            <p className="row-title-item">
                              {" "}
                              {dataFarmInfo.farmPhoneNumber ?? "-"}{" "}
                            </p>
                          </Row>
                        </Row>
                      </div>
                    </div>
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
                  </Col>
                ),
              },
              {
                label: 'Farmers',
                key: '2',
                children: (
                    <FarmerManagement myProp={{farmId: dataFarmInfo.farmId}}/>
                ),
              }
            ]}
          >
          </Tabs>
        </div>
      ) : (
        <>
          <div className="content-page">

          </div>
        </>
      )}
    </Col>
  );
};

export default FarmInfo;
