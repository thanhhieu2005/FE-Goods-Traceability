import { Breadcrumb, Button, Card, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./log.scss";

const ProjectLog = () => {
  return (
    <Col>
      <div className="header-content">
        <Col>
          <Breadcrumb className="breadcrumb-style">
            <Breadcrumb.Item>Project Detail</Breadcrumb.Item>
            <Breadcrumb.Item>Project Log</Breadcrumb.Item>
          </Breadcrumb>
          <div className="title-header">Project Logs</div>
          <div className="sub-title-header">
            Information about the status update changes of the shipment is
            described in the form of tracking information
          </div>
        </Col>
      </div>
      <div className="content-page">
        <Col>
          <p className="log-title-text">Detailed list of Logs</p>
          <div className="space-padding" />{" "}
          <div className="log-container">
            
          </div>
        </Col>
      </div>
    </Col>
  );
};

export default ProjectLog;
