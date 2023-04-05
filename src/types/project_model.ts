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
  NotYet = 4,
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
    harvest.inspector =
    data.harvest?.inspector.lastName +
      " " +
      data.harvest?.inspector.firstName;
  
    // mapping data to transport interface
    transport.key = data.shipping._id;
    transport.projectId = data.shipping.projectId;
    transport.transportId = data.shipping._id;
    transport.totalInput = data.shipping?.totalInput;
    transport.transportName = data.shipping?.transport;
    transport.vehicleType = data.shipping?.vehicleType;
    transport.numberOfVehicle = data.shipping?.numberOfVehicle;
    transport.dateExpected = data.shipping?.dateExpected;
    transport.dateCompleted = data.shipping?.dateCompleted;
    transport.state = data.shipping?.state;
    transport.inspector =
    data.shipping?.inspector.lastName +
      " " +
      data.shipping?.inspector.firstName;
  
    // mapping data to Warehouse Storage interface
    warehouseStorage.key = data.warehouseStorage._id;
    warehouseStorage.projectId = data.warehouseStorage.projectId;
    warehouseStorage.warehouseStorageId = data.warehouseStorage._id;
    warehouseStorage.totalInput = data.warehouseStorage?.totalInput;
    warehouseStorage.totalExport = data.warehouseStorage?.totalExport;
    warehouseStorage.inputDate = data.warehouseStorage?.inputDate;
    warehouseStorage.outputDate = data.warehouseStorage?.outputDate;
    warehouseStorage.inspector =
    data.warehouseStorage?.inspector.lastName +
      " " +
      data.warehouseStorage?.inspector.firstName;
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
    production.inspector = warehouseStorage.inspector =
    data.produce?.inspector.lastName +
      " " +
      data.produce?.inspector.firstName;
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