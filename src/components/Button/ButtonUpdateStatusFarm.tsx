import FarmManagementService from "@/api/admin_tech/farm_management_services";
import { StatusFarm } from "@/types/farm_model";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { successMessage } from "../Message/MessageNoti";

const ButtonUpdateStatusFarm = ({ myProps: props }: any) => {
  const statusFarm: StatusFarm = props.statusFarm;

  const farmId: string = props.farmId;

  const isCall: any = props.isCall;

  const activeFarm = () => {
    Modal.confirm({
      title: "Active this Farm",
      content: "When you confirm, this farm will be actived!",
      onOk:  () => {
        updateFarmStatus(1);
      },
    });
  };

  const updateFarmStatus = async (status: number) => {
    const res: any = await FarmManagementService.updateFarmInfoService(
        farmId,
        {
          statusFarm: status,
        }
      );

      console.log(res);

    if(res.status === 200) {
        //
        props.setIsCall(!isCall);

        successMessage("Update Status Farm Successfully!");
    }
  }

  return (
    <Button onClick={activeFarm} type="primary">
      {statusFarm === StatusFarm.Actived
        ? "Revoked"
        : statusFarm === StatusFarm.NotActive
        ? "Active Farm"
        : "Actived"}
    </Button>
  );
};

export default ButtonUpdateStatusFarm;
