import { Harvest, Production, Transport, WarehouseStorage } from "./step_tracking";
import { User } from "./user";


export interface ProjectDetailInterface {
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
export interface ProjectInfo {
    key: string;
    projectCode: string;
    projectName: string;
    manager: string;
    dateCreated: string;
    status: number;
  }