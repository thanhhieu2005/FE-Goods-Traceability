import FarmServices from "@/api/farm/farm_api";
import { LandModel } from "@/types/farm_model";
import { Button, Card, Col, List, Row } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TfiTrash } from "react-icons/tfi";
import { EditOutlined } from "@ant-design/icons";
import { icLand } from "@/assets";

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

  console.log(dataLands);

  return (
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
            {/* <Row style={{width: '80%'}}>
              <div className='label-search'>
                Find land
              </div>
              <div className='search-item'>
                <Search placeholder='Enter land what you want to find'/>
              </div>
            </Row> */}
            <div className="action-layout-btn">
              <Button type="primary">Create new Land</Button>
            </div>
          </Row>
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
                  headStyle={{ color: "#675D50", fontWeight: "700", backgroundColor: "#ABC4AA"}}
                  actions={[
                    <EditOutlined key="edit" />,
                    <TfiTrash key="delete" />,
                  ]}
                  extra={<img src={icLand} width="36px" height="36px"></img>}
                >
                  <Row
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ fontWeight: "500" }}>Area</p>
                    <p>{element.landArea} m2</p>
                  </Row>
                  <Row
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ fontWeight: "500" }}>State</p>
                    <p>{element.state}</p>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </Col>
    </div>
  );
};

export default LandManagement;
