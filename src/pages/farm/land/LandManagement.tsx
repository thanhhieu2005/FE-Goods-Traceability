import FarmServices from "@/api/farm/farm_api";
import { LandModel } from "@/types/farm_model";
import {
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { icLand } from "@/assets";
import { ShowDrawerEdit } from "@/components/Drawer/DrawerEditItem";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { ShowModalCreateNewItem } from "@/components/Modal/ModalCreateItem";
import SpinApp from "@/components/Spin/SpinApp";
import { TagLandState } from "@/components/Tag/StateTag";
import { createContentLayout } from "@/styles/content_layout";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { TfiTrash } from "react-icons/tfi";

const LandManagement = () => {
  const [dataLands, setLands] = useState<LandModel[]>([]);

  const [formCreate] = Form.useForm();

  const [formUpdate] = Form.useForm();

  const farmId = useSelector(
    (state: any) => state.authen.currentUserInfo.farmId
  );

  // Indicator Loading
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    FarmServices.getAllLandInFarmService(farmId).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const land = element as LandModel;
          setLands((prevLand) => [...prevLand, land]);
        });
      }
    });
  }, [farmId]);

  // edit land

  const [selectedLand, setSelectedLand] = useState<LandModel>();

  const [isDrawerEditLand, setIsDrawerEditLand] = useState(false);

  const showDrawerEditLand = () => {
    setIsDrawerEditLand(true);
  };

  const cancelCloseEditLand = () => {
    formUpdate.resetFields();
    setIsDrawerEditLand(false);
  };

  const submitEditLand = async (value: any) => {
    setIsLoading(false);

    if (selectedLand !== undefined) {
      const result: any = await FarmServices.updateLand(
        value,
        selectedLand?.landId
      );

      if (result.status === 200) {
        const newLandUpdate = result.data as LandModel;

        const indexLand = dataLands.indexOf(selectedLand);
        if (indexLand !== -1) {
          dataLands[indexLand] = newLandUpdate;

          setLands(dataLands);
        }
        successMessage("Update Land Successfully!");
      } else {
        if (result.response.status === 400) {
          errorMessage(result.response.data.message);
        } else {
          errorMessage("An unknow error!");
        }
      }
    } else {
      errorMessage("Somethings went wrong!");
    }

    setIsLoading(false);
    setIsDrawerEditLand(false);
  };

  // create new land
  const [isModalCreateLand, setIsModalCreateLand] = useState(false);

  const showModalCreate = () => {
    setIsModalCreateLand(true);
  };

  const createNewLand = async (value: any) => {
    setIsLoading(true);
    setIsLoadingModal(true);

    const reqValue = {
      ...value,
      farmId: farmId,
    };

    console.log(reqValue);

    const result: any = await FarmServices.createNewLand(reqValue);

    if (result.status === 200) {
      const newLand = result.data as LandModel;
      setLands((prev) => [...prev, newLand]);

      successMessage("Create Successfully!");
    } else {
      errorMessage("Create Fail!");
    }

    setIsLoading(false);
    setIsLoadingModal(false);
    setIsModalCreateLand(false);
  };

  const cancelCreateNewLand = () => {
    formCreate.resetFields();
    setIsModalCreateLand(false);
  };

  // Delete Land
  const onClickDeleteLand = (land: LandModel) => {
    Modal.confirm({
      title: `Do you want to delete ${land.landName}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteLand(land);
      },
      okText: "Confirm",
    });
  };

  const handleDeleteLand = async (land: LandModel) => {
    setIsLoading(true);
    const result: any = await FarmServices.deleteLand(land.landId);

    const indexLand = dataLands.indexOf(land);

    if (result.status === 200) {
      if (indexLand !== -1) {
        dataLands.splice(indexLand, 1);
        successMessage("Delete Successfully!");
      }
    } else {
      errorMessage("Delete Failed!");
    }
    setLands(dataLands);
    setIsLoading(false);
  };

  return (
    <>
      {isDrawerEditLand && (
        <ShowDrawerEdit
          myProps={{
            title: "Edit Land",
            onOpen: showDrawerEditLand,
            onClose: cancelCloseEditLand,
            onSubmit: formUpdate.submit,
            content: (
              <div style={{ padding: "24px" }}>
                <Form
                  layout="vertical"
                  form={formUpdate}
                  onFinish={submitEditLand}
                >
                  <Col>
                    <Form.Item
                      label="Land ID"
                      name="landId"
                      initialValue={selectedLand?.landId}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                      label="Land Name"
                      name="landName"
                      initialValue={selectedLand?.landName}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Land Area (m2)"
                      name="landArea"
                      initialValue={selectedLand?.landArea}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="State"
                      name="state"
                      initialValue={selectedLand?.state}
                    >
                      <Select
                        style={{ width: "100%" }}
                        options={[
                          {
                            value: 1,
                            label: "Empty",
                          },
                          {
                            value: 2,
                            label: "Cultivating",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Form>
              </div>
            ),
          }}
        />
      )}
      {isModalCreateLand && (
        <ShowModalCreateNewItem
          myProps={{
            title: "Create new Land",
            isOpen: isModalCreateLand,
            onCancel: cancelCreateNewLand,
            onOk: formCreate.submit,
            okText: "Create",
            confirmLoading: isLoadingModal,
            content: (
              <div>
                <Form
                  {...createContentLayout}
                  form={formCreate}
                  onFinish={createNewLand}
                >
                  <Form.Item
                    label="Land Name"
                    name="landName"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter land name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Land Area (m2)"
                    name="landArea"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter land area",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </div>
            ),
          }}
        />
      )}
      {/* UI */}
      <div>
        <Col>
          <div className="header-content">
            <Col>
              <div className="title-header">Land Management</div>
              <div className="sub-title-header">
                Update and edit information on the lands of your farm
              </div>
            </Col>
          </div>
          {!isLoading ? (
            <div className="content-page">
              <Row
                style={{
                  paddingBottom: "24px",
                  justifyContent: "flex-end",
                  paddingTop: "24px",
                }}
              >
                <div className="action-layout-btn">
                  <Button type="primary" onClick={showModalCreate}>
                    Create new Land
                  </Button>
                </div>
              </Row>
              {dataLands.length !== 0 ? (
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={dataLands}
                  pagination={{
                    pageSize: 16,
                  }}
                  renderItem={(element) => (
                    <List.Item style={{ marginRight: "36px" }}>
                      <Card
                        title={element.landName}
                        style={{
                          borderRadius: "8px",
                          border: "1px solid #ABC4AA",
                          overflow: "hidden",
                        }}
                        headStyle={{
                          color: "#675D50",
                          fontWeight: "700",
                          backgroundColor: "#ABC4AA",
                        }}
                        actions={[
                          <EditOutlined
                            style={{ width: "100%" }}
                            key="edit"
                            onClick={() => {
                              setSelectedLand(element);
                              showDrawerEditLand();
                            }}
                          />,
                          <TfiTrash
                            style={{ width: "100%" }}
                            key="delete"
                            onClick={() => {
                              onClickDeleteLand(element);
                            }}
                          />,
                        ]}
                        extra={
                          <img src={icLand} width="36px" height="36px"></img>
                        }
                      >
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ fontWeight: "500" }}>Area</p>
                          <p>{element.landArea} m2</p>
                        </Row>
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ fontWeight: "500" }}>State</p>
                          {TagLandState(element.state)}
                        </Row>
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <div>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </div>
          ) : (
            <>
              <SpinApp />
            </>
          )}
        </Col>
      </div>
    </>
  );
};

export default LandManagement;
