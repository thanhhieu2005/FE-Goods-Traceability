import LabelContentItem from "@/components/Label/LabelContentItem";
import { ProductImageModel, ProductModel } from "@/types/product_model";
import { mainColor } from "@/utils/app_color";
import { Breadcrumb, Col, Image, Row } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductReleasedDetail = () => {
  const { state: product } = useLocation();

  const [dataProduct, setDataProduct] = useState<ProductModel>(product);

  console.log(dataProduct);

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-style">
              <Breadcrumb.Item>Released Product Management</Breadcrumb.Item>
              <Breadcrumb.Item>Released Product Detail</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Released Product Detail</div>
            <div className="sub-title-header">
              Detailed information of the product has been announced to the
              market
            </div>
          </Col>
        </div>
        <div className="content-page">
          <p
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: mainColor,
              paddingBottom: "36px",
            }}
          >
            {dataProduct.productName}
          </p>
          <Row
            gutter={16}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Col style={{ display: "flex", flexDirection: "column" }} span={12}>
              <Row>
                <LabelContentItem
                  myProps={{
                    label: "Product ID",
                    content: dataProduct.productId,
                    width: "100%",
                  }}
                />
              </Row>
              <div style={{ padding: "8px" }} />
              <LabelContentItem
                myProps={{
                  label: "Product Exp",
                  content: dataProduct.exp,
                  width: "100%",
                }}
              />
              <div style={{ padding: "8px" }} />
              <LabelContentItem
                myProps={{
                  label: "Product Mfg",
                  content: dataProduct.mfg,
                  width: "100%",
                }}
              />
              <div style={{ padding: "8px" }} />
              <LabelContentItem
                myProps={{
                  label: "Certificate of Food Hygiene and Safety",
                  content: dataProduct.certificateOfFoodHygieneAndSafety,
                  width: "100%",
                }}
              />
              <div style={{ padding: "8px" }} />
              <LabelContentItem
                myProps={{
                  label: "Business License Registration Number",
                  content: dataProduct.businessLicenseRegistrationNumber,
                  width: "100%",
                }}
              />
              <div style={{ padding: "8px" }} />
              <LabelContentItem
                myProps={{
                  label: "Type of Product",
                  content: dataProduct.typeOfProduct,
                  width: "100%",
                }}
              />
              <div style={{ padding: "8px" }} />
              <LabelContentItem
                myProps={{
                  label: "Measure Unit",
                  content: dataProduct.measureUnit,
                  width: "100%",
                }}
              />
              <div style={{ padding: "8px" }} />
              <>
                {dataProduct.productImage.length > 0 ? (
                  <Row style={{ paddingTop: "24px" }}>
                    <p className="title-text">Product Images:</p>
                    <div style={{ padding: "12px" }} />
                    {dataProduct.productImage.map(
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
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "start",
              }}
              span={12}
            >
              <Col>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "black",
                    fontWeight: "600",
                    fontSize: "24px",
                  }}
                >
                  QR Code
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={dataProduct.productQRCodeUri}
                    alt="Base64 Image"
                    height={240}
                  />
                </div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#3F2E3E",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Scan this QR to show Information of Project
                </p>
              </Col>
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
};

export default ProductReleasedDetail;
