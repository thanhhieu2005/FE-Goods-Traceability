import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const ProjectLog = () => {

    return (
        <Col>
            <div className="header-content">Project Log</div>
            <div className="main-content">
                <Button
                    className="btn-cancel"
                    type="primary"
                    // icon={<FormOutlined />
                    hidden={false}
                    size={"large"}
                    style={{ marginRight: "12px" }}
                    danger
                >
                    Cancel
                </Button>
            </div>
        </Col>
    );
}

export default ProjectLog;