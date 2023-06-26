import { ProductModel } from "@/types/product_model";
import { Col, Row } from "antd";
import React from "react";
import LabelContentItem from "../Label/LabelContentItem";

const ProductInfoCard = ({ myPros: product }: any) => {
  return (
    <>
      {product !== undefined ? (
        <Col>
          <Row>
            <p>{product}</p>
          </Row>
        </Col>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default ProductInfoCard;
