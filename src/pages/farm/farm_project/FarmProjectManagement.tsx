import FarmServices from '@/api/farm/farm_api';
import { FarmProjectModel } from '@/types/farm_model';
import { UserDetailModel } from '@/types/user';
import { Col, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import Table, { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const columns: ColumnsType<FarmProjectModel> = [
  {
    title: "Farm Project ID",
    width: 100,
    dataIndex: "farmProjectId",
    key: "farmProjectId",
    fixed: 'left',
    align: "center", 
  },
  {
    title: "Farm Project Code",
    width: 100,
    dataIndex: "farmProjectCode",
    key: "farmProjectCode",
    fixed: 'left',
    align: "center", 
  },
  {
    title: "Farm ID",
    width: 100,
    dataIndex: "projectId",
    key: "projectId",
    fixed: 'left',
    align: "center", 
  },
  {
    title: "Farmer",
    width: 100,
    dataIndex: "farmer",
    key: "farmer",
    fixed: 'left',
    align: "center", 
    render: (farmer: UserDetailModel) => <div> {farmer === null ? '' : farmer.lastName + " " + farmer.firstName} </div>
  },
  {
    title: "Date Created",
    width: 100,
    dataIndex: "dateCreated",
    key: "dateCreated",
    fixed: 'left',
    align: "center",
    render: (date: string) => <div>
      {moment(date).format("DD/MM/YYYY")}
    </div>,
  },
  {
    title: "State",
    width: 100,
    dataIndex: "state",
    key: "state",
    fixed: 'left',
    align: "center", 
  },
];

const FarmProjectManagement = () => {
  const [dataFarmProjects, setDataFarmProjects] = useState<FarmProjectModel[]>([]);

  const farmId = useSelector((state: any) => state.authen.currentUserInfo.farmId);

  console.log(farmId);

  useEffect(() => {
    FarmServices.getAllFarmProjectsService("640d5f994c62a777b9986114").then((res: any) => {
      if(res?.status === 200) {
        res.data.map((element: any) => {
          const farmProject = element as FarmProjectModel;
          setDataFarmProjects((prevFarmProject) => [...prevFarmProject, farmProject]);
        });
      }
    });
  }, [setDataFarmProjects]);

  console.log(dataFarmProjects);

  return (
    <div>
      <Col>
        <div className='header-content'>
          <Col>
            <div className='title-header'>
              Farm Project Management
            </div>
            <div className="sub-title-header">
              Display the list of farm projects in your farm
            </div>   
          </Col>
        </div>
        <div className='content-page'>
          <Row style={{paddingBottom: '12px', justifyContent: 'space-between'}}>
              <Row style={{width:'80%'}}>
                <div className="label-search">
                  Find farm project
                </div>
                <div className="search-item">
                  <Search placeholder="Enter your farm project" enterButton/>
                </div>
              </Row>
            </Row>
          <Table
            columns={columns}
            dataSource={dataFarmProjects}
            scroll={{x: 1300}}

          />
        </div>
      </Col>
    </div>
  )
}

export default FarmProjectManagement