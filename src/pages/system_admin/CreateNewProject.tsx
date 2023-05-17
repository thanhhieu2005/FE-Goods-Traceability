import FarmManagementService from "@/api/admin_tech/farm_management_services";
import FarmServices from "@/api/farm/farm_api";
import { contentLayout, tailContentLayout } from "@/styles/content_layout";
import { FarmInfoModel, FarmProjectModel } from "@/types/farm_model";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Select,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { CreateNewProjectService } from "@/api/system_admin/project_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import StaffServices from "@/api/system_admin/staff_service";
import { UserDetailModel, parseUserDetail } from "@/types/user";

const CreateNewProject = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const currentManagerInfo = useSelector(
    (state: any) => state.authen.currentUserInfo
  );

  const [listFarms, setListFarms] = useState<FarmInfoModel[]>([]);

  const [selectedFarmId, setSelectedFarmId] = useState<string>();

  const [listFarmProjects, setListFarmProjects] = useState<FarmProjectModel[]>(
    []
  );

  const [listHavesters, setListHavesters] = useState<UserDetailModel[]>([]);

  const [listWarehouseInspectors, setListWarehouseInspectors] = useState<UserDetailModel[]>([]);

  const [listTransporters, setListTransporters] = useState<UserDetailModel[]>([]);

  const [listProduceInspectors, setListProduceInspectors] = useState<UserDetailModel[]>([]);

  const cancelButtonResetForm = () => {
    console.log("Close cofirm dialog");
  };

  const showResetConfirmDialog = () => {
    Modal.confirm({
      title: "Do you want to RESET?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onReset();
      },
      onCancel() {
        cancelButtonResetForm();
      },
    });
  };

  const [loadingButton, setLoadingButton] = useState(false);

  const handleSubmitCreateProject = async (value: any) => {
    setLoadingButton(true);

    const managerId = currentManagerInfo._id;

    const finalValue = { ...value, manager: managerId };

    console.log(finalValue);

    const result: any = await CreateNewProjectService(finalValue);

    if (result?.status === 200) {
      console.log("Tạo mới thành công");

      successMessage("Create new project successfully!");

      navigate(`/project-management`);
    } else {
      if (result.response.status === 400) {
        console.log(result.response.data.message);
        errorMessage(result.response.data.message);

        setLoadingButton(false);
      } else {
        errorMessage("Have another Error");
        setLoadingButton(false);
      }
    }
  };

  const handleOnChangeFarm = (newFarmId: string) => {
    console.log(newFarmId);
    setSelectedFarmId(newFarmId);
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
      setListFarmProjects([]);
      FarmServices.getAllFarmProjectsService(selectedFarmId).then(
        (res: any) => {
          if (res?.status === 200) {
            res.data.map((element: any) => {
              const farm = element as FarmProjectModel;
              if (farm.projectId === null) {
                setListFarmProjects((prevFarmProject) => [
                  ...prevFarmProject,
                  farm,
                ]);
              }
            });
          }
        }
      );
    }
  }, [selectedFarmId]);

  // get all staff department Harvester
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(2).then(
      (res: any) => {
        if(res?.status === 200) {
          res.data.map((element: any) => {
            const harvester = parseUserDetail(element);
            setListHavesters((prev) => [
              ...prev, harvester,
            ])
          });
        }
      }
    );
  }, []);

  // get all staff Transport Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(3).then(
      (res: any) => {
        if(res?.status === 200) {
          res.data.map((element: any) => {
            const transporter = parseUserDetail(element);
            setListTransporters((prev) => [
              ...prev, transporter,
            ])
          });
        }
      }
    );
  }, []);

  // get all staff Warehouse Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(4).then(
      (res: any) => {
        if(res?.status === 200) {
          res.data.map((element: any) => {
            const warehouse = parseUserDetail(element);
            setListWarehouseInspectors((prev) => [
              ...prev, warehouse,
            ])
          });
        }
      }
    );
  }, []);

  // get all staff Produce Inspector
  useEffect(() => {
    StaffServices.getAllStaffByDepartment(5).then(
      (res: any) => {
        if(res?.status === 200) {
          res.data.map((element: any) => {
            const produce = parseUserDetail(element);
            setListProduceInspectors((prev) => [
              ...prev, produce,
            ])
          });
        }
      }
    );
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-sytle">
              <Breadcrumb.Item>Project Management</Breadcrumb.Item>
              <Breadcrumb.Item>Create Project</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Create new Project</div>
            <div className="sub-title-header">
              Enter info form to create new project
            </div>
          </Col>
        </div>
        <div className="content-page">
          <Col style={{ paddingTop: "64px" }}>
            <Form
              {...contentLayout}
              form={form}
              onFinish={(value) => {
                handleSubmitCreateProject(value);
              }}
            >
              <Form.Item
                label="Project Code"
                name="projectCode"
                required
                rules={[
                  { required: true, message: "Please enter project code" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Project Name"
                name="projectName"
                required
                rules={[
                  { required: true, message: "Please enter Project name" },
                ]}
              >
                <Input />
              </Form.Item>
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
              <Form.Item label="Harvestor" name="harvestor">
                <Select placeholder="Select harvestor in Harvest Inspection">
                  {listHavesters.map((harvester) => (
                    <Select.Option
                      value={harvester.userId}
                      key={harvester.userId}
                    >
                      <Tooltip
                        placement="right"
                        title={`${harvester.lastName} ${harvester.firstName}` ?? "No name"}
                      >
                        {harvester.email}
                      </Tooltip>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Transport Inspector" name="transportInspector">
                <Select placeholder="Select Transport Inspector">
                  {listTransporters.map((transporter) => (
                    <Select.Option
                      value={transporter.userId}
                      key={transporter.userId}
                    >
                      <Tooltip
                        placement="right"
                        title={`${transporter.lastName} ${transporter.firstName}` ?? "No name"}
                      >
                        {transporter.email}
                      </Tooltip>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Warehouse Inspector" name="warehouseInspector">
                <Select placeholder="Select Warehouse Inspector">
                  {listWarehouseInspectors.map((warehouse) => (
                    <Select.Option
                      value={warehouse.userId}
                      key={warehouse.userId}
                    >
                      <Tooltip
                        placement="right"
                        title={`${warehouse.lastName} ${warehouse.firstName}` ?? "No name"}
                      >
                        {warehouse.email}
                      </Tooltip>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Produce Inspector" name="produceInspector">
                <Select placeholder="Select Produce Inspector">
                  {listProduceInspectors.map((produce) => (
                    <Select.Option
                      value={produce.userId}
                      key={produce.userId}
                    >
                      <Tooltip
                        placement="right"
                        title={`${produce.lastName} ${produce.firstName}` ?? "No name"}
                      >
                        {produce.email}
                      </Tooltip>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={tailContentLayout}
                style={{ marginTop: "16px" }}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ marginRight: "12px" }}
                  loading={loadingButton}
                >
                  Create
                </Button>
                <Button
                  type="default"
                  size="large"
                  htmlType="button"
                  onClick={showResetConfirmDialog}
                >
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </div>
      </Col>
    </div>
  );
};

export default CreateNewProject;
