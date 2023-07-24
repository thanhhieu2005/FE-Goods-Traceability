import { mainColor, pendingColorBackground } from "@/utils/app_color";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Popover } from "antd";
import { useState } from "react";
import NotiPopover from "../Noti/NotiPopover";

const NotificationBadge = () => {
  const [isClickModal, setIsClickModal] = useState(false);

  const [isCallData, setIsCallData] = useState(false);

  const handleClickModal = () => {
    setIsClickModal(!isClickModal);
    
    setIsCallData(!isCallData);
  };

  const content = (
    <div>
      <NotiPopover myProps={{isCall: isCallData}}/>
    </div>
  );

  return (
    <>
      <Popover
        title={
          <p style={{ margin: "0", fontSize: "16px", color: mainColor }}>
            Notifications
          </p>
        }
        content={content}
        overlayStyle={{
          width: "24vw",
        }}
        placement="bottom"
        trigger="click"
      >
        <div
          style={{
            display: "flex",
            padding: "10px",
            backgroundColor: pendingColorBackground,
            borderRadius: "50%",
          }}
          onClick={() => {
            handleClickModal();
          }}
        >
          <Badge>
            <BellOutlined style={{ color: "#e8b26e", fontSize: "20px" }} />
          </Badge>
        </div>
      </Popover>
    </>
  );
};

export default NotificationBadge;
