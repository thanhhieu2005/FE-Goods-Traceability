export interface LogModel {
    _id: string;
    logId: string;
    projectId: string;
    actor: string;
    action: string;
    modelBeforeChanged: any;
    modelAfterChanged: any;
    createdAt: string;
    updatedAt: string;
}



export enum LogEnum {
    Project = 1,
    Harvest = 2,
    Transport = 3,
    Warehouse = 4,
    Produce = 5,
    Farm = 0,
  }