import DashboardService from "@/api/system_admin/dashboard_service";
import { icFarm } from "@/assets";
import { DashboardInfoDefault } from "@/types/dashboard";
import { ProjectOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "../dashboard/dashboard.scss";
import LineChartProject from "./LineChartProject";

const DashBoardSystemAdmin = () => {
  const [basicInfo, setBasicInfo] = useState<DashboardInfoDefault>();

  useEffect(() => {
    DashboardService.getBasicInfo().then((res: any) => {
      if (res?.status === 200) {
        setBasicInfo(res.data as DashboardInfoDefault);
      }
    });
  }, []);

  return (
    <>
      <Col>
        {/* Header */}
        <div>
          <div className="title-dashboard">Dashboard</div>
          <div className="sub-title-dashboard">
            HK Solution - Coffee Traceability System
          </div>
        </div>
        {/* Cotent */}
        <Row className="layout-card">
          <CardDashBoard
            myProp={{
              title: "Total Projects",
              content: basicInfo?.numberOfProject,
              backgroundColor: "rgba(102, 139, 242, 0.5)",
              icon: (
                <ProjectOutlined style={{ color: "blue", fontSize: "200%" }} />
              ),
            }}
          />
          <div style={{ padding: "8px" }} />
          <CardDashBoard
            myProp={{
              title: "System Admin",
              content: basicInfo?.numberOfSystemAdmin,
              backgroundColor: "rgba(255, 56, 56, 0.3)",
              icon: <UserOutlined style={{ color: "red", fontSize: "200%" }} />,
            }}
          />
          <div style={{ padding: "8px" }} />
          <CardDashBoard
            myProp={{
              title: "Staffs",
              content: basicInfo?.numberOfStaff,
              backgroundColor: "rgba(0, 255, 0, 0.2)",
              icon: (
                <TeamOutlined style={{ color: "green", fontSize: "200%" }} />
              ),
            }}
          />
          <div style={{ padding: "8px" }} />
          <CardDashBoard
            myProp={{
              title: "Total Partner Farms",
              content: basicInfo?.numberOfFarms,
              backgroundColor: "rgba(0, 255, 0, 0.2)",
              icon: <img src={icFarm} height="28px" alt="" />,
            }}
          />
        </Row>
        <Row style={{ paddingTop: "24px" }}>
          <div style={{ width: "65%" }}>
            <LineChartProject></LineChartProject>
          </div>
        </Row>
      </Col>
    </>
  );
};

export default DashBoardSystemAdmin;

const CardDashBoard = ({ myProp: props }: any) => {
  return (
    <>
      <Card
        style={{
          width: 360,
          borderRadius: "4px",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: props.backgroundColor,
              marginRight: "8px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Icon need to custom size and color */}
            {props.icon}
          </div>
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {props.title}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              {props.content}
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};
