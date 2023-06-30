import ApiCommonService from "@/api/api_common/api_common";
import ProductionSupervisionServices from "@/api/produce_api";
import { errorMessage } from "@/components/Message/MessageNoti";
import {
  createContentLayout,
  tailContentLayout,
} from "@/styles/content_layout";
import { HarvestModel, ProductionModel } from "@/types/step_tracking";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Form, Input, Modal, Row, Image } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { state: dataProduction } = useLocation();

  const [loadingButton, setLoadingButton] = useState(false);

  const onReset = () => {
    form.resetFields();
  };

  const showResetConfirmDialog = () => {
    Modal.confirm({
      title: "Do you want to RESET?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onReset();
      },
    });
  };

  const produce: ProductionModel = dataProduction;

  const handleSubmitCreateProduct = async (value: any) => {
    setLoadingButton(true);

    console.log(linkImages);

    const finalValue = {
      ...value,
      projectId: produce.projectId,
      productImage: linkImages,
    };

    console.log(finalValue);

    const result: any = await ProductionSupervisionServices.createNewProduct(
      finalValue
    );

    console.log(result);

    if (result?.status === 200) {
      console.log(result);
      Modal.success({
        content: "Create new project successfully!",
        onOk: () => {
          navigate(`/produce-management/${produce.produceSupervisionId}`, {
            state: produce.produceSupervisionId,
          });
        },
      });
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

  useEffect(() => {
    return () => {
      linkImages.forEach((e: any) => {
        handleDeleteLinkImage(e);
      });

      setLinkImages([]);
    };
  }, []);

  const handleDeleteLinkImage = async (url: string) => {
    await ApiCommonService.deleteImage(url);
  };

  const [linkImages, setLinkImages] = useState<any[]>([]);

  const handlePreviewProductImages = async (e: any) => {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        errorMessage("File format is incorrect!");
      } else {
        console.log(file);

        const formData = new FormData();
        formData.append("images", file);

        const res: any = await ApiCommonService.uploadImage(formData);

        console.log(res);

        if (res.status === 200) {
          setLinkImages((prev) => [...prev, res.data[0]]);
        }
      }
    }
  };

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-sytle">
              <Breadcrumb.Item>Production Supervision</Breadcrumb.Item>
              <Breadcrumb.Item>Create new Product</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Create new Product</div>
            <div className="sub-title-header">
              Create mew product information after final production inspection
              has been completed. The information after creation will be updated
              to the shipment and can be edited.
            </div>
          </Col>
        </div>
        <div className="content-page">
          <p className="text-main-label" style={{ fontSize: "18px" }}>
            Form Create Product
          </p>
          <Col style={{ paddingTop: "48px" }}>
            <Form
              {...createContentLayout}
              form={form}
              onFinish={(value) => {
                handleSubmitCreateProduct(value);
              }}
            >
              <Form.Item
                label="Product Name"
                name="productName"
                required
                rules={[
                  { required: true, message: "Please enter product name" },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
              <Form.Item
                label="Exp"
                name="exp"
                required
                rules={[
                  { required: true, message: "Please enter exp of product" },
                ]}
              >
                <Input placeholder="Enter exp" />
              </Form.Item>
              <Form.Item
                label="Manufacturing Date"
                name="mfg"
                required
                rules={[
                  {
                    required: true,
                    message: "Please enter manufacturing date (mfg)",
                  },
                ]}
              >
                <Input placeholder="Enter date" />
              </Form.Item>
              <Form.Item
                label="Bussiness License Registration Number"
                name="bussinessLicenseRegistrationNumber"
                required
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter Bussiness License Registration Number",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter bussiness license number"
                />
              </Form.Item>
              <Form.Item
                label="Certificate of Food Hygiene and Safety"
                name="certificateOfFoodHygieneAndSafety"
                required
                rules={[
                  { required: true, message: "Please enter Certificate" },
                ]}
              >
                <Input placeholder="Enter Certificate of Food" />
              </Form.Item>
              <Form.Item
                label="Type of Product"
                name="typeOfProduct"
                required
                rules={[
                  { required: true, message: "Please enter type of product" },
                ]}
              >
                <Input placeholder="Enter type of product" />
              </Form.Item>
              <Form.Item
                label="Measure Unit"
                name="measureUnit"
                required
                rules={[
                  { required: true, message: "Please enter measure unit" },
                ]}
              >
                <Input placeholder="Enter measure unit" />
              </Form.Item>
              <Form.Item label="Product Images" name="productImage">
                <Col>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: "8px",
                    }}
                  >
                    <input type="file" onChange={handlePreviewProductImages} />
                  </Row>
                  <Row>
                    {linkImages.length > 0 ? (
                      linkImages.map((link: any, key: number) => (
                        <div key={key} className="common-image">
                          <Col>
                            <Image src={link} width="100px" />
                          </Col>
                          <Button
                            onClick={async () => {
                              console.log(link);
                              const res: any =
                                await ApiCommonService.deleteImage(link);

                              if (res.status == 200) {
                                setLinkImages((prev) =>
                                  prev.filter((link1, key1) => key !== key1)
                                );
                              }
                            }}
                            style={{
                              width: "100%",
                              marginTop: "4px",
                              borderRadius: "4px",
                            }}
                          >
                            <Row
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <DeleteOutlined />
                              <p>Delete</p>
                            </Row>
                          </Button>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </Row>
                </Col>
              </Form.Item>
              <Form.Item
                wrapperCol={tailContentLayout}
                style={{ marginTop: "16px" }}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ marginRight: "12px", borderRadius: "4px" }}
                  loading={loadingButton}
                >
                  Create
                </Button>
                <Button
                  type="default"
                  size="large"
                  htmlType="button"
                  onClick={showResetConfirmDialog}
                  style={{ borderRadius: "4px" }}
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

export default AddProductPage;
