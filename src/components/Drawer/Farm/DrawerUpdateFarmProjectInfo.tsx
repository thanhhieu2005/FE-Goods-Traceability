import FarmServices from "@/api/farm/farm_api";
import { modalUpdateContentLayout } from "@/styles/content_layout";
import { FarmProjectModel, LandModel, LandState, SeedModel } from "@/types/farm_model";
import { UserDetailModel, parseUserDetail } from "@/types/user";
import { Form, Input, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { ShowDrawerEdit } from "../DrawerEditItem";

const DrawerUpdateFarmProjectInfo = ({ myProps: props }: any) => {
  const [formUpdate] = Form.useForm();

  const dataFarmProject: FarmProjectModel = props.dataFarmProject;

  const [dataSeeds, setDataSeeds] = useState<SeedModel[]>([]);

  const [dataLands, setDataLands] = useState<LandModel[]>([]);

  const [dataFarmers, setDataFarmers] = useState<UserDetailModel[]>([]);

  const [isSelectedLand, setIsSelectedLand] = useState<string>(
    dataFarmProject.land.landId
  );

  useEffect(() => {
    const getAllSeed = async () => {
      try {
        const res: any = await FarmServices.getAllSeedInFarmService(
          dataFarmProject.farmId
        );

        if (res.status === 200) {
          setDataSeeds(res.data);
        }
      } catch (err) {
        return err;
      }
    };
    const getAllLandEmpty = async () => {
      try {
        const res: any = await FarmServices.getAllLandInFarmService(
          dataFarmProject.farmId
        );

        if (res.status === 200) {
          setDataLands(
            res.data.filter((element: LandModel) => {
              return element.state !== LandState.Cultivating
            })
          );
        }
      } catch (err) {
        return err;
      }
    };
    const getFarmerInFarm = async () => {
      try {
        const res: any = await FarmServices.getAllFarmersInFarm(
          dataFarmProject.farmId
        );

        if (res.status == 200) {
          res.data.map((element: any) => {
            const farmer = parseUserDetail(element.farmer);

            setDataFarmers((prevFarmer) => [...prevFarmer, farmer]);
          });
        }
      } catch (err) {
        return err;
      }
    };

    getAllSeed();
    getAllLandEmpty();
    getFarmerInFarm();
  }, [dataFarmProject.farmId]);

  const handleOnChangeLand = (newLandId: string) => {
    setIsSelectedLand(newLandId);
  };

  return (
    <>
      <ShowDrawerEdit
        myProps={{
          title: "Edit Farm Project",
          onOpen: props.showEditFarmProject,
          onClose: props.cancelCloseEditFarmProject,
          onSubmit: formUpdate.submit,
          content: (
            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Update new information for the farm project
              </div>
              <Form
                {...modalUpdateContentLayout}
                onFinish={(value) => {
                  props.submitEditProject(value);
                }}
                form={formUpdate}
              >
                <Form.Item
                  label="Farmer in charge"
                  name="farmer"
                  initialValue={
                    dataFarmProject.farmer !== null
                      ? dataFarmProject.farmer.email
                      : "Not Assigned yet"
                  }
                >
                  <Select>
                    {dataFarmers.map((farmer) => (
                      <Select.Option value={farmer.userId} key={farmer.userId}>
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
                <Form.Item
                  label="Land's Project"
                  name="land"
                  required
                  initialValue={dataFarmProject.land.landName}
                  rules={[{ required: true, message: "Please select a land" }]}
                >
                  {dataFarmProject.land.state === LandState.Cultivating ? (
                    <Input disabled/>
                  ) : (
                    <Select onChange={handleOnChangeLand}>
                    {dataLands.map((land) => (
                      <Select.Option value={land.landId} key={land.landId}>
                        {" "}
                        {land.landName}
                      </Select.Option>
                    ))}
                  </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="Seed's Project"
                  name="seed"
                  initialValue={dataFarmProject.seed.seedName}
                  required
                  rules={[{ required: true, message: "Please select a seed" }]}
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
              </Form>
            </div>
          ),
        }}
      />
    </>
  );
};

export default DrawerUpdateFarmProjectInfo;
