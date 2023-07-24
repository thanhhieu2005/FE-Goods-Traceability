import { ProductImageModel, ProductModel } from "@/types/product_model";
import {
  canceledColor,
  completedColor,
  mainColor,
  whiteColor,
} from "@/utils/app_color";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Image, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import LabelContentItem from "../Label/LabelContentItem";
import ProductServices from "@/api/product_api";
import { errorMessage, successMessage } from "../Message/MessageNoti";
import { icCheck } from "@/assets";

const ProductCheckInfoCard = ({ myProps: props }: any) => {
  const [dataProduct, setDataProduct] = useState<ProductModel>(
    props.dataProduct
  );

  useEffect(() => {
    setDataProduct(props.dataProduct);
  }, [props.dataProduct]);

  const onApproveProduct = async () => {
    const res: any = await ProductServices.approveProduct(
      props.projectId,
      dataProduct.productId
    );

    console.log(res);
    if (res.status === 200) {
      setDataProduct(res.data.product);
      successMessage("Update Successfully!");
    } else {
      errorMessage("Update Failed!");
    }
  };

  return (
    <>
      <div>
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
          {dataProduct.state === 0 ? (
            <Row>
              <Button type="default" icon={<FormOutlined />} size="middle">
                Update
              </Button>
              <div style={{ padding: "4px" }} />
              <Button
                type="default"
                icon={<CloseCircleOutlined />}
                size="middle"
                style={{
                  backgroundColor: canceledColor,
                  color: whiteColor,
                  borderColor: canceledColor,
                }}
                onClick={() => {
                  props.onDeleteProduct(dataProduct);
                }}
              >
                Remove
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
                onClick={() => {
                  Modal.confirm({
                    title: "Approve Product",
                    content: "Product will realse for end user",
                    onOk: () => {
                      onApproveProduct();
                    },
                  });
                }}
              >
                Approve
              </Button>
            </Row>
          ) : (
            <>
              <Row style={{ display: "flex", alignItems: "center" }}>
                <img src={icCheck} height={32} />
                <div
                  style={{
                    marginLeft: "12px",
                    border: "solid 1px",
                    padding: "4px 12px",
                    borderColor: completedColor,
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: completedColor,
                    }}
                  >
                    Released
                  </p>
                </div>
              </Row>
            </>
          )}
        </Row>
        <Row>
          <LabelContentItem
            myProps={{
              label: "Product ID",
              content: dataProduct.productId,
            }}
          />
          <LabelContentItem
            myProps={{
              label: "Product Name",
              content: dataProduct.productName,
            }}
          />
        </Row>
        <Row>
          <LabelContentItem
            myProps={{
              label: "Product EXP",
              content: dataProduct.exp,
            }}
          />
          <LabelContentItem
            myProps={{
              label: "Product MFG",
              content: dataProduct.mfg,
            }}
          />
        </Row>
        <LabelContentItem
          myProps={{
            label: "Certificate of Food Hygiene and Safety",
            content: dataProduct.certificateOfFoodHygieneAndSafety,
            width: "100%",
          }}
        />
        <LabelContentItem
          myProps={{
            label: "Bussiness License Registration Number",
            content: dataProduct.businessLicenseRegistrationNumber,
            width: "100%",
          }}
        />
        <Row>
          <LabelContentItem
            myProps={{
              label: "Type of Product",
              content: dataProduct.typeOfProduct,
            }}
          />
          <LabelContentItem
            myProps={{
              label: "Measure Unit",
              content: dataProduct.measureUnit,
            }}
          />

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
          <div className="divided" />
        </Row>
      </div>
    </>
  );
};

export default ProductCheckInfoCard;
