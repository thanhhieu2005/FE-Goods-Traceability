import FarmServices from "@/api/farm/farm_api";
import { SeedModel } from "@/types/farm_model";
import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, List, Row } from "antd";
import React, { useEffect, useState } from "react";
import { RiSeedlingLine } from "react-icons/ri";
import { TfiTrash } from "react-icons/tfi";
import { useSelector } from "react-redux";

const SeedManagement = () => {
  const [dataSeeds, setDataSeeds] = useState<SeedModel[]>([]);

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
  }, [setDataSeeds]);

  // Edit Land

  return (
    <>
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
          <div className="content-page">
            <Row
              style={{
                paddingBottom: "24px",
                justifyContent: "flex-end",
                paddingTop: "24px",
              }}
            >
              <div className="action-layout-btn">
                <Button type="primary">Create new Seed</Button>
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
                  renderItem={(element) => (
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
                          <EditOutlined key="edit" />,
                          <TfiTrash key="delete" />,
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
        </Col>
      </div>
    </>
  );
};

export default SeedManagement;
