import { ProjectDetailInterface } from "@/types/project_detail";
import { Harvest, Production, Transport, WarehouseStorage } from "@/types/step_tracking";

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

export const parseProjectData = (data: any) => {
  var projectDetail = {} as ProjectDetailInterface;
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