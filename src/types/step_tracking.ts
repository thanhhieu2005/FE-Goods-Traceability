import { User } from "./user";

export interface Harvest {
    key: string;
    projectId: string;
    harvestId: string;
    totalHarvest?: number;
    ripeness?: number;
    state: number;
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
    state: number;
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
    state: number;
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
    state: number;
}