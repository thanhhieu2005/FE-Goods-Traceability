import { FarmInfo } from "@/types/farm";

export const parseFarmInfo = (data: any) => {
    var farmInfo = {} as FarmInfo;
    farmInfo.key = data._id;
    farmInfo.farmId = data._id;
    farmInfo.farmCode = data.farmCode;
    farmInfo.farmOwner = data.farmOwner;
    farmInfo.farmName = data.farmName;
    farmInfo.farmAddress = data.farmAddress;
    farmInfo.farmers = data.farmers.farmers;
    farmInfo.farmPhoneNumber = data.farmPhoneNumber;
    farmInfo.statusFarm = data.statusFarm;
  
    return farmInfo;
}

// export const parseFarmDetail = (data: any) => {

// }