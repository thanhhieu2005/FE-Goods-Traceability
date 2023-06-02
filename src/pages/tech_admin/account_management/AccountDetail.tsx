import UserManagementService from '@/api/admin_tech/user_management_service';
import { Avatar, Breadcrumb, Button, Col, Form, Input, Row, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { UserOutlined } from '@ant-design/icons';

import '../../common.scss';
import { parseUserDetail, UserDetailModel } from '@/types/user';
import { contentLayout } from '@/styles/content_layout';


const AccountDetail = () => {
  const {state : userId} = useLocation();

  const [dataUserDetail, setDataUserDetail] = useState<UserDetailModel>();

  useEffect(() => {
    UserManagementService.getDetailUserByIdService(userId).then((res: any) => {
        const userDetail = parseUserDetail(res.data);
        setDataUserDetail(userDetail);

        console.log(dataUserDetail);
    })
  }, []);

  return (
    <Col>
        <div className='header-content'>
            <Col>
                <Breadcrumb className='breadcrumb-style'>
                    <Breadcrumb.Item>Account Management </Breadcrumb.Item>
                    <Breadcrumb.Item>Account Detail</Breadcrumb.Item>
                </Breadcrumb>
                <div className='title-header'>
                    User Information
                </div>
                <div className='sub-title-header'>
                    Display detailed information of the user in the system, Admin can update the information for the account
                </div>
            </Col>
        </div>
        <div className='content-page'>
            {dataUserDetail ? (
            <Col>
                <div style={{paddingBottom: '64px'}}>
                    <Row style={{display: 'flex', alignContent: 'center'}}>
                        <Row style={{width: '80%'}}>
                            <Avatar size={80} icon={<UserOutlined />} />
                            <div style={{
                                paddingLeft: '12px', 
                                fontWeight: '600', 
                                fontSize: '24px',
                                display: 'flex',
                                alignContent: 'center',
                                flexWrap: 'wrap',
                            }}>
                                {dataUserDetail?.lastName} {dataUserDetail?.firstName} 
                            </div>
                        </Row >
                        <div style={{display: 'flex', alignContent: 'center', flexWrap: 'wrap', width: '20%', justifyContent:'flex-end'}}>
                            <Button type="primary" style={{borderRadius: '8px' }}>Update Role</Button>
                        </div>
                    </Row>   
                </div>
                <div>
                    <Form {...contentLayout}>
                    <Form.Item
                        label="User ID"
                        name="userId"
                        initialValue={dataUserDetail?.userId}
                       >
                        <Input/>
                       </Form.Item>
                       <Form.Item
                        label="Email Address"
                        name="email"
                        initialValue={dataUserDetail?.email}
                       >
                        <Input/>
                       </Form.Item>
                       <Form.Item
                        label="Wallet Address"
                        name="walletAddress"
                        initialValue={dataUserDetail?.walletAddress}
                       >
                        <Input/>
                       </Form.Item>
                       <Form.Item
                        label="User Role"
                        name="role"
                        initialValue={dataUserDetail?.role}
                       >
                        <Input/>
                       </Form.Item>
                    </Form>
                </div>
            </Col>
            ) : <div>
                <Skeleton avatar paragraph={{rows: 4}}/>
            </div>
        }
        </div>
    </Col>
  )
}

export default AccountDetail