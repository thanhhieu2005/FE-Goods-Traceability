import { CommonProjectState } from "./project_model";
import { parseUserDetail, UserDetailModel } from "./user";

export interface FarmInfoModel {
    key: string;
    farmId: string;
    farmCode: string;
    farmName: string;
    farmAddress?: string;
    farmOwner?: string;
    farmPhoneNumber?: string;
    farmerList: string[];
    statusFarm: StatusFarm;
    dateCreated: string;
}
export interface FarmDetailInfoModel {
    farmId: string;
    farmCode: string;
    farmName: string;
    farmOwner?: UserDetailModel;
    farmAddress?: string;
    farmPhoneNumber?: string;
    statusFarm: StatusFarm;
    farmerList?: UserDetailModel[];
    farmProjectList: [];
    seedList: [];
    landList: [];
    dateCreated: string;
}

export interface FarmProjectModel {
    farmProjectId: string;
    farmId: string;
    farmProjectCode: string;
    land: LandModel;
    seed: SeedModel;
    dateHarvested: string;
    fertilizerUsed: string;
    totalHarvest: number;
    state: CommonProjectState;
    note: string;
    dateCreate: string;
    farmer: UserDetailModel;
    projectId: string;
}

export interface SeedModel {
    seedId: string;
    farmId: string;
    seedName: string;
    seedFamily: string;
    supplier: string;
}

export interface LandModel {
    landId: string;
    farmId: string;
    landName: string;
    landArea: string;
    state: LandState;
}

export enum LandState {
    Empty = 1,
    Cultivating = 2,
}

export enum StatusFarm {
    Actived = 1,
    NotActive = 2,
    Revoked = 3,
}


/// parse model 
export const parseFarmInfo = (data: any) => {
    var farmInfo = {} as FarmInfoModel;
    farmInfo.key = data._id;
    farmInfo.farmId = data._id;
    farmInfo.farmCode = data.farmCode;
    farmInfo.farmOwner = data.farmOwner;
    farmInfo.farmName = data.farmName;
    farmInfo.farmAddress = data.farmAddress;
    farmInfo.farmerList = data.farmers.farmers;
    farmInfo.farmPhoneNumber = data.farmPhoneNumber;
    farmInfo.statusFarm = data.statusFarm as StatusFarm;
  
    return farmInfo;
}

export const parseFarmDetail = (data: any) => {
    var farmDetailInfo = {} as FarmDetailInfoModel;
    var farmerList = [] as Array<UserDetailModel>;
    if(data.farmerList != null) {
        data.farmerList.map((element: any) => {
      const farmer = parseUserDetail(element.farmer);
      farmerList.push(farmer);
        })
    }

    farmDetailInfo.farmId = data.farmId;
    farmDetailInfo.farmCode = data.farmCode;
    farmDetailInfo.farmName = data.farmName;
    farmDetailInfo.farmOwner = parseUserDetail(data.farmOwner);
    farmDetailInfo.farmPhoneNumber = data.farmPhoneNumber;
    farmDetailInfo.farmAddress = data.farmAddress;
    farmDetailInfo.statusFarm = data.statusFarm as StatusFarm;
    farmDetailInfo.farmerList = farmerList;
    farmDetailInfo.dateCreated = data.dateCreate;
    farmDetailInfo.farmProjectList = data.farmProjectList;
    farmDetailInfo.seedList = data.seedList;
    farmDetailInfo.landList = data.landList;

    return farmDetailInfo;
}  

export const parseLandModel = (data: any) => {
    var land = {} as LandModel;

    land = data;

    return land;
}

export const parseSeedModel = (data: any) => {
    var seed = {} as SeedModel;

    seed = data;

    return seed;
}

export const parseFarmProjectModel = (data: any) => {
    var farmProject = {} as FarmProjectModel;

    farmProject = data;

    return farmProject;
}