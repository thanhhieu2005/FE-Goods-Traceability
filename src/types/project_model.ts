import { Harvest, Production, Transport, WarehouseStorage } from "./step_tracking";


export interface ProjectDetailModel {
    key: string;
    projectId: string;
    projectCode: string;
    projectName: string;
    state: number;
    dateCreated: string;
    dateCompleted?: string;
    manager: string; // manager tam thoi de string de lay ten
    harvest: Harvest;
    transport: Transport;
    warehouseStorage: WarehouseStorage;
    production: Production;
} 
export interface ProjectInfoModel {
    key: string;
    projectCode: string;
    projectName: string;
    manager: string;
    dateCreated: string;
    status: number;
}

export enum CommonProjectState {
  Pending = 1,
  Completed = 2,
  Canceled = 3,
  Processing = 4,
}

/// parse model
export const parseProjectData = (data: any) => {
    var projectDetail = {} as ProjectDetailModel;
    var harvest = {} as Harvest;
    var transport = {} as Transport;
    var warehouseStorage = {} as WarehouseStorage;
    var production = {} as Production;
  
    // mapping data to harvest interface
    harvest.key = data.harvest._id;
    harvest.projectId = data.harvest.projectId;
    harvest.harvestId = data.harvest._id;
    harvest.totalHarvest = data.harvest?.totalHarvest;
    harvest.ripeness = data.harvest?.ripeness;
    harvest.state = data.harvest.state;
    harvest.moisture = data.harvest?.moisture;
    harvest.dateCompleted = data.harvest?.dateCompleted;

    if(harvest.inspector != null) {
harvest.inspector =
    data.harvest?.inspector.lastName +
      " " +
      data.harvest?.inspector.firstName;
    } else {
      harvest.inspector = ""
    }
    
  
    // mapping data to transport interface
    transport.key = data.transport._id;
    transport.projectId = data.transport.projectId;
    transport.transportId = data.transport._id;
    transport.totalInput = data.transport?.totalInput;
    transport.transportName = data.transport?.transport;
    transport.vehicleType = data.transport?.vehicleType;
    transport.numberOfVehicle = data.transport?.numberOfVehicle;
    transport.dateExpected = data.transport?.dateExpected;
    transport.dateCompleted = data.transport?.dateCompleted;
    transport.state = data.transport?.state;

    if(transport.inspector != null) {
transport.inspector =
    data.transport?.inspector.lastName +
      " " +
      data.transport?.inspector.firstName;
    } else {
      transport.inspector = ""
    }
    
  
    // mapping data to Warehouse Storage interface
    warehouseStorage.key = data.warehouseStorage._id;
    warehouseStorage.projectId = data.warehouseStorage.projectId;
    warehouseStorage.warehouseStorageId = data.warehouseStorage._id;
    warehouseStorage.totalInput = data.warehouseStorage?.totalInput;
    warehouseStorage.totalExport = data.warehouseStorage?.totalExport;
    warehouseStorage.inputDate = data.warehouseStorage?.inputDate;
    warehouseStorage.outputDate = data.warehouseStorage?.outputDate;

    if(warehouseStorage.inspector != null) {
    warehouseStorage.inspector =
    data.warehouseStorage?.inspector.lastName +
      " " +
      data.warehouseStorage?.inspector.firstName;
    } else {
      warehouseStorage.inspector = ""
    }

    warehouseStorage.state = data.warehouseStorage.state;
    warehouseStorage.warehouseName =
    data.warehouseStorage?.warehouse;
  
    // mapping data to Production interface
    production.key = data.produce._id;
    production.productionId = data.produce._id;
    production.projectId = data.produce.projectId;
    production.totalInput = data.produce?.totalInput;
    production.factoryName = data.produce?.factory;
    production.totalProduct = data.produce?.totalProduct;
    production.humidity = data.produce?.humidity;
    production.dryingTemperature = data.produce?.dryingTemperature;
    production.dateCompleted = data.produce?.dateCompleted;
    production.expiredDate = data.produce?.expiredDate;
    if(production.inspector != null) {
    production.inspector = 
    data.produce?.inspector.lastName +
      " " +
      data.produce?.inspector.firstName;
    } else {
      production.inspector = ""
    }
    
    production.state = data.produce?.state;
  
    // mapping data to project detail interface
    projectDetail.key = data._id;
    projectDetail.projectId = data.projectId;
    projectDetail.projectName = data.projectName;
    projectDetail.projectCode = data.projectCode;
    projectDetail.state = data.state;
    projectDetail.dateCreated = data.dateCreated;
    projectDetail.dateCompleted = data?.dateCompleted;
    projectDetail.manager =
    data.manager.lastName + " " + data.manager.firstName;
    projectDetail.harvest = harvest;
    projectDetail.transport = transport;
    projectDetail.warehouseStorage = warehouseStorage;
    projectDetail.production = production;
  
    return projectDetail;
  };