import UserServices from "@/api/user_api";
import { logoMetaMask } from "@/assets";
import LabelContentItem from "@/components/Label/LabelContentItem";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { StaffDepartment, UserDetailModel } from "@/types/user";
import { canceledColor, completedColor, mainColor } from "@/utils/app_color";
import { checkRole } from "@/utils/checkRole";
import { checkMatchWalletAddress } from "@/utils/validation/check_wallet_address";
import { BoldOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const localUserInfo: UserDetailModel = useSelector(
    (state: any) => state.authen.currentUserInfo
  );

  const walletInfo = useSelector((state: any) => state.account);

  const checkConnectWalletAddress = () => {
    if (
      currentUserInfo.walletAddress === null ||
      currentUserInfo.walletAddress === ""
    ) {
      return canceledColor;
    } else {
      return completedColor;
    }
  };

  const [currentUserInfo, setCurrentUserInfo] =
    useState<UserDetailModel>(localUserInfo);

  const [isConnectWallet, setIsConnectWallet] = useState<any>();

  useEffect(() => {
    const isConnectWallet = checkConnectWalletAddress();

    setIsConnectWallet(isConnectWallet);
  }, [currentUserInfo]);

  const onClickLinkWallet = () => {
    Modal.confirm({
      title: (
        <Row
          style={{
            display: "flex",
            alignContent: "center",
          }}
        >
          <img src={logoMetaMask} width="48px" />
          <p
            style={{
              fontSize: "18px",
              color: mainColor,
              fontWeight: "600",
              display: "flex",
              alignContent: "center",
              flexWrap: "wrap",
            }}
          >
            Link Meta Mask Address
          </p>
        </Row>
      ),
      content: (
        <p style={{ fontSize: "20px" }}>
          <span>This step will link address to database. </span>
          <span>Do you agree with that?</span>
        </p>
      ),
      width: 720,
      onOk: () => {
        updateAddressToProfile();
      },
    });
  };

  const updateAddressToProfile = async () => {
    const value = {
      walletAddress: walletInfo.account,
    };

    const res: any = await UserServices.updateProfile(
      currentUserInfo.userId,
      value
    );

    if (res.status === 200) {
      setCurrentUserInfo(res.data);
      successMessage("Link Wallet to Database Success!");
    } else {
      errorMessage("Update Failed!");
      console.log(res);
    }
  };

  return (
    <>
      <div>
        <Col>
          <div className="header-content">
            <div className="title-header">User Information</div>
          </div>
          <div className="content-page">
            <div style={{ paddingTop: "48px" }} />
            <Row>
              <Col
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                  width: "30%",
                }}
              >
                <Avatar size={120} icon={<UserOutlined />} />
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      padding: "12px",
                      fontWeight: "700",
                      fontSize: "32px",
                      display: "flex",
                      alignContent: "center",
                      flexWrap: "wrap",
                      color: mainColor,
                    }}
                  >
                    {currentUserInfo.lastName} {currentUserInfo.firstName}
                  </div>
                  <div style={{ padding: "4px" }} />
                  <div className="container-hover" style={{ height: '32px', display: 'flex', alignItems: 'flex-end' }}>
                    <EditOutlined style={{ fontSize: '100%'}}/>
                  </div>
                </Row>
                <div
                  className="common-border-tag"
                  style={{
                    marginLeft: "12px",
                    display: "inline-block",
                    borderColor: isConnectWallet,
                    color: isConnectWallet,
                  }}
                >
                  <Row>
                    <p>
                      {isConnectWallet === completedColor
                        ? "Wallet Linked"
                        : "Wallet Not Link Yet"}
                    </p>
                  </Row>
                </div>
              </Col>
              <div style={{ display: "flex", width: "70%" }}>
                <Col style={{ width: "70%", paddingLeft: "48px" }}>
                  <LabelContentItem
                    myProps={{
                      label: "User ID",
                      content: currentUserInfo.userId,
                    }}
                  />
                  <div style={{ padding: "8px" }} />
                  <LabelContentItem
                    myProps={{
                      label: "Email Address",
                      content: currentUserInfo.email,
                    }}
                  />
                  <div style={{ padding: "8px" }} />
                  <LabelContentItem
                    myProps={{
                      label: "Wallet Address",
                      content:
                        currentUserInfo.walletAddress === "" ||
                        currentUserInfo.walletAddress === null
                          ? "Not Connected Yet"
                          : currentUserInfo.walletAddress,
                    }}
                  />
                  <div style={{ padding: "8px" }} />
                  <LabelContentItem
                    myProps={{
                      label: "Role",
                      content: checkRole(
                        currentUserInfo.role,
                        currentUserInfo.department
                      ),
                    }}
                  />
                  <div style={{ padding: "8px" }} />
                  <LabelContentItem
                    myProps={{
                      label: "Phone Number",
                      content: currentUserInfo.phoneNumber ?? "Not Update Yet",
                    }}
                  />
                  <div style={{ padding: "8px" }} />
                  <LabelContentItem
                    myProps={{
                      label: "Address",
                      content: currentUserInfo.address ?? "Not Update Yet",
                    }}
                  />
                </Col>
                <Row style={{ width: "30%", justifyContent: "flex-end" }}>
                  <Button
                    type="default"
                    size="middle"
                    style={{
                      borderRadius: "4px",
                      border: "1px solid #e8b26e",
                    }}
                    onClick={onClickLinkWallet}
                  >
                    <Row>
                      <img src={logoMetaMask} width="24px" />
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          paddingLeft: "4px",
                        }}
                      >
                        Link Wallet Address
                      </p>
                    </Row>
                  </Button>
                </Row>
              </div>
            </Row>
          </div>
        </Col>
      </div>
    </>
  );
};

export default UserProfile;
