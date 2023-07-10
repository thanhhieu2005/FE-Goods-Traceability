import FarmManagementService from "@/api/admin_tech/farm_management_services";
import FarmServices from "@/api/farm/farm_api";
import { addTrackingBlock } from "@/api/node_api/blockchain_helper";
import { UpdateProjectInfo } from "@/api/system_admin/project_api";
import { ShowDrawerEdit } from "@/components/Drawer/DrawerEditItem";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { modalUpdateContentLayout } from "@/styles/content_layout";
import { FarmInfoModel, FarmProjectModel } from "@/types/farm_model";
import { CommonProjectState, ProjectDetailModel } from "@/types/project_model";
import { listCommonState } from "@/types/step_tracking";
import {
  parseColorByCommonState,
  parseToStringCommonState,
} from "@/utils/format_state";
import { Col, Form, Input, Modal, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditProject = ({ myProps: props }: any) => {
  const currentMode: string = useSelector(
    (state: any) => state.mode.currentMode
  );

  const dataProject: ProjectDetailModel = props.dataProject;

  console.log(dataProject);

  const [formUpdate] = Form.useForm();

  const [selectedFarmId, setSelectedFarmId] = useState<string>();

  const [listFarms, setListFarms] = useState<FarmInfoModel[]>([]);

  const [listFarmProjects, setListFarmProjects] = useState<FarmProjectModel[]>(
    []
  );

  const handleOnChangeFarm = (newFarmId: string) => {
    formUpdate.setFieldValue("farmProjectId", "");
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
      FarmServices.getAllFarmProjectsService(selectedFarmId).then(
        (res: any) => {
          if (res?.status === 200) {
            setListFarmProjects(
              res.data.filter((element: any) => {
                const farm = element as FarmProjectModel;

                if (farm.projectId === null) {
                  console.log("res", farm);
                  return true;
                }
                return false;
              })
            );
          }
        }
      );
    }
  }, [selectedFarmId]);

  const checkCanUpdateProjectState = (value: any) => {
    if (value.state === CommonProjectState.Completed) {
      if (
        dataProject.harvest.state !== CommonProjectState.Completed &&
        dataProject.transport.state !== CommonProjectState.Canceled &&
        dataProject.warehouseStorage.state !== CommonProjectState.Completed &&
        dataProject.produce.state !== CommonProjectState.Completed
      ) {
        return false;
      } else return true;
    }
    return true;
  };

  const [isLoading, setIsLoading] = useState(false);

  const confirmBeforeUpdate = (value: any) => {
    setIsLoading(true);
    if (value.state === CommonProjectState.Completed) {
      Modal.confirm({
        title: "Complete this project",
        content:
          "If you confirm, this project will be update state completed and you will not be updated.",
        onOk: () => {
          if (currentMode === "Current Blockchain Mode is Public Mode") {
            handleUpdateProject(value);
          }
          handleUpdateProject(value);
        },
      });
    } else if (value.state === CommonProjectState.Canceled) {
      Modal.confirm({
        title: "Cancel this project?",
        content:
          "If you confirm cancel this project, steps in project will be Canceled",
        onOk: () => {
          handleUpdateProject(value);
        },
      });
    } else {
      handleUpdateProject(value);
    }
  };

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handleUpdateProject = async (value: any) => {
    setIsUpdateLoading(true);
    const projectId = dataProject.projectId;

    const res: any = await UpdateProjectInfo(value, projectId);

    if (res.status === 200) {
      props.setDataProject(res.data.project);

      setIsUpdateLoading(false);

      props.setOpenModalUpdate(false);
      props.setCallGetLog(true);

      successMessage("Update Successfully!");
    } else {
      setIsUpdateLoading(false);
      errorMessage("Update Failed!");
    }
  };

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Edit Information of Project",
          onOpen: props.showEditProjectDrawer,
          onClose: props.closeEditProjectDrawer,
          onSubmit: formUpdate.submit,
          loading: isUpdateLoading,
          content: (
            <Col>
              <Form
                {...modalUpdateContentLayout}
                form={formUpdate}
                onFinish={(value) => {
                  console.log("Select", value);
                  // var finalValue = formatValue(value);
                  if (checkCanUpdateProjectState(value) === false) {
                    Modal.warning({
                      title: "Can not update!",
                      content:
                        "Steps in project have not been Completed yet! Please, complete the steps.",
                    });
                  } else {
                    confirmBeforeUpdate(value);
                  }
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
                    <Form.Item label="Farm Project" name="farmProject">
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
                  label="State"
                  name="state"
                  initialValue={dataProject?.state}
                >
                  <Select placeholder="Select new State">
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
                {/* <Form.Item wrapperCol={tailUpdateContentLayout}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{ marginRight: "12px" }}
                    loading={props.isLoadingUpdate}
                  >
                    Update
                  </Button>
                </Form.Item> */}
              </Form>
            </Col>
          ),
        }}
      />
    </>
  );
};
export default EditProject;
