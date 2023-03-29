import FarmManagementService from '@/api/admin_tech/farm_management_services';
import { FarmInfo } from '@/types/farm';
import { Breadcrumb, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const TechAdminFarmDetail = () => {
  const {state: farmId} = useLocation();

  const [dataFarm, setDataFarm] = useState<FarmInfo>();

  useEffect(() => {
    FarmManagementService.getFarmDetailService(farmId).then((res: any) => {
        if(res.status === 200) {
            console.log(res.data);
        }
    });
  }, [])

  return (
    <Col>
        <div className='header-content'>
            <Col>
                <Breadcrumb className='breadcrumb-sytle'>
                    <Breadcrumb.Item>Farm Management</Breadcrumb.Item>
                    <Breadcrumb.Item>Farm Detail</Breadcrumb.Item>
                </Breadcrumb>
                <div className='title-header'>
                    Farm Information
                </div>
                <div className='sub-title-header'>
                    Display detailed information and update status information for the farm
                </div>
            </Col>
        </div>
        <div className='content-page'>
            
        </div>
    </Col>
  )
}

export default TechAdminFarmDetail