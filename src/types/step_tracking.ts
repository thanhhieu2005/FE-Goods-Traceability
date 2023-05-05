import { CommonProjectState } from "./project_model";
import { UserModel } from "./user";

export interface Harvest {
    key: string;
    projectId: string;
    harvestId: string;
    totalHarvest?: number;
    ripeness?: number;
    state: CommonProjectState;
    dateCompleted?: string;
    moisture?: number;
    inspector?: string;
    temperature?: number;
    projectCode: string;
}

export interface Transport {
    key: string;
    projectId: string;
    transportId: string;
    totalInput?: number;
    transportName?: string;
    vehicleType?: string;
    numberOfVehicle?: number;
    dateExpected?: string;
    dateCompleted?: string;
    state: CommonProjectState;
    inspector?: string;
    projectCode: string;
}

export interface WarehouseStorage {
    key: string;
    projectId: string;
    warehouseStorageId: string;
    totalInput?: number;
    warehouseName?: string;
    totalExport?: number;
    inputDate?: string;
    outputDate?: string;
    state: CommonProjectState;
    inspector?: string;
    projectCode: string;
}

export interface Production {
    key: string;
    projectId: string;
    productionId: string;
    projectCode: string;
    totalInput?: number;
    factoryName?: string;
    totalProduct?: number;
    humidity?: number;
    dryingTemperature?: number;
    dateCompleted?: string;
    expiredDate?: string;
    inspector?: string;
    productName?: string;
    state: CommonProjectState;
}


/// parse model
export const parseHarvestData = (data: any) => {
    var harvest = {} as Harvest;
    harvest.key = data._id;
    harvest.harvestId = data._id;
    harvest.projectId = data.projectId.projectId;
    harvest.totalHarvest = data?.totalHarvest;
    harvest.ripeness = data?.ripeness;
    harvest.state = data.state;
    harvest.moisture = data?.moisture;
    harvest.dateCompleted = data?.dateCompleted;
    harvest.inspector =
      data?.inspector?.lastName + " " + data?.inspector?.firstName;
    harvest.projectCode = data.projectCode ?? data.productionId.projectCode;
    harvest.temperature = data?.temperature;
  
    return harvest;
};

export const parseTransportData = (data: any) => {
    var transport = {} as Transport;
    transport.key = data._id;
    transport.transportId = data._id;
    transport.projectId = data.projectId.projectId;
    transport.totalInput = data?.totalInput;
    transport.transportName = data?.transport;
    transport.inspector = data.inspector.lastName + " " + data.inspector.firstName;
    transport.vehicleType = data?.vehicleType;
    transport.numberOfVehicle = data?.numberOfVehicle;
    transport.state = data.state;
    transport.projectCode = data.projectCode;
    transport.dateCompleted = data?.dateCompleted;
    transport.dateExpected = data?.dateExpected;

    return transport;
};

export const parseWarehouseStorageData = (data: any) => {
    var warehouseStorage = {} as WarehouseStorage;
    warehouseStorage.key = data._id;
    warehouseStorage.projectId = data.projectId._id;
    warehouseStorage.warehouseStorageId = data._id;
    warehouseStorage.projectCode = data.projectCode;
    warehouseStorage.totalInput = data?.totalInput;
    warehouseStorage.totalExport = data?.totalExport;
    warehouseStorage.inputDate = data?.inputDate;
    warehouseStorage.outputDate = data?.outputDate;
    warehouseStorage.inspector =
    data?.inspector.lastName +
      " " +
      data?.inspector.firstName;
    warehouseStorage.state = data.state;
    warehouseStorage.warehouseName =
    data?.warehouse;

    return warehouseStorage;
};

export const parseProductionData = (data: any) => {
  var production = {} as Production;

    production.key = data._id;
    production.productionId = data._id;
    production.projectId = data.projectId._id;
    production.projectCode = data.projectCode;
    production.totalInput = data?.totalInput;
    production.factoryName = data?.factory;
    production.totalProduct = data?.totalProduct;
    production.humidity = data?.humidity;
    production.dryingTemperature = data?.dryingTemperature;
    production.dateCompleted = data?.dateCompleted;
    production.expiredDate = data?.expiredDate;
    production.inspector = data.inspector =
      data?.inspector.lastName +
          " " +
      data?.inspector.firstName;
    production.state = data?.state;
    production.productName = data?.productName;

  return production;
}