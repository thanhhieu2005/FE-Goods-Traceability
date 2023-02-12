import { Modal } from "antd";
import React, { useState } from "react";

function SuccessNoti() {
  return (
    <Modal
      title="Test  Information"
      open={true}
      onOk={() => {
        false;
      }}
      cancelButtonProps={{ style: { display: "none" } }}
      width={300}
    >
      <div>Test</div>
    </Modal>
  );
}

export default SuccessNoti;
