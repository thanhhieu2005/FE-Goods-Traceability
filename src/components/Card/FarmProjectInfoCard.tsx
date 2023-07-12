import { FarmInfoModel } from "@/types/farm_model";
import { ProjectDetailModel } from "@/types/project_model";
import { greyBlurColor, mainColor, seedMainColor } from "@/utils/app_color";
import { Col, Row } from "antd";
import moment from "moment";
import LabelContentItem from "../Label/LabelContentItem";
import StateCard from "../Tag/StateCard";

const FarmProjectInfoCard = ({ myProps: props }: any) => {
  const dataProject: ProjectDetailModel = props.dataProject;

  const farm: FarmInfoModel = props.farm;

  return (
    <>
      <Col>
        <div style={{ paddingBottom: "24px" }}>
          <div className="text-main-label">
            <p>
              <span>Farm Undertakes: </span>
              <span
                className="common-border-tag"
                style={{ color: mainColor, fontSize: "20px" }}
              >
                {farm?.farmName}
              </span>
            </p>
          </div>
          <div style={{ padding: "12px" }} />
          <Col>
            <LabelContentItem
              myProps={{
                label: "Farm Owner",
                content: farm?.farmOwner?.email,
              }}
            />
            <div style={{ padding: "8px" }} />
            <Row style={{ display: "flex", paddingBottom: "8px" }}>
              <LabelContentItem
                myProps={{
                  label: "Farm ID",
                  content: farm?.farmId,
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Farm Name",
                  content: farm?.farmName,
                }}
              />
            </Row>
            <Row style={{ display: "flex", paddingBottom: "8px" }}>
              <LabelContentItem
                myProps={{
                  label: "Farm Address",
                  content: farm?.farmAddress,
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Phone Number",
                  content: farm?.farmPhoneNumber,
                }}
              />
            </Row>
          </Col>
        </div>
        <div className="text-main-label">
          <Row>
            <p>
              <span>Farm Project: </span>
              <span style={{ color: "#ABC4AA" }}>
                {dataProject.farmProject.farmProjectCode}
              </span>
            </p>
            <div style={{ marginLeft: "12px" }}>
              <StateCard
                myProps={{
                  state: dataProject.farmProject.state,
                  padding: "4px 12px",
                  fontSizeText: "14px",
                }}
              />
            </div>
          </Row>
          <div>
            <p>
              <span className="sub-text">Date Created: </span>
              <span className="content-sub-text">
                {moment(dataProject.farmProject.dateCreated).format(
                  "DD/MM/YYYY"
                )}
              </span>
            </p>
          </div>
          <div style={{ padding: "8px" }} />
          {/* Information of Farm Project */}
          <div>
            <LabelContentItem
              myProps={{
                label: "Farmer in charge",
                content:
                  dataProject.farmProject.farmer !== null
                    ? dataProject.farmProject.farmer.email
                    : "Not assigned yet",
              }}
            />
          </div>
          <div style={{ padding: "8px" }} />
          <Col>
            <Row style={{ display: "flex", paddingBottom: "8px" }}>
              <LabelContentItem
                myProps={{
                  label: "Total Harvests (ton)",
                  content: dataProject.farmProject.totalHarvest ?? "Not update",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Total Seeds (ton)",
                  content: dataProject.farmProject.totalSeeds ?? "Not update",
                }}
              />
            </Row>
            <Row style={{ display: "flex", paddingBottom: "8px" }}>
              <LabelContentItem
                myProps={{
                  label: "Fertilizer Used",
                  content:
                    dataProject.farmProject.fertilizerUsed ?? "Not update",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Total Fertilizers (ton)",
                  content:
                    dataProject.farmProject.totalFertilizers ?? "Not update",
                }}
              />
            </Row>
            <Row style={{ display: "flex", paddingBottom: "8px" }}>
              <LabelContentItem
                myProps={{
                  label: "Date Harvested",
                  content:
                    dataProject.farmProject.dateHarvested !== null
                      ? moment(dataProject.farmProject.dateHarvested).format(
                          "DD/MM/YYYY"
                        )
                      : "Not update",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Ripeness (%)",
                  content: dataProject.farmProject.ripeness ?? "Not update",
                }}
              />
            </Row>
            <Row style={{ display: "flex", paddingBottom: "8px" }}>
              <LabelContentItem
                myProps={{
                  label: "Pesticides",
                  content: dataProject.farmProject.pesticide ?? "Not update",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Plant Density (/ha)",
                  content: dataProject.farmProject.plantDensity ?? "Not update",
                }}
              />
            </Row>
          </Col>
          <div>
            <LabelContentItem
              myProps={{
                label: "Note",
                content: dataProject.farmProject.note ?? "Not update",
              }}
            />
          </div>
        </div>
        <div className="space-padding" />
        <Row>
          <div
            className="common-border-tag"
            style={{
              width: "49%",
              padding: "24px",
              color: greyBlurColor,
            }}
          >
            <Col>
              <div className="text-main-label" style={{ color: "#ABC4AA" }}>
                <p>Land Information</p>
              </div>
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Land Name",
                  content:
                    dataProject.farmProject.land.landName ?? "Not update",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Land Area (m2)",
                  content:
                    dataProject.farmProject.land.landArea ?? "Not update",
                }}
              />
            </Col>
          </div>
          <div style={{ width: "2%" }} />
          <div
            className="common-border-tag"
            style={{
              width: "49%",
              padding: "24px",
              color: greyBlurColor,
            }}
          >
            <Col>
              <div className="text-main-label" style={{ color: seedMainColor }}>
                <p>Seed Information</p>
              </div>
              <div className="space-padding" />
              <LabelContentItem
                myProps={{
                  label: "Seed Name",
                  content:
                    dataProject.farmProject.seed.seedName ?? "Not update",
                }}
              />
              <LabelContentItem
                myProps={{
                  label: "Seed Family",
                  content:
                    dataProject.farmProject.seed.seedFamily ?? "Not update",
                }}
              />
            </Col>
          </div>
        </Row>
      </Col>
    </>
  );
};

export default FarmProjectInfoCard;
