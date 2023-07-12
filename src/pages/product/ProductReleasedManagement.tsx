import ProductServices from "@/api/product_api";
import { ProductModel } from "@/types/product_model";
import { Col, Row } from "antd";
import Search from "antd/lib/input/Search";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductReleasedManagement = () => {
  const navigate = useNavigate();

  const [dataReleasedProducts, setDataReleasedProducts] = useState<
    ProductModel[]
  >([]);

  useEffect(() => {
    const getALlReleasedProducts = async () => {
      try {
        const res: any = await ProductServices.getAllProductApproved();

        console.log(res);
        if (res.status === 200) {
          const formatKey = res.data.map((e: ProductModel) => {
            return {
              ...e,
              key: e.productId,
            };
          });

          setDataReleasedProducts(formatKey);
        }
      } catch (err) {
        //
      }
    };

    getALlReleasedProducts();
  }, []);

  const columns: ColumnsType<ProductModel> = [
    {
      title: "Product ID",
      width: 100,
      dataIndex: "productId",
      key: "productId",
      fixed: "left",
      align: "center",
    },
    {
      title: "Project ID",
      width: 100,
      dataIndex: "projectId",
      key: "projectId",
      fixed: "left",
      align: "center",
    },
    {
      title: "Product Name",
      width: 100,
      dataIndex: "productName",
      key: "productName",
      fixed: "left",
      align: "center",
    },
    {
      title: "Exp",
      width: 100,
      dataIndex: "exp",
      key: "exp",
      fixed: "left",
      align: "center",
    },
  ];

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <div className="title-header">Product Management</div>
            <div className="sub-title-header">
              List of approved and released products
            </div>
          </Col>
        </div>
        <div className="content-page">
          <Row
            style={{
              paddingBottom: "12px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Row style={{ width: "80%" }}>
              <div className="label-search">Find product</div>
              <div className="search-item">
                <Search placeholder="Enter your product" enterButton />
              </div>
            </Row>
          </Row>
          <Table
            columns={columns}
            dataSource={dataReleasedProducts}
            scroll={{ x: 1300 }}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
            onRow={(product: ProductModel) => {
              return {
                onClick: () => {
                  navigate(
                    `/released-product-management/${product.productId}`,
                    {
                      state: product,
                    }
                  );
                },
              };
            }}
          />
        </div>
      </Col>
    </div>
  );
};

export default ProductReleasedManagement;
