import FarmServices from "@/api/farm/farm_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { ShowModalCreateNewItem } from "@/components/Modal/ModalCreateItem";
import SpinApp from "@/components/Spin/SpinApp";
import { createContentLayout } from "@/styles/content_layout";
import { SeedModel } from "@/types/farm_model";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
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
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { RiSeedlingLine } from "react-icons/ri";
import { TfiTrash } from "react-icons/tfi";
import { useSelector } from "react-redux";

const SeedManagement = () => {
  const [form] = Form.useForm();

  const [formUpdate] = Form.useForm();

  const [dataSeeds, setDataSeeds] = useState<SeedModel[]>([]);

  const [isCreateModal, setIsCreateModal] = useState(false);

  const [isUpdateModal, setIsUpdateModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const farmId = useSelector(
    (state: any) => state.authen.currentUserInfo.farmId
  );

  useEffect(() => {
    FarmServices.getAllSeedInFarmService(farmId).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const seed = element as SeedModel;
          setDataSeeds((prevSeed) => [...prevSeed, seed]);
        });
      }
    });
  }, [farmId]);

  // Edit Seed
  const handleCancelUpdateModal = () => {
    formUpdate.resetFields();
    setIsUpdateModal(false);
  };

  const [selectedSeed, setSelectedSeed] = useState<SeedModel>();

  const handleUpdateSeed = async (value: any) => {
    setIsLoadingModal(true);
    setIsLoading(true);

    if (selectedSeed !== undefined) {
      const result: any = await FarmServices.updateSeed(
        value,
        selectedSeed?.seedId
      );

      console.log(result);

      if (result.status === 200) {
        const newSeedUpdate = result.data as SeedModel;

        const indexSeed = dataSeeds.indexOf(selectedSeed);
        if (indexSeed !== -1) {
          dataSeeds[indexSeed] = newSeedUpdate;

          console.log(dataSeeds);
          setDataSeeds(dataSeeds);
        }

        successMessage("Update Seed Successfully!");
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
    setIsLoadingModal(false);
    setIsUpdateModal(false);
  };

  // Create new Seed
  const handleCancelCreateModal = () => {
    form.resetFields();
    setIsCreateModal(false);
  };

  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const handleCreate = async (value: any) => {
    setIsLoadingModal(true);
    setIsLoading(true);

    const finalValue = {
      ...value,
      farmId: farmId,
    };

    console.log(finalValue);

    const result: any = await FarmServices.createNewSeed(finalValue);

    if (result.status === 200) {
      const newSeed = result.data as SeedModel;
      setDataSeeds((prevSeed) => [...prevSeed, newSeed]);

      successMessage("Create Successfully!");
    } else {
      errorMessage("Create Fail!");
    }

    setIsLoading(false);
    setIsLoadingModal(false);
    setIsCreateModal(false);

    form.resetFields();
  };

  const onClickDelete = (seed: SeedModel) => {
    Modal.confirm({
      title: `Do you want to delete ${seed.seedName}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteSeed(seed);
      },
      okText: "Confirm",
    });
  };

  const handleDeleteSeed = async (seed: SeedModel) => {
    setIsLoading(true);
    const result: any = await FarmServices.deleteSeed(seed.seedId);

    const indexSeed = dataSeeds.indexOf(seed);

    console.log(indexSeed);

    if (result.status === 200) {
      if (indexSeed !== -1) {
        dataSeeds.splice(indexSeed, 1);
        console.log(dataSeeds);
        successMessage("Delete Successfully!");
      }
    } else {
      errorMessage("Delete Failed!");
    }
    setDataSeeds(dataSeeds);
    setIsLoading(false);
  };

  return (
    <>
      {isUpdateModal && (
        <ShowModalCreateNewItem
          myProps={{
            title: "Update Seed Info",
            isOpen: isUpdateModal,
            onCancel: handleCancelUpdateModal,
            onOk: formUpdate.submit,
            okText: "Update",
            confirmLoading: isLoadingModal,
            content: (
              <div>
                <Form
                  {...createContentLayout}
                  form={formUpdate}
                  onFinish={handleUpdateSeed}
                >
                  <Form.Item
                    label="Seed Name"
                    name="seedName"
                    required
                    initialValue={selectedSeed?.seedName}
                    rules={[
                      {
                        required: true,
                        message: "Please enter seed name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Seed Family"
                    name="seedFamily"
                    required
                    initialValue={selectedSeed?.seedFamily}
                    rules={[
                      {
                        required: true,
                        message: "Please enter seed family",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Supplier"
                    name="supplier"
                    required
                    initialValue={selectedSeed?.supplier}
                    rules={[
                      {
                        required: true,
                        message: "Please enter supplier",
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
      {isCreateModal && (
        <ShowModalCreateNewItem
          myProps={{
            title: "Create new Seed",
            isOpen: isCreateModal,
            onCancel: handleCancelCreateModal,
            onOk: form.submit,
            okText: "Create",
            confirmLoading: isLoadingModal,
            content: (
              <div>
                <Form
                  {...createContentLayout}
                  form={form}
                  onFinish={handleCreate}
                >
                  <Form.Item
                    label="Seed Name"
                    name="seedName"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter seed name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Seed Family"
                    name="seedFamily"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter seed family",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Supplier"
                    name="supplier"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter supplier",
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
      <div>
        <Col>
          <div className="header-content">
            <Col>
              <div className="title-header">Seed Management</div>
              <div className="sub-title-header">
                Update and edit information on the seeds of your farm
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
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsCreateModal(true);
                    }}
                  >
                    Create new Seed
                  </Button>
                </div>
              </Row>
              {dataSeeds.length !== 0 ? (
                <div>
                  <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={dataSeeds}
                    pagination={{
                      pageSize: 16,
                    }}
                    renderItem={(element: SeedModel) => (
                      <List.Item style={{ marginRight: "36px" }}>
                        <Card
                          title={element.seedName}
                          style={{
                            borderRadius: "8px",
                            border: "1px solid #A9907E",
                            overflow: "hidden",
                          }}
                          headStyle={{
                            color: "#675D50",
                            fontWeight: "700",
                            backgroundColor: "#F3DEBA",
                          }}
                          actions={[
                            <EditOutlined
                              key="edit"
                              style={{ width: "100%" }}
                              onClick={() => {
                                setSelectedSeed(element);
                                setIsUpdateModal(true);
                              }}
                            />,
                            <TfiTrash
                              key="delete"
                              style={{ width: "100%" }}
                              onClick={() => {
                                onClickDelete(element);
                              }}
                            />,
                          ]}
                          extra={<RiSeedlingLine />}
                        >
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p style={{ fontWeight: "500" }}>Family</p>
                            <p>{element.seedFamily}</p>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p style={{ fontWeight: "500" }}>Supplier</p>
                            <p>{element.supplier}</p>
                          </Row>
                        </Card>
                      </List.Item>
                    )}
                  ></List>
                </div>
              ) : (
                <div>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </div>
          ) : (
            <div>
              <SpinApp/>
            </div>
          )}
        </Col>
      </div>
    </>
  );
};

export default SeedManagement;
