import ProductServices from "@/api/product_api";
import ProjectServices from "@/api/system_admin/project_api";
import ProductCheckInfoCard from "@/components/Card/ProductCheckInfoCard";
import { errorMessage, successMessage } from "@/components/Message/MessageNoti";
import SpinApp from "@/components/Spin/SpinApp";
import { ProductModel } from "@/types/product_model";
import { Breadcrumb, Col, Empty, Modal } from "antd";
import { useEffect, useState } from "react";
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

  const onHandleDeleteProduct = async (product: ProductModel) => {
    setIsLoading(true);
    const res: any = await ProductServices.deleteProduct(product.productId);

    if (res.status === 200) {
      const indexProduct = dataProducts.indexOf(product);
      if (indexProduct !== -1) {
        dataProducts.splice(indexProduct, 1);
        successMessage("Delete Successfully!");
      } else {
        errorMessage("Delete Failed!");
      }
      setDataProducts(dataProducts);
    }
    setIsLoading(false);
  };

  const onConfirmDelete = async (product: ProductModel) => {
    Modal.confirm({
      title: "Delete Project",
      content: "You will delete this Product from Project ?",
      onOk: () => {
        onHandleDeleteProduct(product);
      },
    });
  };

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
                    <ProductCheckInfoCard
                      key={index}
                      myProps={{
                        dataProduct: product,
                        onDeleteProduct: onConfirmDelete,
                        propjectId: projectId,
                      }}
                    />
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
