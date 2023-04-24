import FarmServices from "@/api/farm/farm_api";
import {
  contentLayout,
  createContentLayout,
  tailLayout,
} from "@/styles/content_layout";
import { LandModel, LandState, SeedModel } from "@/types/farm_model";
import { UserDetailModel, parseUserDetail } from "@/types/user";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CreateFarmProject = () => {
  const farmId = useSelector(
    (state: any) => state.authen.currentUserInfo.farmId
  );

  const [form] = Form.useForm();

  const [dataSeeds, setDataSeeds] = useState<SeedModel[]>([]);

  const [dataLands, setDataLands] = useState<LandModel[]>([]);

  const [dataFarmers, setDataFarmers] = useState<UserDetailModel[]>([]);

  useEffect(() => {
    FarmServices.getAllSeedInFarmService(farmId).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const seed = element as SeedModel;
          setDataSeeds((prevSeed) => [...prevSeed, seed]);
        });
      }
    });
    FarmServices.getAllLandInFarmService(farmId).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const land = element as LandModel;

          if (land.state === LandState.Empty) {
            setDataLands((prevLand) => [...prevLand, land]);
          }
        });
      }
    });
    FarmServices.getAllFarmerInFarmService(farmId).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const farmer = parseUserDetail(element.farmer);

          setDataFarmers((prevFarmer) => [...prevFarmer, farmer]);
        });
      }
    });
  }, [farmId]);

  /// function
  const onReset = () => {
    form.resetFields();
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div>
        <Col>
          <div className="header-content">
            <Col>
              <Breadcrumb className="breadcrumb-style">
                <Breadcrumb.Item>Farm Project Management</Breadcrumb.Item>
                <Breadcrumb.Item>Create new Farm Project</Breadcrumb.Item>
              </Breadcrumb>
              <div className="title-header">Create new Farm Project</div>
              <div className="sub-title-header">
                Enter information in the form to create a new farm project for
                the farm
              </div>
            </Col>
          </div>
          <div className="content-page">
            <div style={{ padding: "24px 0" }}>
              <Col>
                <Form
                  {...contentLayout}
                  onFinish={(value) => {
                    onSubmit(value);
                  }}
                  form={form}
                >
                  <Form.Item
                    label="Farm Project Code"
                    name="farmProjectCode"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Farm Project Code doesn't empty",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Land's Project"
                    name="land"
                    required
                    rules={[
                      { required: true, message: "Please select a land" },
                    ]}
                  >
                    <Select placeholder="Select one land for this project">
                      {dataLands.map((land) => (
                        <Select.Option value={land.landId} key={land.landId}>
                          {" "}
                          {land.landName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Seed's Project"
                    name="seed"
                    required
                    rules={[
                      { required: true, message: "Please select a seed" },
                    ]}
                  >
                    <Select placeholder="Select one seed for this project">
                      {dataSeeds.map((seed) => (
                        <Select.Option value={seed.seedId} key={seed.seedId}>
                          {" "}
                          {seed.seedName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Farmer in Charge" name="farmer">
                    <Select placeholder="Select a farmer will doing this project">
                      {dataFarmers.map((farmer) => (
                        <Select.Option
                          value={farmer.userId}
                          key={farmer.userId}
                        >
                          <Tooltip
                            placement="right"
                            title={
                              `${farmer.lastName} ${farmer.firstName}` ??
                              "No name"
                            }
                          >
                            {" "}
                            {farmer.email}
                          </Tooltip>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Row>
                      <Button type="primary" htmlType="submit">
                        SUBMIT
                      </Button>
                      <div style={{ margin: "0 12px" }}></div>
                      <Button htmlType="button" onClick={onReset}>
                        Reset
                      </Button>
                    </Row>
                  </Form.Item>
                </Form>
              </Col>
            </div>
          </div>
        </Col>
      </div>
    </>
  );
};

export default CreateFarmProject;
