import FarmServices from "@/api/farm/farm_api";
import { LandModel } from "@/types/farm_model";
import { Button, Card, Col, Empty, Form, Input, List, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TfiTrash } from "react-icons/tfi";
import { EditOutlined } from "@ant-design/icons";
import { icLand } from "@/assets";
import { TagLandState } from "@/components/Tag/StateTag";
import { createContentLayout } from "@/styles/content_layout";
import { ShowModalCreateNewItem } from "@/components/Modal/ModalCreateItem";
import { ShowModalConfirmDelete } from "@/components/Modal/ModalDeleteItem";
import { ShowDrawerEdit } from "@/components/Drawer/DrawerEditItem";

const LandManagement = () => {
  const [dataLands, setLands] = useState<LandModel[]>([]);

  const farmId = useSelector(
    (state: any) => state.authen.currentUserInfo.farmId
  );

  useEffect(() => {
    FarmServices.getAllLandInFarmService(farmId).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const land = element as LandModel;
          setLands((prevLand) => [...prevLand, land]);
        });
      }
    });
  }, [setLands]);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const showModalDelete = () => {
    setIsModalDeleteOpen(true);
  };

  const confirmDelteButton = () => {
    setIsModalDeleteOpen(false);
  };

  const cancelDeleteButton = () => {
    setIsModalDeleteOpen(false);
  };

  // edit land

  const [isDrawerEditLand, setIsDrawerEditLand] = useState(false);

  const showDrawerEditLand = () => {
    setIsDrawerEditLand(true);
  };

  const cancelCloseEditLand = () => {
    setIsDrawerEditLand(false);
  };

  const submitEditLand = () => {
    setIsDrawerEditLand(false);
  };

  // create new land
  const [isModalCreateLand, setIsModalCreateLand] = useState(false);

  const showModalCreate = () => {
    setIsModalCreateLand(true);
  };

  const createNewLand = () => {
    setIsModalCreateLand(false);
  };

  const cancelCreateNewLand = () => {
    setIsModalCreateLand(false);
  };

  return (
    <>
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
                {isModalCreateLand && (
                  <ShowModalCreateNewItem
                    myProps={{
                      title: "Create new Land",
                      isOpen: isModalCreateLand,
                      content: (
                        <div>
                          <Form {...createContentLayout}>
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
                          key="edit"
                          onClick={showDrawerEditLand}
                        />,
                        <TfiTrash key="delete" onClick={showModalDelete} />,
                      ]}
                      extra={
                        <img src={icLand} width="36px" height="36px"></img>
                      }
                    >
                      {isModalDeleteOpen && (
                        <ShowModalConfirmDelete
                          myProps={{
                            title:
                              "Do you want to delelte this " +
                              element.landName +
                              "?",
                            isModalOpen: isModalDeleteOpen,
                            onConfirm: confirmDelteButton,
                            onCancel: cancelDeleteButton,
                            content:
                              "You will permanently delete this land from your farm, do you agree?",
                          }}
                        ></ShowModalConfirmDelete>
                      )}
                      {isDrawerEditLand && (
                        <ShowDrawerEdit
                          myProps={{
                            title: "Edit Land",
                            onOpen: showDrawerEditLand,
                            onClose: cancelCloseEditLand,
                            onSubmit: submitEditLand,
                            content: (
                              <div style={{ padding: "24px" }}>
                                <Form disabled layout="vertical">
                                  <Col>
                                    <Form.Item
                                      label="Land ID"
                                      name="landId"
                                      initialValue={element.landId}
                                    >
                                      <Input />
                                    </Form.Item>
                                  </Col>
                                </Form>
                                <Form layout="vertical">
                                  <Col>
                                    <Form.Item
                                      label="Land Name"
                                      name="landName"
                                      initialValue={element.landName}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <Form.Item
                                      label="Land Area (m2)"
                                      name="landArea"
                                      initialValue={element.landArea}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <Form.Item label="State" name="state">
                                      <Select
                                        defaultValue={element.state}
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
        </Col>
      </div>
    </>
  );
};

export default LandManagement;
