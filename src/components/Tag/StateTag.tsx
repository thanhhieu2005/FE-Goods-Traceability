import { Badge, Tag } from "antd";
import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { CommonProjectState } from "@/types/project_model";
import { LandState } from "@/types/farm_model";
import { StaffDepartment } from "@/types/user";

export const StateTag = ({ myProp: state }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "64px",
        paddingBottom: "24px",
      }}
    >
      {state === 2 ? (
        <Tag
          style={{
            fontWeight: "bold",
          }}
          icon={<CheckCircleOutlined />}
          color="#87d068"
        >
          This Project has been Completed
        </Tag>
      )  : (
        <Tag
          style={{
            fontWeight: "bold",
          }}
          icon={<CloseCircleOutlined />}
          color="#f50"
        >
          This Project has been Canceled
        </Tag>
      )}
    </div>
  );
};

export const StateInfoProject = (state : any) => {
  switch(state) {
    case 4:
      return (
        <div>
          <Tag color="warning" style={{padding: '0 12px'}}>PENDING</Tag>
        </div>
      );
    case 2:
      return (
        <div>
          <Tag color="success" style={{padding: '0 12px'}}>COMPLETED</Tag>
        </div>
      )
    case 3:
      return (
        <div>
          <Tag color='error' style={{padding: '0 12px'}}>CANCELED</Tag>
        </div>
      )
    case 1:
      return (
        <div>
          <Tag color="processing" style={{padding: '0 12px'}}>PROCESSING</Tag>
        </div>
      )
    default:
      return (
        <div>
          <Tag color="default" style={{padding: '0 12px', color: 'black'}}>UNKNOW</Tag>
        </div>
      )
  }
};

export const StateTagStep = ({ myProp: state }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "64px",
        paddingBottom: "24px",
      }}
    >
      {state === 2 ? (
        <Tag
          style={{
            fontWeight: "bold",
          }}
          icon={<CheckCircleOutlined />}
          color="#87d068"
        >
          This Step has been Completed
        </Tag>
      ) : (
        <Tag
          style={{
            fontWeight: "bold",
          }}
          icon={<CloseCircleOutlined />}
          color="#f50"
        >
          This Step has been Canceled
        </Tag>
      )}
    </div>
  );
};

export const BadgeByState = (value: number) => {
  switch (value) {
    case 1:
      return (
        <span>
          <Badge status="processing" style={{ paddingRight: "4px" }} />
          Processing
        </span>
      );
    case 2:
      return (
        <span>
          <Badge status="success" style={{ paddingRight: "4px" }} />
          Completed
        </span>
      );
    case 3:
      return (
        <span>
          <Badge status="error" style={{ paddingRight: "4px" }} />
          Canceled
        </span>
      );
    default:
      return (
        <span>
          <Badge status="error" color="yellow" style={{ paddingRight: "4px" }} />
          Pending
        </span>
      );
  }
};

export const TagStateCommonProject = (value: CommonProjectState) => {
  switch (value) {
    case CommonProjectState.Completed: 
      return (
        <div>
          <Tag color="success">
            COMPLETE
          </Tag>
        </div>
      );
    case CommonProjectState.Pending:
      return (
        <div>
          <Tag color="warning">
            PENDING
          </Tag>
        </div>
      );
    case CommonProjectState.Processing:
      return (
        <div>
          <Tag color="processing">
            PROCESSING
          </Tag>
        </div>
      );
    case CommonProjectState.Canceled:
      return (
        <div>
          <Tag color="error">
            CANCELED
          </Tag>
        </div>
      );
    default:
      return (
        <div>
          <Tag color="default">
            NOT YET
          </Tag>
        </div>
       
      );
  }
}

export const TagRoleUser = (value: number) => {
  switch(value) {
    case 1:
      return(
        <div>
          <Tag color="volcano">
            Technical Admin
          </Tag>
        </div>
      );
    case 2:
      return (
        <div>
          <Tag color="blue">
            System Admin
          </Tag>
        </div>
      );
    case 3:
      return (
        <div>
          <Tag color="green">
            Farmer
          </Tag>
        </div>
      );
    case 4:
      return (
        <div>
          <Tag color="gold">
            Staff
          </Tag>
        </div>
      );
    default:
      return (
        <div>
          <Tag color="default">
            Unknow
          </Tag>
        </div>
      );
  }
};

export const TagDepartmentUser = (value: StaffDepartment) => {
  switch(value) {
    case StaffDepartment.Empty:
      return (
        <div>
          <Tag color="default">Empty</Tag>
        </div>
      );
    case StaffDepartment.HarvestInspection:
      return (
        <div>
          <Tag color="green">Harvest Inspection</Tag>
        </div>
      );
    case StaffDepartment.TransportSupervision:
      return (
        <div>
          <Tag color="blue">Transport Supervision</Tag>
        </div>
      );
    case StaffDepartment.WarehouseSupervision:
      return (
        <div>
          <Tag color="#fa541c">Warehouse Supervision</Tag>
        </div>
      );
    case StaffDepartment.SupervisingProducer:
      return (
        <div>
          <Tag color="#b37feb">Supervising Producer</Tag>
        </div>
      );
    default:
      return (
        <div>
          <Tag color="default">Unknown</Tag>
        </div>
      );
  }
};

export const TagLandState = (value : LandState) => {
  switch(value) {
    case LandState.Empty:
      return <div>
        <Tag color="default" style={{margin: '0px'}}>
          EMPTY
        </Tag>
      </div>
    case LandState.Cultivating:
      return <div>
        <Tag color="success" style={{margin: '0px'}}>
          CULTIVATING
        </Tag>
      </div>
    default:
      return <></>
  }
}