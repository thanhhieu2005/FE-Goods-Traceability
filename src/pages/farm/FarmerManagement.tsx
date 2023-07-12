import FarmServices from "@/api/farm/farm_api";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import { ShowModalCreateNewItem } from "@/components/Modal/ModalCreateItem";
import { ListUserInfo, parseListUserInfo } from "@/types/user";
import { Button, Col, Form, Input, Row } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";

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

const FarmerManagement = ({ myProp: props }: any) => {
  const [formAddFarmer] = Form.useForm();
  const [dataFarmers, setDataFarmers] = useState<ListUserInfo[]>([]);

  useEffect(() => {
    const getAllFarmers = async () => {
      try {
        const res: any = await FarmServices.getAllFarmersInFarm(props.farmId);

        console.log(res);

        if (res.status === 200) {
          res.data.map((element: any) => {
            const user = parseListUserInfo(element.farmer) as ListUserInfo;
            console.log(user);
            setDataFarmers((prevUser) => [...prevUser, user]);
          });
        }
      } catch (err) {
        // handle error
      }
    };
    getAllFarmers();
  }, [props.farmId]);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const showModalAddFarmer = () => {
    setIsModalAddOpen(true);
  }

  const submitAddFarmer = async (email: string) => {
    const result: any = await FarmServices.addFarmerIntoFarm(props.farmId, email);

    console.log(result);
    // need to handle this 
    if(result.status === 200) {
      successMessage("Add Farmer Successfully!");
      setIsModalAddOpen(false);
    } else if(result.response.status === 400) {
      errorMessage(result.response.data.errorMessage)
    } else {
      errorMessage("Somethings went wrong!");
    }
  }

  const cancelCloseModalAddFarmer = () => {
    formAddFarmer.resetFields();
    setIsModalAddOpen(false);
  }

  return (
    <>
      {isModalAddOpen && (
        <ShowModalCreateNewItem
        myProps ={{
          title: "Add Farmer in your Farm",
          isOpen: isModalAddOpen,
          onCancel: cancelCloseModalAddFarmer,
          onOk: formAddFarmer.submit,
          onText: "Add",
          content: (
            <div style={{padding: '24px'}}>
              <Form
                layout="vertical"
                form={formAddFarmer}
                onFinish={submitAddFarmer}
              >
                <>
                  <Form.Item
                    label="Email"
                    name="email"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter email"
                      }
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                </>
              </Form>
            </div>
          ),
        }}
      />
      )}
      <div style={{ padding: "12px" }}>
        <Col>
          <Row style={{ paddingBottom: "12px", justifyContent: "flex-end" }}>
            <div className="action-layout-btn">
              <Button type="primary" onClick={showModalAddFarmer}>Add new Farmer</Button>
            </div>
          </Row>
          <Table
            columns={columns}
            dataSource={dataFarmers}
            scroll={{ x: 1300 }}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
          />
        </Col>
      </div>
    </>
  );
};

export default FarmerManagement;
