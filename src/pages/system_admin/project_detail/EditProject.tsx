import FarmManagementService from "@/api/admin_tech/farm_management_services";
import FarmServices from "@/api/farm/farm_api";
import StaffServices from "@/api/system_admin/staff_service";
import { ShowDrawerEdit } from "@/components/Drawer/DrawerEditItem";
import { modalUpdateContentLayout, tailUpdateContentLayout } from "@/styles/content_layout";
import { FarmInfoModel, FarmProjectModel } from "@/types/farm_model";
import { CommonProjectState, ProjectDetailModel } from "@/types/project_model";
import { listCommonState } from "@/types/step_tracking";
import { UserDetailModel, parseUserDetail } from "@/types/user";
import { parseColorByCommonState, parseToStringCommonState } from "@/utils/format_state";
import { Button, Col, Form, Input, Select, Tooltip } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { useEffect, useState } from "react";

const EditProject = ({ myProps: props }: any) => {
  const dataProject : ProjectDetailModel = props.dataProject;

  console.log(dataProject);

  const formUpdate : FormInstance<any> = props.formUpdate;

  const [selectedFarmId, setSelectedFarmId] = useState<string>();

  const [listFarms, setListFarms] = useState<FarmInfoModel[]>([]);


  const [listFarmProjects, setListFarmProjects] = useState<FarmProjectModel[]>(
    []
  );

  const [selectedHarvestor, setSelectedHarvestor] = useState(dataProject.harvest.inspector?.userId);

  // get all staff department Harvester
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(2).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const harvester = parseUserDetail(element);
          setListHavesters((prev) => [...prev, harvester]);
        });
      }
    });
  }, []);

  // get all staff Transport Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(3).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const transporter = parseUserDetail(element);
          setListTransporters((prev) => [...prev, transporter]);
        });
      }
    });
  }, []);

  // get all staff Warehouse Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(4).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const warehouse = parseUserDetail(element);
          setListWarehouseInspectors((prev) => [...prev, warehouse]);
        });
      }
    });
  }, []);

  // get all staff Produce Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(5).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const produce = parseUserDetail(element);
          setListProduceInspectors((prev) => [...prev, produce]);
        });
      }
    });
  }, []);
  
  
  const handleOnChangeFarm = (newFarmId: string) => {
    formUpdate.setFieldValue("farmProjectId", "");
    setSelectedFarmId(newFarmId);
  };

  const handleOnChangeHarvestor = (newHarvestor: string) => {
    setSelectedHarvestor(newHarvestor);
  };

  useEffect(() => {
    FarmManagementService.getAllFarmService().then((res: any) => {
      if (res?.status == 200) {
        res.data.map((element: any) => {
          const farm = element as FarmInfoModel;
          setListFarms((prevFarm) => [...prevFarm, farm]);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (selectedFarmId !== undefined) {
      FarmServices.getAllFarmProjectsService(selectedFarmId).then(
        (res: any) => {
          if (res?.status === 200) {
            setListFarmProjects(
              res.data.filter((element: any) => {
                const farm = element as FarmProjectModel;
                if (farm.projectId === null) {
                  return true
                }
                return false
              })
            )
          }
        }
      );
    }
  }, [selectedFarmId]);

  const [listHavesters, setListHavesters] = useState<UserDetailModel[]>([]);

  const [listWarehouseInspectors, setListWarehouseInspectors] = useState<
    UserDetailModel[]
  >([]);

  const [listTransporters, setListTransporters] = useState<UserDetailModel[]>(
    []
  );

  const [listProduceInspectors, setListProduceInspectors] = useState<
    UserDetailModel[]
  >([]);

  const formatValue = (value: any) => {
    Object.keys(value).forEach(function(key) {
      if(key === "harvestor") {
        value[key] = selectedHarvestor;
      }
    })

    return value;
  }

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Edit Information of Project",
          onOpen: props.showEditProjectDrawer,
          onClose: props.closeEditProjectDrawer,
          content: (
            <Col>
              <Form
                {...modalUpdateContentLayout}
                form={formUpdate}
                onFinish={(value) => {
                  console.log("Select", value);
                  var finalValue = formatValue(value);
                  props.handleUpdateProject(finalValue);
                }}
              >
                <Form.Item
                  label="Project Name"
                  name="projectName"
                  initialValue={dataProject?.projectName}
                >
                  <Input />
                </Form.Item>
                {dataProject?.farmProject === null ? (
                  <Col>
                    <Form.Item label="Farm in Charge" name="farmId">
                      <Select
                        placeholder="Select farm in charge"
                        onChange={handleOnChangeFarm}
                      >
                        {listFarms.map((farm) => (
                          <Select.Option value={farm.farmId} key={farm.farmId}>
                            <Tooltip
                              placement="right"
                              title={`${farm.farmName}` ?? "No name"}
                            >
                              {" "}
                              {farm.farmCode}
                            </Tooltip>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Farm Project" name="farmProjectId">
                      <Select placeholder="Select farm project in charge">
                        {listFarmProjects.map((farmProject) => (
                          <Select.Option
                            value={farmProject.farmProjectId}
                            key={farmProject.farmProjectId}
                          >
                            {farmProject.farmProjectCode}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                <Form.Item
                  label="Harvestor"
                  name="harvestor"
                  initialValue={dataProject?.harvest.inspector?.email}
                >
                  <Select placeholder="Select harvestor in Harvest Inspection" onChange={handleOnChangeHarvestor}>
                    {listHavesters.map((harvester) => (
                      <Select.Option
                        value={harvester.userId}
                        key={harvester.userId}
                      >
                        <Tooltip
                          placement="right"
                          title={
                            `${harvester.lastName} ${harvester.firstName}` ??
                            "No name"
                          }
                        >
                          {harvester.email}
                        </Tooltip>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Transport Inspector"
                  name="transportInspector"
                  initialValue={dataProject?.transport.inspector?.email}
                >
                  <Select placeholder="Select Transport Inspector">
                    {listTransporters.map((transporter) => (
                      <Select.Option
                        value={transporter.userId}
                        key={transporter.userId}
                      >
                        <Tooltip
                          placement="right"
                          title={
                            `${transporter.lastName} ${transporter.firstName}` ??
                            "No name"
                          }
                        >
                          {transporter.email}
                        </Tooltip>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Warehouse Inspector"
                  name="warehouseInspector"
                  initialValue={dataProject?.warehouseStorage.inspector?.email}
                >
                  <Select placeholder="Select Warehouse Inspector">
                    {listWarehouseInspectors.map((warehouse) => (
                      <Select.Option
                        value={warehouse.userId}
                        key={warehouse.userId}
                      >
                        <Tooltip
                          placement="right"
                          title={
                            `${warehouse.lastName} ${warehouse.firstName}` ??
                            "No name"
                          }
                        >
                          {warehouse.email}
                        </Tooltip>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Produce Inspector"
                  name="produceInspector"
                  initialValue={dataProject?.produce.inspector?.email}
                >
                  <Select placeholder="Select Produce Inspector">
                    {listProduceInspectors.map((produce) => (
                      <Select.Option
                        value={produce.userId}
                        key={produce.userId}
                      >
                        <Tooltip
                          placement="right"
                          title={
                            `${produce.lastName} ${produce.firstName}` ??
                            "No name"
                          }
                        >
                          {produce.email}
                        </Tooltip>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  initialValue={dataProject?.state}
                >
                  <Select
                    placeholder="Select new State"
                    // onChange={onChangeState}
                  >
                    {listCommonState.map((state) => (
                      <Select.Option value={state} key={state}>
                        <span
                          style={{
                            color: `${parseColorByCommonState(state)}`,
                          }}
                        >
                          {parseToStringCommonState(state)}
                        </span>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item wrapperCol={tailUpdateContentLayout}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{ marginRight: "12px" }}
                    loading={props.isLoadingUpdate}
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          ),
        }}
      />
    </>
  );
};
export default EditProject;
