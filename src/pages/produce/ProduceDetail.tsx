import { GetProduceDetailByIdAPI } from "@/api/produce_api";
import ProductServices from "@/api/product_api";
import { logoVerify } from "@/assets";
import DrawerEditProduction from "@/components/Drawer/DrawerEditProduction";
import LabelContentItem from "@/components/Label/LabelContentItem";
import SpinApp from "@/components/Spin/SpinApp";
import StateCard from "@/components/Tag/StateCard";
import { ProductImageModel, ProductModel } from "@/types/product_model";
import { LogEnum, LogModel } from "@/types/project_log_model";
import { CommonProjectState } from "@/types/project_model";
import { ProductionModel, parseProductionData } from "@/types/step_tracking";
import { checkVerifyBlockchainLog } from "@/utils/check_verify_log";
import {
  FileSearchOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Col, Empty, Image, Modal, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProduceDetail() {
  const [dataProduction, setDataProduction] = useState<ProductionModel>();

  const [dataProducts, setDataProducts] = useState<ProductModel[]>();

  const { state: productionId } = useLocation();

  const navigate = useNavigate();

  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  useEffect(() => {
    GetProduceDetailByIdAPI(productionId).then((res: any) => {
      const production = parseProductionData(res.data);

      setDataProduction(production);
    });
  }, [productionId]);

  useEffect(() => {
    const getDetailProduct = async () => {
      if (dataProduction !== undefined) {
        const res: any = await ProductServices.getDetailProduct(
          dataProduction?.projectId
        );

        if (res.status === 200) {
          setDataProducts(res.data);
        } else {
          console.log("No data");
        }
      }
    };

    getDetailProduct();
  }, [dataProduction]);

  const handleShowDrawerUpdate = () => {
    setIsOpenModalUpdate(true);
  };

  const handleCancelDrawerUpdate = () => {
    setIsOpenModalUpdate(false);
  };

  const checkHasProject = () => {
    if (dataProduction?.projectId !== null) {
      setIsOpenModalUpdate(true);
    } else {
      Modal.warning({
        content:
          "You can't update this step because the project has not assigned yet.",
      });
    }
  };

  // handle for log list
  const [produceLogList, setProduceLogList] = useState<LogModel[]>([]);

  const [isCallGetLog, setCallGetLog] = useState(false);

  useEffect(() => {
    setProduceLogList([]);

    const getProduceLogList = async () => {
      const res: any = await ProductServices.getProduceLogListById(
        productionId
      );

      if (res.status === 200) {
        res.data.map((element: any) => {
          const logModel = element.log as LogModel;
          setProduceLogList((prev) => [...prev, logModel]);
        });
      }
    };

    setTimeout(getProduceLogList, 4000);
  }, [productionId, isCallGetLog]);

  return (
    <>
      {isOpenModalUpdate && (
        <DrawerEditProduction
          myProps={{
            dataProduction: dataProduction,
            showUpdate: handleShowDrawerUpdate,
            cancelCloseUpdate: handleCancelDrawerUpdate,
            setDataProduction: setDataProduction,
            setIsOpenModalUpdate: setIsOpenModalUpdate,
            setCallGetLog: setCallGetLog,
            isCallGetLog: isCallGetLog,
          }}
        />
      )}
      <Col>
        <div className="header-content">
          <Col>
            <Breadcrumb className="breadcrumb-style">
              <Breadcrumb.Item>
                Production Supervision Management
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Production Supervision Project Detail
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-header">Production Supervision</div>
            <div className="sub-title-header">
              Display production project information, status and details of{" "}
              {dataProduction?.projectCode}
            </div>
          </Col>
        </div>
        <div>
          {dataProduction ? (
            <Col>
              <div className="content-page">
                <Col>
                  {dataProduction.state === CommonProjectState.Completed ? (
                    <img src={logoVerify} height={144} />
                  ) : (
                    <></>
                  )}
                  <Row
                    style={{
                      margin: "12px 0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <StateCard myProps={{ state: dataProduction.state }} />
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="text-main-label">
                      Project:{" "}
                      <span style={{ color: "#46458C", fontWeight: "700" }}>
                        {dataProduction.projectCode}
                      </span>
                    </p>
                    <Row style={{ alignItems: "center" }}>
                      <Button
                        type="default"
                        size="middle"
                        icon={
                          <FileSearchOutlined style={{ fontSize: "18px" }} />
                        }
                        onClick={() => {
                          navigate(`/project-log/${productionId}`, {
                            state: {
                              listLog: produceLogList,
                              type: LogEnum.Produce,
                            },
                          });
                        }}
                        style={{ borderRadius: "4px", marginRight: "12px" }}
                      >
                        View Log
                      </Button>
                      {dataProduction.state === CommonProjectState.Completed ||
                      dataProduction.state === CommonProjectState.Canceled ? (
                        <></>
                      ) : (
                        <div>
                          <Button
                            type="primary"
                            icon={<FormOutlined />}
                            size="middle"
                            style={{ borderRadius: "4px" }}
                            onClick={() => {
                              checkHasProject();
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      )}
                    </Row>
                  </Row>
                  <div style={{ padding: "8px 0px" }}>
                    <Row
                      style={{
                        display: "flex",
                        // justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Project ID: </span>
                        <span className="content-text">
                          {dataProduction.projectId}
                        </span>
                      </p>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Production ID: </span>
                        <span className="content-text">
                          {dataProduction.produceSupervisionId}
                        </span>
                      </p>
                    </Row>
                  </div>
                  <div className="space-padding" />
                  <Col>
                    <p className="text-main-label">Production Supervisor</p>
                    <Row style={{ paddingTop: "8px" }}>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Email: </span>
                        <span className="content-text">
                          {dataProduction.inspector?.email}
                        </span>
                      </p>
                      <p style={{ width: "50%" }}>
                        <span className="title-text">Full Name: </span>
                        <span className="content-text">
                          {dataProduction.inspector?.lastName}{" "}
                          {dataProduction.inspector?.firstName}
                        </span>
                      </p>
                    </Row>
                  </Col>
                </Col>
              </div>
              <div className="space-padding" />
              <div className="content-page">
                <Col>
                  <p className="text-main-label">
                    Production Supervision Infomation
                  </p>
                  <div className="space-padding" />
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Factory Name",
                        content: dataProduction.factoryName ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Total Input (ton)",
                        content: dataProduction.totalInput ?? "Not Update",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Drying Temperature (°C)",
                        content:
                          dataProduction.dryingTemperature ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Humidity (%)",
                        content: dataProduction.humidity ?? "Not Update",
                      }}
                    />
                  </Row>
                  <Row>
                    <LabelContentItem
                      myProps={{
                        label: "Total Product (ton)",
                        content: dataProduction.totalProduct ?? "Not Update",
                      }}
                    />
                    <LabelContentItem
                      myProps={{
                        label: "Expired Date",
                        content:
                          dataProduction.expiredDate !== null
                            ? moment(dataProduction.expiredDate).format(
                                "DD/MM/YYYY"
                              )
                            : "Not update",
                      }}
                    />
                  </Row>
                  <LabelContentItem
                    myProps={{
                      label: "Date Completed",
                      content:
                        dataProduction.dateCompleted !== null
                          ? moment(dataProduction.dateCompleted).format(
                              "DD/MM/YYYY"
                            )
                          : "Not update",
                      width: "100%",
                    }}
                  />
                  <LabelContentItem
                    myProps={{
                      label: "Note",
                      content: dataProduction.note ?? "Not Update",
                      width: "100%",
                    }}
                  />
                </Col>
              </div>
              <div className="space-padding" />
              <div className="content-page">
                {dataProducts ? (
                  <>
                    <Col>
                      <Row
                        style={{
                          display: "flex",
                          justifyItems: "center",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="text-main-label">Product Information</p>
                        <Button
                          type="primary"
                          icon={<PlusCircleOutlined />}
                          size="middle"
                          style={{ borderRadius: "4px" }}
                          onClick={() => {
                            navigate(`/add-product`, {
                              state: dataProduction,
                            });
                          }}
                        >
                          Add Product
                        </Button>
                      </Row>
                      <div className="space-padding" />
                      {dataProducts.length !== 0 ? (
                        dataProducts.map((product: ProductModel) => (
                          <div key={product.productId}>
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
                                content:
                                  product.certificateOfFoodHygieneAndSafety,
                                width: "100%",
                              }}
                            />
                            <LabelContentItem
                              myProps={{
                                label: "Bussiness License Registration Number",
                                content:
                                  product.businessLicenseRegistrationNumber,
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
                                    <p className="title-text">
                                      Product Images:
                                    </p>
                                    <div style={{ padding: "12px" }} />
                                    {product.productImage.map(
                                      (
                                        image: ProductImageModel,
                                        key: number
                                      ) => (
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
                            <div className="space-padding" />
                          </div>
                        ))
                      ) : (
                        <div>
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                      )}
                    </Col>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Col>
          ) : (
            <>
              <SpinApp />
            </>
          )}
        </div>
      </Col>
    </>
  );
}

export default ProduceDetail;
