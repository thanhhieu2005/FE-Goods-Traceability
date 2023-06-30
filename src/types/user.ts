import { FarmInfoModel, parseFarmInfo } from "./farm_model";

export interface UserModel {
    key: string;
    lastName: string;
    firstName: string;
    role: UserRole;
    email: string;
    department: StaffDepartment;
    walletAdress?: string;
}
export interface ListUserInfo {
    key: string;
    userId: string;
    fullName: string;
    walletAddress: string;
    phoneNumber: string;
    role: UserRole;
    address: string;
    email: string;
    department?: StaffDepartment;
}

export interface UserDetailModel {
    farmInfo?: FarmInfoModel;
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role: UserRole;
    department?: StaffDepartment;
    walletAddress?: string;
    farmList?: Array<FarmInfoModel>;
    phoneNumber: string;
    isOwner?: boolean;
    address?: string;
}

export enum UserRole {
  TechnicalAdmin = 1,
  SystemAdmin = 2,
  Farmer = 3,
  Staff = 4,
}

export enum StaffDepartment {
  Empty = 1,
  HarvestInspection = 2,
  TransportSupervision = 3,
  WarehouseSupervision = 4,
  SupervisingProducer = 5,
}

/// parse model
export const parseListUserInfo = (data: any) => {
    var user = {} as ListUserInfo;
    user.key = data._id;
    user.userId = data._id;
    user.email = data.email;
    user.fullName = data.firstName + data.lastName;
    user.address = data.address ?? '-';
    user.phoneNumber = data.phoneNumber ?? '-';
    user.role = data.role as UserRole;
    user.walletAddress = data.walletAddress ?? '-';
    user.department = data.department as StaffDepartment;
    return user;
  };
  
  export const parseUserDetail = (data: any) => {
    var userDetail = {} as UserDetailModel;
    var farmList = [] as Array<FarmInfoModel>;
    if(data.farmList != null) {
      data.farmList.map((element: any) => {
        const farm = parseFarmInfo(element.farm);
        farmList.push(farm);
      })
    }
    userDetail.userId = data._id;
    userDetail.email = data.email;
    userDetail.firstName = data.firstName;
    userDetail.lastName = data.lastName;
    userDetail.walletAddress = data.walletAddress;
    userDetail.role = data.role as UserRole;
    userDetail.department = data.role == 4 ? data.department : null;
    // userDetail.farmList = farmList;
    userDetail.phoneNumber = data.phoneNumber;
    userDetail.isOwner = data.isOwner;
    userDetail.address = data.address;
  
    return userDetail;
  }