import { CommonProjectState } from "./project_model";
import { UserDetailModel, parseUserDetail } from "./user";

export interface HarvestModel {
  key: string;
  projectId: string;
  harvestId: string;
  totalHarvest?: number;
  ripeness?: number;
  state: CommonProjectState;
  dateCompleted?: string;
  moisture?: number;
  inspector?: UserDetailModel;
  temperature?: number;
  projectCode: string;
  note: string;
}

export interface TransportModel {
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
  inspector?: UserDetailModel;
  projectCode: string;
  note: string;
}

export interface WarehouseStorageModel {
  key: string;
  projectId: string;
  warehouseStorageId: string;
  totalInput?: number;
  warehouseName?: string;
  totalExport?: number;
  inputDate?: string;
  outputDate?: string;
  state: CommonProjectState;
  inspector?: UserDetailModel;
  projectCode: string;
  note: string;
}

export interface ProductionModel {
  key: string;
  projectId: string;
  produceSupervisionId: string;
  projectCode: string;
  totalInput?: number;
  factoryName?: string;
  totalProduct?: number;
  humidity?: number;
  dryingTemperature?: number;
  dateCompleted?: string;
  expiredDate?: string;
  inspector?: UserDetailModel;
  productName?: string;
  state: CommonProjectState;
  note: string;
}

/// parse model
export const parseHarvestData = (data: any) => {
  var harvest = {} as HarvestModel;
  harvest.key = data._id;
  harvest.harvestId = data.harvestId ?? data._id;
  harvest.projectId = data.projectId !== null ? data.projectId.projectId : null;
  harvest.totalHarvest = data.totalHarvest;
  harvest.ripeness = data.ripeness;
  harvest.state = data.state;
  harvest.moisture = data?.moisture;
  harvest.dateCompleted = data?.dateCompleted;
  harvest.inspector = parseUserDetail(data.inspector);
  harvest.projectCode = data.projectCode;
  harvest.temperature = data?.temperature;

  return harvest;
};

export const parseTransportData = (data: any) => {
  var transport = {} as TransportModel;
  transport.key = data._id;
  transport.transportId = data._id;
  transport.projectId = data.projectId !== null ? data.projectId.projectId : null;
  transport.totalInput = data?.totalInput;
  transport.transportName = data?.transport;
  transport.inspector = parseUserDetail(data?.inspector);
  transport.vehicleType = data?.vehicle;
  transport.numberOfVehicle = data?.numberOfVehicle;
  transport.state = data.state;
  transport.projectCode = data.projectCode;
  transport.dateCompleted = data?.dateCompleted;
  transport.dateExpected = data?.dateExpected;

  return transport;
};

export const parseWarehouseStorageData = (data: any) => {
  var warehouseStorage = {} as WarehouseStorageModel;
  warehouseStorage.key = data._id;
  warehouseStorage.projectId = data.projectId !== null ? data.projectId.projectId : null;
  warehouseStorage.warehouseStorageId = data._id;
  warehouseStorage.projectCode = data.projectCode;
  warehouseStorage.totalInput = data?.totalInput;
  warehouseStorage.totalExport = data?.totalExport;
  warehouseStorage.inputDate = data?.inputDate;
  warehouseStorage.outputDate = data?.outputDate;
  warehouseStorage.inspector = parseUserDetail(data?.inspector);
  warehouseStorage.state = data.state;
  warehouseStorage.warehouseName = data?.warehouse;

  return warehouseStorage;
};

export const parseProductionData = (data: any) => {
  var production = {} as ProductionModel;

  production.key = data._id;
  production.produceSupervisionId = data._id;
  production.projectId = data.projectId !== null ? data.projectId.projectId : null;
  production.projectCode = data.projectCode;
  production.totalInput = data?.totalInput;
  production.factoryName = data?.factory;
  production.totalProduct = data?.totalProduct;
  production.humidity = data?.humidity;
  production.dryingTemperature = data?.dryingTemperature;
  production.dateCompleted = data?.dateCompleted;
  production.expiredDate = data?.expiredDate;
  production.inspector = parseUserDetail(data?.inspector);
  production.state = data?.state;
  production.productName = data?.productName;

  return production;
};

export const listCommonState = [
  CommonProjectState.Processing,
  CommonProjectState.Completed,
  CommonProjectState.Pending,
  CommonProjectState.Canceled,
  CommonProjectState.NotYet,
];
