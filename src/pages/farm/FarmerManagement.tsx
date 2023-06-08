import FarmServices from '@/api/farm/farm_api';
import { ListUserInfo } from '@/types/user'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'

const columns: ColumnsType<ListUserInfo> = [
    {
        title: "User ID",
        width: 120,
        dataIndex: "userId",
        key: "userId",
        fixed: "left",
        align: "center",
    },
    {
        title: "Email",
        width: 120,
        dataIndex: "email",
        key: "email",
        fixed: "left",
        align: "center",
      },
      {
        title: "Full Name",
        width: 100,
        dataIndex: "fullName",
        key: "fullName",
        fixed: "left",
        align: "center",
      },
      {
        title: "Wallet Adress",
        width: 120,
        dataIndex: "walletAddress",
        key: "walletAddress",
        fixed: "left",
        align: "center",
      },
      {
        title: "Phone Number",
        width: 100,
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        fixed: "left",
        align: "center",
      },
      {
        title: "Address",
        width: 100,
        dataIndex: "address",
        key: "address",
        fixed: "left",
        align: "center",
      },
];

const FarmerManagement = ({myProp: props}: any) => {

  const [dataFarmers, setDataFarmers] = useState<ListUserInfo[]>([]);

  useEffect(() => {
    const getAllFarmers = async () => {
        try {
            const res: any = await FarmServices.getAllFarmersInFarm(props.farmId);
        } catch(err) {
            // handle error
        }
    }
  }, []);
    
  return (
    <div>FarmerManagement</div>
  )
}

export default FarmerManagement