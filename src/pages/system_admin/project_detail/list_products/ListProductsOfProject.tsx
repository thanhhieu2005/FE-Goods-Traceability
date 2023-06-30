import ProjectServices from "@/api/system_admin/project_api";
import LabelContentItem from "@/components/Label/LabelContentItem";
import SpinApp from "@/components/Spin/SpinApp";
import { ProductImageModel, ProductModel } from "@/types/product_model";
import { completedColor, mainColor, whiteColor } from "@/utils/app_color";
import { CheckCircleOutlined, FormOutlined } from "@ant-design/icons/lib/icons";
import { Breadcrumb, Col, Empty, Row, Image, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ListProductsOfProject = () => {
  const { state: projectId } = useLocation();

  const [dataProducts, setDataProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const getProductsByProjectId = async () => {
      const getProducts: any = await ProjectServices.getProductsByProjectId(
        projectId
      );

      if (getProducts.status === 200) {
        setDataProducts(getProducts.data);
      }
    };

    getProductsByProjectId();
    setIsLoading(false);
  }, [projectId]);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {!isLoading ? (
        <>
          <div>
            <Col>
              <div className="header-content">
                <Col>
                  <Breadcrumb className="breadcrumb-style">
                    <Breadcrumb.Item>Project Management</Breadcrumb.Item>
                    <Breadcrumb.Item>Project Detail</Breadcrumb.Item>
                    <Breadcrumb.Item>Products in Project</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="title-header">Products in Project</div>
                  <div className="sub-title-header">
                    Project ID: {projectId}
                  </div>
                </Col>
              </div>
              <div className="content-page">
                {dataProducts.length !== 0 ? (
                  dataProducts.map((product: ProductModel, index: number) => (
                    <div key={index}>
                      <Row
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          paddingBottom: "12px",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: mainColor,
                          }}
                        >
                          Product Information
                        </p>
                        <Row>
                          <Button
                            type="default"
                            icon={<FormOutlined />}
                            size="middle"
                          >
                            Update
                          </Button>
                          <div style={{ padding: "4px" }} />
                          <Button
                            type="default"
                            icon={<CheckCircleOutlined />}
                            size="middle"
                            style={{
                              backgroundColor: completedColor,
                              color: whiteColor,
                              borderColor: completedColor,
                            }}
                          >
                            Approach
                          </Button>
                        </Row>
                      </Row>
                      <Row>
                        <LabelContentItem
                          myProps={{
                            label: "Product ID",
                            content: product.productId,
                          }}
                        />
                        <LabelContentItem
                          myProps={{
                            label: "Product Name",
                            content: product.productName,
                          }}
                        />
                      </Row>
                      <Row>
                        <LabelContentItem
                          myProps={{
                            label: "Product EXP",
                            content: product.exp,
                          }}
                        />
                        <LabelContentItem
                          myProps={{
                            label: "Product MFG",
                            content: product.mfg,
                          }}
                        />
                      </Row>
                      <LabelContentItem
                        myProps={{
                          label: "Certificate of Food Hygiene and Safety",
                          content: product.certificateOfFoodHygieneAndSafety,
                          width: "100%",
                        }}
                      />
                      <LabelContentItem
                        myProps={{
                          label: "Bussiness License Registration Number",
                          content: product.bussinessLicenseRegistrationNumber,
                          width: "100%",
                        }}
                      />
                      <Row>
                        <LabelContentItem
                          myProps={{
                            label: "Type of Product",
                            content: product.typeOfProduct,
                          }}
                        />
                        <LabelContentItem
                          myProps={{
                            label: "Measure Unit",
                            content: product.measureUnit,
                          }}
                        />

                        <>
                          {product.productImage.length > 0 ? (
                            <Row style={{ paddingTop: "24px" }}>
                              <p className="title-text">Product Images:</p>
                              <div style={{ padding: "12px" }} />
                              {product.productImage.map(
                                (image: ProductImageModel, key: number) => (
                                  <div key={key} className="common-image">
                                    <Image
                                      src={image.productImageUrl}
                                      style={{ marginRight: "12px" }}
                                    />
                                  </div>
                                )
                              )}
                            </Row>
                          ) : (
                            <></>
                          )}
                        </>
                        <div className="divided" />
                      </Row>
                    </div>
                  ))
                ) : (
                  <div>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </div>
            </Col>
          </div>
        </>
      ) : (
        <SpinApp />
      )}
    </>
  );
};

export default ListProductsOfProject;
