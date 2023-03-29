import { FarmInfo } from "./farm";

export interface User {
    key: string;
    lastName: string;
    firstName: string;
    role: number;
    email: string;
    department: string;
    walletAdress?: string;
}
export interface ListUserInfo {
    key: string;
    userId: string;
    fullName: string;
    walletAddress: string;
    phoneNumber: string;
    role: number;
    address: string;
    email: string;
    department?: number;
}

export interface UserDetail {
    userDetail: FarmInfo;
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role: number;
    department?: string;
    walletAddress?: string;
    farmList?: Array<FarmInfo>;
    phoneNumber: string;
}