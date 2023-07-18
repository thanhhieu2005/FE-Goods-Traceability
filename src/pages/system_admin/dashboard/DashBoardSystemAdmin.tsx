import DashboardService from "@/api/system_admin/dashboard_service";
import { icFarm } from "@/assets";
import { DashboardInfoDefault } from "@/types/dashboard";
import { ProjectOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "../dashboard/dashboard.scss";
import LineChartProject from "../../../components/Charts/LineChartProject";
import PieChartProjects from "@/components/Charts/PieChartProjects";
import { canceledColor, canceledColorBackground, completedColor, completedColorBackground, greyBackground, pendingColorBackground, processingColor, processingColorBackground } from "@/utils/app_color";

const DashBoardSystemAdmin = () => {
  const [basicInfo, setBasicInfo] = useState<DashboardInfoDefault>();
  const [projectsPerMonth, setProjectsPerMonth] = useState<[]>([]);

  useEffect(() => {
    DashboardService.getBasicInfo().then((res: any) => {
      if (res?.status === 200) {
        setBasicInfo(res.data as DashboardInfoDefault);
      }
    });
    DashboardService.getProjectsPerMonth().then((res: any) => {
      if(res?.status === 200) {
        setProjectsPerMonth(res.data.data);
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
          {/* <div style={{ padding: "4px" }} /> */}
          <CardDashBoard
            myProp={{
              title: "System Admin",
              content: basicInfo?.numberOfSystemAdmin,
              backgroundColor: "rgba(255, 56, 56, 0.3)",
              icon: <UserOutlined style={{ color: "red", fontSize: "200%" }} />,
            }}
          />
          {/* <div style={{ padding: "4px" }} /> */}
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
          {/* <div style={{ padding: "4px" }} /> */}
          <CardDashBoard
            myProp={{
              title: "Total Partner Farms",
              content: basicInfo?.numberOfFarms,
              backgroundColor: "rgba(0, 255, 0, 0.2)",
              icon: <img src={icFarm} height="28px" alt="" />,
            }}
          />
        </Row>
        <div style={{ padding: '12px 0px'}}>
          <Row style={{ paddingTop: "24px", justifyContent: 'space-between' }}>
            <div style={{ width: "60%"}}>
              <LineChartProject 
                myProp={{ 
                  data: projectsPerMonth, 
                  colorChart: "#597ef7", 
                  title: "Number of projects in the year",
                  labelDatasets: 'Projects',
                  labels:  [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                }}/>
            </div>
            <div style={{ width: '2%' }}/>
            <div style={{ width: '38%' }}>
                <PieChartProjects
                  myProp={{
                    labels: ["Processing", "Pending", "Completed", "Canceled", "Not Yet"],
                    labelDatasets: "#Number of projects",
                    data: [
                      basicInfo?.numberOfProccessingProject, 
                      basicInfo?.numberOfPendingProject, 
                      basicInfo?.numberOfCompletedProject, 
                      basicInfo?.numberOfCanceledProject, 
                      basicInfo?.numberOfNotYetProject,
                    ],
                    backgroundColors: [
                      processingColorBackground,
                      pendingColorBackground,
                      completedColorBackground,
                      canceledColorBackground,
                      greyBackground,
                    ],
                    title: "Detail projects status in year",
                  }}
                />
            </div>
          </Row>
        </div>
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
