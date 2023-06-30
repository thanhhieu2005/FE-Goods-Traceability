import { mainColor } from "@/utils/app_color";
import { Spin } from "antd";
import React from "react";

const SpinApp = () => {
  return (
    <>
      <Spin tip="Loading" size="large" style={{ color: mainColor }}>
        <div className="content-page" style={{ padding: "64px" }} />
      </Spin>
    </>
  );
};

export default SpinApp;
