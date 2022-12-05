import React from "react";
import { Card, Col, Row } from "antd";
import "./TechAdminFarm.scss";

export const TechAdminFarm = () => {
  return (
    <div className="common-layout">
      <Col>
        <div className="header-content">Farm Management</div>
        <div className="label-content">Manage all farms in the system</div>
        <Row style={{ justifyContent: "flex-end" }}>
          <div className="info">
            <span className="info-content">Số lượng nông trại</span>
          </div>
        </Row>
      </Col>
    </div>
  );
};
